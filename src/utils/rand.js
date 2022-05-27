export function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function randIntGenerator(min, max) {
    return () => randInt(min, max);
}

export function randIntArray(len, min, max) {
    return Array.from({length: len}, () => randInt(min, max));
}
