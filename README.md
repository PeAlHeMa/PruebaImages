# 360° Product Image Viewer

A simple, lightweight, and easy-to-use 360° product image viewer. This project allows you to display a sequence of product images that can be rotated with mouse or touch controls, simulating a 3D model experience.

It's built with vanilla JavaScript, HTML, and CSS, and has no external dependencies.

## Features

- **Multi-row 360° Rotation**: View products from all angles, with both horizontal and vertical rotation.
- **Mouse and Touch Controls**: Drag horizontally, vertically, and diagonally to rotate the product.
- **Easy Setup**: Just drop your images into a folder.
- **No Dependencies**: No need for jQuery, Three.js, or any other library.
- **Responsive**: Works on desktop and mobile devices.
- **Optimized Loading**: Images are preloaded efficiently.

## How to Use

1.  **Download or Clone**: Get the project files.
2.  **Add Your Images**: Place your product images inside the `images` folder.
3.  **Name Your Images**: Your images must be named in a grid-based sequence, with rows and columns. The naming convention is `frame-{row}-{col}.jpg`. For example:

    -   `frame-1-1.jpg`, `frame-1-2.jpg`, ..., `frame-1-36.jpg` (Row 1)
    -   `frame-2-1.jpg`, `frame-2-2.jpg`, ..., `frame-2-36.jpg` (Row 2)
    -   ...and so on.

    The script will automatically detect the number of rows and columns.

    The prefix (`frame-`) and extension (`.jpg`) can be easily configured in the `js/main.js` file if needed.

4.  **Open `index.html`**: Open the `index.html` file in your web browser to see the viewer in action.

## Customization

If your image files have a different naming convention, you can easily update the settings in `js/main.js`:

```javascript
// In js/main.js
// ...

// Configuration
const imageDir = 'images/';
const imageNamePrefix = 'your-prefix-'; // Change this
const imageExtension = '.png'; // Change this if you use .png or other formats

// ...
```

That's it! The script will automatically detect how many images are in the sequence and load them.