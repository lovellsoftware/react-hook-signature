# react-hook-signature
React Hook implementation of [`signature_pad`](https://github.com/szimek/signature_pad)

<br/>

## Installation
You can install the latest version of the library using npm:
```bash
npm install git+ssh://git@github.com/theoryandprinciple/react-hook-signature.git
```

Or a specific tag of the library using npm:
```bash
npm install git+ssh://git@github.com/theoryandprinciple/react-hook-signature.git#v1.0.0
```

<br/>

## Usage
The hook `useSignaturePad` must be used in conjunction with a `<canvas>` element in your component which
will turn that `<canvas>` element into the SignaturePad.  Here is an example:

```javascript
import React from 'react';
import useSignaturePad from 'react-hook-signature';

export const DefaultSignaturePad = () => {
    const { handleSave, handleClear, canvasProps } = useSignaturePad();

    const onSave = () => {
        const imgDataUrl = handleSave();
        return alert(`Saved: ${imgDataUrl}`);
    };

    return (
        <div>
            <h1>Please sign the form</h1>
            <div>
                <div>
                    <canvas {...canvasProps} />
                </div>
                <div>
                    <button type="button" onClick={handleClear}>Clear</button>
                    <button type="button" onClick={onSave}>Save</button>
                </div>
            </div>
        </div>
    );
};
```

<br/>

### API
The `useSignaturePad` hook can take an optional `options` object specifying any of the parameters the SignaturePad should
be initialized with (see [Options](#options) for list of available options).

**Example:**
```JavaScript
const options = {
    penColor: 'red',
    backgroundColor: 'black',
    height: 300,
    width: 500
};
const { canvasProps } = useSignaturePad(options);

return (
    <canvas {...canvasProps} />
);
```

**The hook returns the following items:**

`canvasProps` (object)
The `canvasProps` must be passed to a `<canvas>` element in order to turn that
element into a SignaturePad.

**Example:**
```JavaScript
const { canvasProps } = useSignaturePad();

return (
    <canvas {...canvasProps} />
);
```

`handleSave` (function)<br/>
This function can be called to capture the signature and save as an image.
Optional arguments include:

* `imageType` (string): The desired Image Type in which to save, must be one of (Defaults to `"image/png"`):
    * `"image/png"`
    * `image/jpeg"`
    * `"image/webp"`
    * `"image/svg+xml`

* `imageQuality` (number): Number between 0 and 1 (inclusive) indicating the image quality to use for image formats that use lossy compression such as jpeg and webp. Defaults to 0.92 (92%).

**Example:**
```javascript
const { handleSave, canvasProps } = useSignaturePad();

const onSave = () => {
    const imgDataUrl = handleSave('image/jpeg', 1); // original quality JPEG
    return alert(`Saved: ${imgDataUrl}`);
};

return (
    <div>
        <canvas {...canvasProps} />
        <button type="button" onClick={onSave}>Save Signature</button>
    </div>
);
```

`handleClear` (function)<br/>
This function can be called to clear out the contents of the SignaturePad.

**Example:**
```javascript
const { handleClear, canvasProps } = useSignaturePad();

return (
    <div>
        <canvas {...canvasProps} />
        <button type="button" onClick={handleClear}>Clear Signature</button>
    </div>
);
```

`updateOptions` (function)<br/>
This function can be passed any options that need to be updated in the SignaturePad.
The same options that are accepted by `useSignaturePad` can all be updated using this function (see [Options](#options) for list of available options).

**Example:**
```JavaScript
const { canvasProps, updateOptions } = useSignaturePad({ penColor: 'black' });

return (
    <div>
        <canvas {...canvasProps} />
        <button type="button" onClick={updateOptions({ penColor: 'red' })}>Red Pen</button>
        <button type="button" onClick={updateOptions({ penColor: 'green' })}>Green Pen</button>
        <button type="button" onClick={updateOptions({ penColor: 'blue' })}>Blue Pen</button>
    </div>
);
```

<br/>

### Options
_The first two options are for the canvas and are highly recommended.  The drawing/signing
experience is a little awkward when the canvas is not a fixed size.
**NOTE: these should be passed in to the `useSignaturePad` hook and not passed directly
to the `<canvas/>` element so that the SignaturePad can control the size.  These values
are then passed on to the `<canvas/>` element in the `canvasProps`.**_

`height` (number)<br/>
The height in pixels of the canvas.


`width` (number)<br/>
The width in pixels of the canvas.

<br/>

_The remaining options are what are currently supported by the underlying [`signature_pad` library](https://github.com/szimek/signature_pad#options)._


`dotSize` (float or function)<br/>
Radius of a single dot.

`minWidth`(float)<br/>
Minimum width of a line. Defaults to 0.5.

`maxWidth` (float)<br/>
Maximum width of a line. Defaults to 2.5.

`throttle` (integer)<br/>
Draw the next point at most once per every x milliseconds. Set it to 0 to turn off throttling. Defaults to 16.

`minDistance` (integer)<br/>
Add the next point only if the previous one is farther than x pixels. Defaults to 5.

`backgroundColor` (string)<br/>
Color used to clear the background. Can be any color format accepted by context.fillStyle. Defaults to "rgba(0,0,0,0)" (transparent black). Use a non-transparent color e.g. "rgb(255,255,255)" (opaque white) if you'd like to save signatures as JPEG images.

`penColor` (string)<br/>
Color used to draw the lines. Can be any color format accepted by context.fillStyle. Defaults to "black".

`velocityFilterWeight` (float)<br/>
Weight used to modify new velocity based on the previous velocity. Defaults to 0.7.

`onBegin` (function)<br/>
Callback when stroke begin.

`onEnd` (function)<br/>
Callback when stroke end.

<br/>

## Examples
Stories using Storybook have been created to provide examples.  These can be run by cloning this repo and doing:
```bash
npm install
npm run storybook
```

and then navigating to `localhost:9001`.

See `/stories/index.js` for code examples.
