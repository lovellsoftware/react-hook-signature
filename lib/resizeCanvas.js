"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = resizeCanvas;

function resizeCanvas(height, width, canvasRef) {
  // don't resize if the canvas has fixed width and height
  if (width && height) {
    return;
  }

  const canvas = canvasRef; // When zoomed out to less than 100%, for some very strange reason,
  // some browsers report devicePixelRatio as less than 1
  // and only part of the canvas is cleared then.

  const ratio = Math.max(window.devicePixelRatio || 1, 1);

  if (!width) {
    canvas.width = canvas.offsetWidth * ratio;
  }

  if (!height) {
    canvas.height = canvas.offsetHeight * ratio;
  }

  canvas.getContext('2d').scale(ratio, ratio);
}