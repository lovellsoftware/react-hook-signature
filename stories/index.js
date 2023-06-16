import React, { useState, useEffect } from 'react';
import {
    withKnobs,
    number,
    color,
    select
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import useSignaturePad from '../src/useSignaturePad';
import DisplaySignature from './util/DisplaySignature';

export default {
    title: 'React Hook SignaturePad',
    decorators: [withKnobs]
};

export const defaultSignaturePad = () => {
    const [signature, setSignature] = useState(null);
    const { handleSave, handleClear, canvasProps } = useSignaturePad();

    const onSave = () => {
        const imgDataUrl = handleSave();
        setSignature(imgDataUrl);
    };

    return (
        <div>
            <h1>Please sign the form</h1>
            <div style={{ maxWidth: '800px', maxHeight: '800px', display: 'inline-block' }}>
                <div style={{ border: '1px solid black', display: 'inline-block' }}>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <canvas {...canvasProps} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <button type="button" onClick={handleClear}>Clear</button>
                    <button type="button" onClick={onSave}>Save</button>
                </div>
            </div>

            <br />
            <br />

            <DisplaySignature imageURL={signature} />
        </div>
    );
};

export const withCanvasOptions = () => {
    const options = {
        height: number('height', 200),
        width: number('width', 300)
    };

    const [signature, setSignature] = useState(null);
    const {
        handleSave,
        handleClear,
        updateOptions,
        canvasProps
    } = useSignaturePad(options);

    useEffect(() => {
        updateOptions(options);
    }, [options.height, options.width]);

    const onSave = () => {
        const imgDataUrl = handleSave();
        setSignature(imgDataUrl);
    };

    return (
        <div>
            <h1>Please sign the form</h1>
            <div style={{ maxWidth: '800px', maxHeight: '800px', display: 'inline-block' }}>
                <div style={{ border: '1px solid black', display: 'inline-block' }}>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <canvas {...canvasProps} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <button type="button" onClick={handleClear}>Clear</button>
                    <button type="button" onClick={onSave}>Save</button>
                </div>
            </div>

            <br />
            <br />

            <DisplaySignature imageURL={signature} height={options.height} width={options.width} />
        </div>
    );
};

export const withSignaturePadOptions = () => {
    const options = {
        dotSize: number('dotSize', 1),
        minWidth: number('minWidth', 0.5),
        maxWidth: number('maxWidth', 2.5),
        throttle: number('throttle', 16), // Set it to 0 to turn off throttling
        minDistance: number('minDistance', 5),
        backgroundColor: color('backgroundColor', 'rgb(0,0,0)'), // defaults to "rgba(0,0,0,0)" (transparent black)
        penColor: color('penColor', 'red'), // defaults to "black"
        velocityFilterWeight: number('velocityFilterWeight', 0.7),
        onBegin: action('onBegin'),
        onEnd: action('onEnd'),
        height: number('height', null),
        width: number('width', null)
    };

    const [signature, setSignature] = useState(null);
    const {
        handleSave,
        handleClear,
        updateOptions,
        canvasProps
    } = useSignaturePad(options);

    useEffect(() => {
        updateOptions(options);
    }, [
        options.dotSize, options.minWidth, options.maxWidth, options.throttle,
        options.minDistance, options.backgroundColor, options.penColor,
        options.velocityFilterWeight, options.height, options.width
    ]);

    const onSave = () => {
        const imgDataUrl = handleSave();
        setSignature(imgDataUrl);
    };

    return (
        <div>
            <h1>Please sign the form</h1>
            <div style={{ maxWidth: '800px', maxHeight: '800px', display: 'inline-block' }}>
                <div style={{ border: '1px solid black', display: 'inline-block' }}>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <canvas {...canvasProps} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <button type="button" onClick={handleClear}>Clear</button>
                    <button type="button" onClick={onSave}>Save</button>
                </div>
            </div>

            <br />
            <br />

            <DisplaySignature imageURL={signature} height={options.height} width={options.width} />
        </div>
    );
};

export const withImageTypeAndQualityOptions = () => {
    const imageType = select(
        'imageType',
        {
            PNG: 'image/png',
            JPEG: 'image/jpeg',
            WEBP: 'image/webp',
            SVG: 'image/svg+xml'
        },
        'image/png'
    );
    const imageQuality = number('imageQuality', 0.92, {
        range: true,
        min: 0,
        max: 1,
        step: 0.05
    });

    const [signature, setSignature] = useState(null);
    const {
        handleSave,
        handleClear,
        canvasProps
    } = useSignaturePad();

    const onSave = () => {
        const imgDataUrl = handleSave(imageType, imageQuality);
        setSignature(imgDataUrl);
    };

    return (
        <div>
            <h1>Please sign the form</h1>
            <div style={{ maxWidth: '800px', maxHeight: '800px', display: 'inline-block' }}>
                <div style={{ border: '1px solid black', display: 'inline-block' }}>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    <canvas {...canvasProps} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <button type="button" onClick={handleClear}>Clear</button>
                    <button type="button" onClick={onSave}>Save</button>
                </div>
            </div>

            <br />
            <br />

            <DisplaySignature imageURL={signature} />
        </div>
    );
};
