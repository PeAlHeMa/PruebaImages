document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('viewer');
    const productImage = document.getElementById('product-image');
    const loading = document.getElementById('loading');

    // Configuration
    const imageDir = 'images/';
    const imageNamePrefix = 'frame-';
    const imageExtension = '.jpg';
    const images = []; // Will be a 2D array: images[row][col]
    let rowCount = 0;
    let colCount = 0;
    let currentRow = 0;
    let currentCol = 0;

    function findImageDimensions() {
        findCols(1, 1);
    }

    function findCols(row, col) {
        const img = new Image();
        img.src = `${imageDir}${imageNamePrefix}${row}-${col}${imageExtension}`;
        img.onload = () => {
            findCols(row, col + 1);
        };
        img.onerror = () => {
            colCount = col - 1;
            if (colCount > 0) {
                findRows(1);
            } else {
                loading.textContent = 'No images found. Please follow the naming convention (e.g., frame-1-1.jpg).';
            }
        };
    }

    function findRows(row) {
        const img = new Image();
        img.src = `${imageDir}${imageNamePrefix}${row}-1${imageExtension}`;
        img.onload = () => {
            findRows(row + 1);
        };
        img.onerror = () => {
            rowCount = row - 1;
            if (rowCount > 0) {
                preloadImages();
            } else {
                loading.textContent = 'No images found. Please follow the naming convention (e.g., frame-1-1.jpg).';
            }
        };
    }

    function preloadImages() {
        let loadedCount = 0;
        const totalImages = rowCount * colCount;

        function loadImage(r, c) {
            if (r > rowCount) return;

            const img = new Image();
            img.src = `${imageDir}${imageNamePrefix}${r}-${c}${imageExtension}`;

            if (!images[r - 1]) {
                images[r - 1] = [];
            }
            images[r - 1][c - 1] = img;

            const next_c = (c % colCount) + 1;
            const next_r = (c === colCount) ? r + 1 : r;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    loading.style.display = 'none';
                    productImage.src = images[0][0].src;
                } else {
                    loadImage(next_r, next_c);
                }
            };

            img.onerror = () => {
                console.error(`Failed to load image: ${img.src}`);
                loadedCount++;
                if (loadedCount === totalImages) {
                    loading.style.display = 'none';
                    if(images[0] && images[0][0]){
                        productImage.src = images[0][0].src;
                    }
                } else {
                    loadImage(next_r, next_c);
                }
            };
        }

        loadImage(1, 1);
    }

    // Handle mouse/touch events
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let previousCol = 0;
    let previousRow = 0;

    function startDrag(e) {
        if (rowCount === 0 || colCount === 0) return;
        isDragging = true;
        viewer.classList.add('grabbing');
        startX = e.clientX || e.touches[0].clientX;
        startY = e.clientY || e.touches[0].clientY;
    }

    function onDrag(e) {
        if (!isDragging) return;

        const currentX = e.clientX || e.touches[0].clientX;
        const currentY = e.clientY || e.touches[0].clientY;

        const dx = currentX - startX;
        const dy = currentY - startY;

        const colRotation = Math.round(dx / 10); // Adjust sensitivity
        const rowRotation = Math.round(dy / 10); // Adjust sensitivity

        let newCol = (previousCol - colRotation) % colCount;
        if (newCol < 0) newCol += colCount;

        let newRow = (previousRow + rowRotation) % rowCount;
        if (newRow < 0) newRow += rowCount;

        if (newCol !== currentCol || newRow !== currentRow) {
            currentCol = newCol;
            currentRow = newRow;
            productImage.src = images[currentRow][currentCol].src;
        }
    }

    function stopDrag() {
        isDragging = false;
        viewer.classList.remove('grabbing');
        previousCol = currentCol;
        previousRow = currentRow;
    }

    viewer.addEventListener('mousedown', startDrag);
    viewer.addEventListener('touchstart', startDrag);
    viewer.addEventListener('mousemove', onDrag);
    viewer.addEventListener('touchmove', onDrag);
    viewer.addEventListener('mouseup', stopDrag);
    viewer.addEventListener('touchend', stopDrag);
    viewer.addEventListener('mouseleave', stopDrag);

    // Initial setup
    findImageDimensions();
});
