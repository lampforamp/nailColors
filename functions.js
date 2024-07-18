
function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function findClosestColor(targetColor, availableColors) {
    let closestColor = null;
    let smallestDistance = Infinity;

    availableColors.forEach(color => {
        if (color && color.code) { // Safety check
            const paletteObj = {
                r:targetColor[0], g:targetColor[1], b:targetColor[2],
            }
            const distance = colorDistance(paletteObj, hexToRgb(color.code));
            // console.log('distanca', distance)
            if (distance < smallestDistance) {
                smallestDistance = distance;
                closestColor = color;
            }
        }
    });

    return closestColor;
}

function colorDistance(rgb1, rgb2) {
    // console.log(rgb1, rgb2)
    const result = Math.sqrt(
        (rgb1.r - rgb2.r) * (rgb1.r - rgb2.r) +
        (rgb1.g - rgb2.g) * (rgb1.g - rgb2.g) +
        (rgb1.b - rgb2.b) * (rgb1.b - rgb2.b)
    );
    // console.log(result)
    return result
}

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function rgbObjToHex(rgbObj) {
    const { r, g, b } = rgbObj;
    const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    return {
        hex: `#${hex}`,
        r: r,
        g: g,
        b: b
    };
}


function findClosestColors(targetColors, availableColors, tolerance) {
    return targetColors.map(targetColor => {
        const closestColor = findClosestColor(targetColor, availableColors);
        if (closestColor) {
            const paletteObj = {
                r: targetColor[0], g: targetColor[1], b: targetColor[2]
            };
            const distance = colorDistance(paletteObj, hexToRgb(closestColor.code));
            console.log(distance);
            return distance <= tolerance ? closestColor : null;
        }
        return null;
    }).filter(color => color !== null);
}

