import {
    useCallback,
    useRef,
    useState,
    useEffect
} from 'react';
import SignaturePad from 'signature_pad';

import resizeCanvas from './resizeCanvas';

const getOptions = (options) => {
    // the options supported by signature_pad (https://github.com/szimek/signature_pad#options)
    const ALLOWED_OPTIONS = [
        'dotSize',
        'minWidth',
        'maxWidth',
        'throttle',
        'minDistance',
        'backgroundColor',
        'penColor',
        'velocityFilterWeight',
        'onBegin',
        'onEnd'
    ];

    const signaturePadOptions = {};
    const canvasOptions = {};

    Object.entries(options).forEach(([key, value]) => {
        if (ALLOWED_OPTIONS.includes(key)) {
            signaturePadOptions[key] = value;
        } else {
            canvasOptions[key] = value;
        }
    });

    return [signaturePadOptions, canvasOptions];
};

export default function useSignaturePad(options = {}) {
    const canvasRef = useRef(null);
    const [signaturePad, setSignaturePad] = useState({});

    const [initialSignaturePadOptions, initialCanvasOptions] = getOptions(options);
    const [signaturePadOptions, setSignaturePadOptions] = useState(initialSignaturePadOptions);
    const [canvasOptions, setCanvasOptions] = useState(initialCanvasOptions);

    const setSignaturePadRef = useCallback((node) => {
        if (node !== null) {
            canvasRef.current = node;
            setSignaturePad(new SignaturePad(canvasRef.current, signaturePadOptions));
        }
    }, []);

    // initial set up and on-unmount tear down
    useEffect(() => {
        const resizeSignaturePad = () => {
            if (canvasRef && canvasRef.current && signaturePad && signaturePad.clear) {
                const { height, width } = canvasOptions;
                resizeCanvas(height, width, canvasRef.current);
                signaturePad.clear();
            }
        };

        if (signaturePad && signaturePad.on) {
            resizeSignaturePad();
            window.addEventListener('resize', resizeSignaturePad);
            signaturePad.on();
        }

        return () => {
            if (signaturePad && signaturePad.off) {
                window.removeEventListener('resize', resizeSignaturePad);
                signaturePad.off();
            }
        };
    }, [canvasRef.current, signaturePad.on, signaturePad.off]);

    /**
     * Updates the options of the SignaturePad with the provided new options.
     *
     * @param {object} updatedOptions - same options as originally available to `useSignaturePad`
     */
    const updateOptions = useCallback((updatedOptions) => {
        const [updatedSignaturePadOptions, updatedCanvasOptions] = getOptions(updatedOptions);
        setSignaturePadOptions(updatedSignaturePadOptions);
        setCanvasOptions(updatedCanvasOptions);

        if (signaturePad.canvas) {
            // Update the SignaturePad with the new options
            Object.assign(signaturePad, updatedSignaturePadOptions);
        }
    }, [signaturePad.canvas]);

    /**
     * Clears the signature.
     */
    const handleClear = useCallback(() => (
        signaturePad.clear()
    ), [signaturePad.clear]);

    /**
     * Capture and return an image data URI of the signature (more info: https://mdn.io/todataurl).
     *
     * @param {string} [imageType='image/png'] - Optional Image Type, must be either "image/png",
     *      "image/jpeg",or "image/webp". Defaults to "image/png".
     * @param {number} [imageQuality=0.92] - Optional number between 0 and 1 (inclusive)
     *      indicating the image quality to use for image formats that use lossy compression
     *      such as jpeg and webp. Defaults to 0.92 (92%).
     * @returns {string} the data URI of the image
     */
    const handleSave = useCallback((imageType = 'image/png', imageQuality = 0.92) => (
        signaturePad.toDataURL(imageType, imageQuality)
    ), [signaturePad.toDataURL]);

    return {
        handleSave,
        handleClear,
        updateOptions,
        canvasProps: {
            ...canvasOptions,
            ref: setSignaturePadRef
        }
    };
}
