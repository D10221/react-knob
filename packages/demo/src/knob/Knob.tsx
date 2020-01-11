import React, { useEffect } from "react";
import { BASE_HEIGHT } from "./Constants";
import Rotate from "./rotate";
import css from "./css";
import KnobHandle from "./KnobHandle";
import KnobInner from "./KnobInner";

function snap(number: number, increment = number, offset = number) {
  return Math.round(number / increment) * increment + offset;
}

function getNormalizedValue(value: number, min: number, max: number) {
  return (value - min) / (max - min);
}
function isHtmlElement(e: any): e is HTMLElement {
  return e instanceof HTMLElement;
}

function Knob({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  size = undefined as number | string | undefined,
  bufferSize = 360,
  //
  onChange = undefined as Function | undefined,
  children = undefined as React.ReactNode | undefined,
}) {
  function onPointerDown(
    ev: PointerEvent | MouseEvent | React.MouseEvent | React.PointerEvent,
  ) {
    ev.preventDefault();
    const { currentTarget } = ev;
    if (!isHtmlElement(currentTarget)) return;

    const startY = ev.clientY; //hold initial Y value 
    const knobRect = (currentTarget as any).getBoundingClientRect();

    function onPointerMove(me: PointerEvent | MouseEvent) {
      me.preventDefault();
      const { clientX, clientY } = me;

      const xDistance = Math.abs(
        clientX - (knobRect.left + knobRect.width / 2),
      );
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
      if (unnormalizedValue !== value) {
        if (onChange) {
          setTimeout(() => onChange(unnormalizedValue));
        }
      }
    }

    document.addEventListener("pointermove", onPointerMove, false);
    document.addEventListener(
      "pointerup",
      function removeEventListeners() {        
        document.removeEventListener("pointermove", onPointerMove, false);
        document.removeEventListener("pointerup", removeEventListeners, false);
      },
      false,
    );
  }
  const rotation =
    getNormalizedValue(value, min, max) * bufferSize - bufferSize / 2;

  const className = "xxx-yyy-000";
  const style = `
  margin:0;
padding: 0;
overflow: hidden;
display: flex;
flex-direction: column;
justify-content: center;
justify-items: center;
align-items: center;
align-content: center;
  `;
  useEffect(() => css(style, className));
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className={className}
      onPointerDown={onPointerDown}
      id="knob"
    >
      <Rotate rotation={rotation}>
        {children || (
          <KnobInner>
            <KnobHandle />
          </KnobInner>
        )}
      </Rotate>
    </div>
  );
}

export default Knob;
