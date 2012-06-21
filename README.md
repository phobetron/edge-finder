# Edge Finder

This is a simple jQuery module that takes a given image and scans it for edges, returning an array of pixels. It uses the `<canvas>` element to load image data, and so will only work on more modern browsers.

The module currently supports the following "directions" from which to scan:
* top
* right
* bottom
* left
* vertical (top and bottom)
* horizontal (left and right)
* entire (top, right, bottom, left)

This currently works best with flat monochrome graphics and has not yet been tested with more complex images.
