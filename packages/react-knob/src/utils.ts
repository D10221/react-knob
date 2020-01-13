/** */
export function snap(number: number, increment = number, offset = number) {
  return Math.round(number / increment) * increment + offset;
}
/** */
export function getNormalizedValue(value: number, min: number, max: number) {
  return (value - min) / (max - min);
}
/** */
export function isHtmlElement(e: any): e is HTMLElement {
  return e instanceof HTMLElement;
}
/** */
export const cartesian2Polar: (
  x: number[],
  y: number[],
) => { distance: number; degrees: number } =
  /** */
  ([x1, y1], [x2, y2]) => {
    const x = x2 - x1;
    const y = y2 - y1;
    const distance = Math.sqrt(x * x + y * y);
    const radians = Math.atan2(y, x);
    const degrees = radians * (180 / Math.PI);
    return { distance, degrees };
  };
/** */
export function getRotation({
  value = 0,
  min = 0,
  max = 100,
  bufferSize = 360,
}) {
  return getNormalizedValue(value, min, max) * bufferSize - bufferSize / 2;
}
/** */
export const ownerDocument = (node?: Element | Text | null | undefined) =>
  (node && node.ownerDocument) || document;
/** */  
export function round(n: number, decimals?: number) {
  return parseFloat(n.toFixed(decimals));
}