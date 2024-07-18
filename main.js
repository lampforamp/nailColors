document.getElementById('imageInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.getElementById('imageCanvas');
            const ctx = canvas.getContext('2d');
            const maxCanvasWidth = document.querySelector('.style-photo').clientWidth;
            const maxCanvasHeight = document.querySelector('.style-photo').clientHeight;
            let canvasWidth = img.width;
            let canvasHeight = img.height;

            // Рассчитываем новые размеры с сохранением пропорций
            if (canvasWidth > maxCanvasWidth || canvasHeight > maxCanvasHeight) {
                const widthRatio = maxCanvasWidth / canvasWidth;
                const heightRatio = maxCanvasHeight / canvasHeight;
                const ratio = Math.min(widthRatio, heightRatio);

                canvasWidth = canvasWidth * ratio;
                canvasHeight = canvasHeight * ratio;
            }

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const palette = extractColors(img)
            
            renderPalette(palette)
            const result = findClosestColors(palette, colors, 50)
            console.log(result)
            renderClosestColors(result)

            // Удаляем фоновое изображение после загрузки нового
            document.querySelector('.style-photo').style.backgroundImage = 'none';
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);
});

function extractColors(img) {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(img, 5, 5); // Здесь можно менять параметр quality
    return palette
}

function renderPalette(palette) {
    console.log(palette)
    const colorResults = document.getElementById('colorResults');
    colorResults.innerHTML = palette.map(color => {
        const hexColor = rgbToHex(color[0], color[1], color[2]);
        return `
            <div class="color-box" style="background-color: ${hexColor};"></div>
        `;
    }).join('');
}

function renderClosestColors(palette) {
    console.log(palette)
    const colorResults = document.getElementById('materials');
    colorResults.innerHTML = palette.map(color => {
        // const hexColor = rgbToHex(color[0], color[1], color[2]);
        return `
            <div class="color-box" style="background-color: ${color.code};"></div>
        `;
    }).join('');
}



