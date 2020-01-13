import React from "react";
import { BASE_HEIGHT } from "./defaults";
import {
  isHtmlElement,
  getNormalizedValue,
  snap,
  ownerDocument,
} from "./utils";
/** */
type OnChange = (changes: {
  value: number;
  scale: number;
  cursorPos: number[];
  knobCenter: number[];
  topPosition: number;
}) => any;
/** */
type OnUp = () => any;
type OnDown = (x: {
  clientY: number,
  rect: number[],
}) => any;
/** 
 * Creates an event handler with inbuilt logic
 */
type PointerHandler = (p: {
  value: number;
  min: number;
  max: number;
  step: number;
  onMove: OnChange;
  onUp?: OnUp;
  onDown?: OnDown;
}) => (
    e: PointerEvent | MouseEvent | React.MouseEvent | React.PointerEvent,
  ) => any;
/**
 * TODO: move logic out?, leave just the events ? 
 * @param config Creates parent document bound pointer events handler
 */
const PointerHandler: PointerHandler = ({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onMove,
  onUp,
  onDown
}) => ev => {
  ev.preventDefault();
  const { currentTarget } = ev;
  if (!isHtmlElement(currentTarget)) return;
  const startY = ev.clientY; //hold initial Y value  
  const knobRect = (currentTarget as any).getBoundingClientRect();
  if (typeof onDown === "function") onDown({
    // TODO: opportunity to move logic up
    clientY: ev.clientY,
    rect: knobRect
  });
  /** */
  function onPointerMove(me: PointerEvent | MouseEvent) {
    me.preventDefault();
    const { clientX, clientY } = me;
    const xDistance = Math.abs(clientX - (knobRect.left + knobRect.width / 2));
    const scale = xDistance / 200 + 1;
    let topPosition =
      clientY -
      (BASE_HEIGHT * scale -
        getNormalizedValue(value, min, max) * (BASE_HEIGHT * scale));
    // handle guide Y repositioning
    if (startY < topPosition) {
      topPosition = startY;
    }
    if (startY > topPosition + BASE_HEIGHT * scale) {
      topPosition = startY - BASE_HEIGHT * scale;
    }
    const normalizedValue =
      (100 - (startY - topPosition) * (100 / (BASE_HEIGHT * scale))) / 100;
    const unnormalizedValue = snap(normalizedValue * (max - min), step, min);
    if (unnormalizedValue !== value && onMove) {
      onMove({
        // TODO: opportunity to move logic up
        value: unnormalizedValue,
        scale,
        cursorPos: [clientX, clientY],
        knobCenter: [
          knobRect.left + knobRect.width / 2,
          knobRect.top + knobRect.height / 2,
        ],
        topPosition,
      });
    }
  }
  const doc = ownerDocument(currentTarget); // multi doc support ?
  doc.addEventListener("pointermove", onPointerMove, false);
  doc.addEventListener(
    "pointerup",
    function removeEventListeners() {
      doc.removeEventListener("pointermove", onPointerMove, false);
      doc.removeEventListener("pointerup", removeEventListeners, false);
      if (typeof onUp === "function") onUp(); // TODO: opportunity to move logic up
    },
    false,
  );
};
export default PointerHandler;
