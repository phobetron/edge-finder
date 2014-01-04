# Edge Finder

This is a simple jQuery plugin that takes a given image and scans it for edges, returning an array of pixels.

This plugin currently works best with flat monochrome graphics and is not intended to be used on complex images. Also, it uses the `<canvas>` element to load image data, and so will only work on more modern browsers.

## Usage

To use, include jQuery and the EF javascript code, and instantiate similarly:

```js
$("img#edges").EdgeFinder('left');
```

The plugin currently supports the following "sides" from which to scan:

- `top`
- `right`
- `bottom`
- `left`
- `vertical` (top and bottom)
- `horizontal` (left and right)
- `entire` (top, right, bottom, left)

The plugin also accepts an optional settings object with the `rgba` and `excludes` properties.

The `rgba` property must be a four item array, the first three items being an integer between 0 and 255, and the fourth an integer or float between 0 and 1. The edge finder will scane for the edges of the color specified by this parameter. The default is `[0, 0, 0, 0]`.

The `excludes` property is an array of exclusion zones, each containing an arrray of x/y coordinate hashes. No edge points will be returned within an exclusion zone. Currently, only rectangular zones are supported, so each zone is expected to contain two points each. For example:

```js
[
  [
    { x: 0, y: 0 },
    { x: 100, y: 100}
  ]
]
```

The plugin returns an array of point coordinate hashes.

## Contributing

Feel free to fork this repo and submit a pull request. Thanks!

---

Created and maintained by Charles Hudson
