document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('imageCanvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            analyzePixels(ctx, img.width, img.height);
            extractColors(img);
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);
});

function analyzePixels(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height).data;
    const totalPixels = width * height;
    let alphaPixels = 0;
    let colorPixels = 0;

    for (let i = 0; i < imageData.length; i += 4) {
        const a = imageData[i + 3];
        if (a === 0) {
            alphaPixels++;
        } else {
            colorPixels++;
        }
    }

    document.getElementById('totalPixels').textContent = `Total Pixels: ${totalPixels}`;
    document.getElementById('alphaPixels').textContent = `Alpha Pixels: ${alphaPixels}`;
    document.getElementById('colorPixels').textContent = `Color Pixels: ${colorPixels}`;
}

function extractColors(img) {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(img, 5, 5); // Здесь можно менять параметр quality
    const colorResults = document.getElementById('colorResults');
    colorResults.innerHTML = '';

    palette.forEach((color, index) => {
        const hexColor = rgbToHex(color[0], color[1], color[2]);
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = hexColor;

        const colorLabel = document.createElement('div');
        colorLabel.className = 'color-label';
        colorLabel.textContent = hexColor;

        const colorContainer = document.createElement('div');
        colorContainer.appendChild(colorBox);
        colorContainer.appendChild(colorLabel);

        colorResults.appendChild(colorContainer);
    });
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}
