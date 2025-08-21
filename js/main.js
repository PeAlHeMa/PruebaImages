document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('viewer');
    const productImage = document.getElementById('product-image');
    const loading = document.getElementById('loading');

    // Configuration
    const imageDir = 'images/';
    const imageNamePrefix = 'frame-';
    const imageExtension = '.jpg';
    const images = [];
    let imageCount = 0;
    let currentFrame = 0;

    // Preload images
    function findImages(index = 1) {
        const img = new Image();
        img.src = `${imageDir}${imageNamePrefix}${index}${imageExtension}`;

        img.onload = () => {
            images.push(img);
            findImages(index + 1); // Recursively load the next image
        };

        img.onerror = () => {
            // This is the first image that failed to load, so the sequence ends here.
            imageCount = images.length;
            if (imageCount > 0) {
                // All images are now preloaded and in the `images` array.
                loading.style.display = 'none';
                productImage.src = images[0].src;
                previousFrame = 0; // Initialize for dragging
            } else {
                loading.textContent = 'No images found. Please follow the naming convention (e.g., frame-1.jpg, frame-2.jpg, ...).';
            }
        };
    }

    // Handle mouse/touch events
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let previousFrame = 0;

    function startDrag(e) {
        if (imageCount === 0) return;
        isDragging = true;
        viewer.classList.add('grabbing');
        startX = e.clientX || e.touches[0].clientX;
        currentX = startX;
    }

    function onDrag(e) {
        if (!isDragging || imageCount === 0) return;
        currentX = e.clientX || e.touches[0].clientX;
        const dx = currentX - startX;
        const rotation = Math.round(dx / 10); // Adjust sensitivity
        let frame = (previousFrame - rotation) % imageCount;
        if (frame < 0) frame += imageCount;

        if (frame !== currentFrame) {
            currentFrame = frame;
            productImage.src = images[currentFrame].src;
        }
    }

    function stopDrag() {
        isDragging = false;
        viewer.classList.remove('grabbing');
        previousFrame = currentFrame;
    }

    viewer.addEventListener('mousedown', startDrag);
    viewer.addEventListener('touchstart', startDrag);
    viewer.addEventListener('mousemove', onDrag);
    viewer.addEventListener('touchmove', onDrag);
    viewer.addEventListener('mouseup', stopDrag);
    viewer.addEventListener('touchend', stopDrag);
    viewer.addEventListener('mouseleave', stopDrag);

    // Initial setup
    findImages();
});
