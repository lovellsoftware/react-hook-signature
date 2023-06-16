/* eslint-disable react/prop-types */
import React, {
    useRef,
    useState,
    useEffect,
    useCallback
} from 'react';
import SignaturePad from 'signature_pad';

const DisplaySignature = ({ imageURL, height, width }) => {
    const canvasRef = useRef(null);
    const [signaturePad, setSignaturePad] = useState({});

    const setSignaturePadRef = useCallback((node) => {
        if (node !== null) {
            canvasRef.current = node;
            setSignaturePad(new SignaturePad(canvasRef.current));
        }
    }, []);

    useEffect(() => {
        if (signaturePad && signaturePad.on) {
            signaturePad.on();
        }

        return () => {
            if (signaturePad && signaturePad.off) {
                signaturePad.off();
            }
        };
    }, [canvasRef.current, signaturePad.on, signaturePad.off]);

    useEffect(() => {
        if (imageURL && signaturePad.fromDataURL) {
            signaturePad.clear();
            signaturePad.fromDataURL(imageURL);
        }
    });

    return (
        <>
            <h2>Saved Signature</h2>
            <div style={{ border: '1px solid black', display: 'inline-block' }}>
                <canvas height={height} width={width} ref={setSignaturePadRef} />
            </div>
        </>
    );
};

export default DisplaySignature;
