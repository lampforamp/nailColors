function findClosestColors(targetColors, availableColors, tolerance) {
    return targetColors.map(targetColor => {
        const closestColor = findClosestColor(targetColor, availableColors);
        const distance = colorDistance(hexToRgb(targetColor), hexToRgb(closestColor.code));
        return distance <= tolerance ? closestColor : null;
    }).filter(color => color !== null);
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}
console.log('functions')