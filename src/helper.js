export function checkHeading(str) {
    return /^\*\*.*\*$/.test(str);
}
export function removeStars(str) {
    return str.replace(/\*/g, "");
}