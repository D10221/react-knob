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