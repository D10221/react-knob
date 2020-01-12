import React from "react";
import { BASE_HEIGHT } from "./defaults";
import { isHtmlElement, getNormalizedValue, snap, ownerDocument } from "./utils";
/**
 *
 * @param config Creates documetn bound pointer events handler
 */
const PointerHandler = ({ value = 0, min = 0, max = 100, step = 1, onChange = undefined as ((value: number) => any) | undefined, }) => (ev: PointerEvent | MouseEvent | React.MouseEvent | React.PointerEvent) => {
  ev.preventDefault();
  const { currentTarget } = ev;
  if (!isHtmlElement(currentTarget))
    return;
  const startY = ev.clientY; //hold initial Y value
  const knobRect = (currentTarget as any).getBoundingClientRect();
  function onPointerMove(me: PointerEvent | MouseEvent) {
    me.preventDefault();
    const { clientX, clientY } = me;
    const xDistance = Math.abs(clientX - (knobRect.left + knobRect.width / 2));
    const scale = xDistance / 200 + 1;
    let topPosition = clientY -
      (BASE_HEIGHT * scale -
        getNormalizedValue(value, min, max) * (BASE_HEIGHT * scale));
    // handle guide Y repositioning
    if (startY < topPosition) {
      topPosition = startY;
    }
    if (startY > topPosition + BASE_HEIGHT * scale) {
      topPosition = startY - BASE_HEIGHT * scale;
    }
    const normalizedValue = (100 - (startY - topPosition) * (100 / (BASE_HEIGHT * scale))) / 100;
    const unnormalizedValue = snap(normalizedValue * (max - min), step, min);
    if (unnormalizedValue !== value && onChange) {
      onChange(unnormalizedValue);
    }
  }
  const doc = ownerDocument(currentTarget); // multi doc support ? 
  doc.addEventListener("pointermove", onPointerMove, false);
  doc.addEventListener("pointerup", function removeEventListeners() {
    doc.removeEventListener("pointermove", onPointerMove, false);
    doc.removeEventListener("pointerup", removeEventListeners, false);
  }, false);
};
export default PointerHandler;