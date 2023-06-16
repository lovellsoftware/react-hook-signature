"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = useSignaturePad;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/entries"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _react = require("react");

var _signature_pad = _interopRequireDefault(require("signature_pad"));

var _resizeCanvas = _interopRequireDefault(require("./resizeCanvas"));

const getOptions = options => {
  var _context;

  // the options supported by signature_pad (https://github.com/szimek/signature_pad#options)
  const ALLOWED_OPTIONS = ['dotSize', 'minWidth', 'maxWidth', 'throttle', 'minDistance', 'backgroundColor', 'penColor', 'velocityFilterWeight', 'onBegin', 'onEnd'];
  const signaturePadOptions = {};
  const canvasOptions = {};
  (0, _forEach.default)(_context = (0, _entries.default)(options)).call(_context, ([key, value]) => {
    if ((0, _includes.default)(ALLOWED_OPTIONS).call(ALLOWED_OPTIONS, key)) {
      signaturePadOptions[key] = value;
    } else {
      canvasOptions[key] = value;
    }
  });
  return [signaturePadOptions, canvasOptions];
};

function useSignaturePad(options = {}) {
  const canvasRef = (0, _react.useRef)(null);
  const [signaturePad, setSignaturePad] = (0, _react.useState)({});
  const [initialSignaturePadOptions, initialCanvasOptions] = getOptions(options);
  const [signaturePadOptions, setSignaturePadOptions] = (0, _react.useState)(initialSignaturePadOptions);
  const [canvasOptions, setCanvasOptions] = (0, _react.useState)(initialCanvasOptions);
  const setSignaturePadRef = (0, _react.useCallback)(node => {
    if (node !== null) {
      canvasRef.current = node;
      setSignaturePad(new _signature_pad.default(canvasRef.current, signaturePadOptions));
    }
  }, []); // initial set up and on-unmount tear down

  (0, _react.useEffect)(() => {
    const resizeSignaturePad = () => {
      if (canvasRef && canvasRef.current && signaturePad && signaturePad.clear) {
        const {
          height,
          width
        } = canvasOptions;
        (0, _resizeCanvas.default)(height, width, canvasRef.current);
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

  const updateOptions = (0, _react.useCallback)(updatedOptions => {
    const [updatedSignaturePadOptions, updatedCanvasOptions] = getOptions(updatedOptions);
    setSignaturePadOptions(updatedSignaturePadOptions);
    setCanvasOptions(updatedCanvasOptions);

    if (signaturePad.canvas) {
      // Update the SignaturePad with the new options
      (0, _assign.default)(signaturePad, updatedSignaturePadOptions);
    }
  }, [signaturePad.canvas]);
  /**
   * Clears the signature.
   */

  const handleClear = (0, _react.useCallback)(() => signaturePad.clear(), [signaturePad.clear]);
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

  const handleSave = (0, _react.useCallback)((imageType = 'image/png', imageQuality = 0.92) => signaturePad.toDataURL(imageType, imageQuality), [signaturePad.toDataURL]);
  return {
    handleSave,
    handleClear,
    updateOptions,
    canvasProps: { ...canvasOptions,
      ref: setSignaturePadRef
    }
  };
}