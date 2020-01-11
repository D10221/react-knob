import React, { useState, useEffect } from "react";
import { BASE_HEIGHT } from "./Constants";
import Rotate from "./rotate";
import css from "./css";
import KnobHandle from "./KnobHandle";
import KnobInner from "./KnobInner";

function snap(number: number, increment = number, offset = number) {
  return Math.round(number / increment) * increment + offset;
}

function emptyKnobState() {
  return {
    topPosition: 0,
    xPosition: 0,
    scale: 1,
    knobCenter: [] as number[],
    cursorPos: [] as number[],
  };
}

function getNormalizedValue(value: number, min: number, max: number) {
  return (value - min) / (max - min);
}

const Knob = ({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  size = undefined as number | string | undefined,
  bufferSize = 360,
  //
  onChange = undefined as Function | undefined,
  children = undefined as React.ReactNode | undefined,
}) => {
  const [state, setState] = useState(emptyKnobState());

  function handleDrag(e: PointerEvent | MouseEvent) {
    e.preventDefault();
    const xPosition = e.clientX;
    const tempY = e.clientY;
    const xDistance = Math.abs(xPosition - state.knobCenter[0]);
    const scale = xDistance / 200 + 1;

    let topPosition = state.topPosition;

    // handle guide Y repositioning
    if (tempY < topPosition) {
      topPosition = tempY;
    }
    if (tempY > topPosition + BASE_HEIGHT * scale) {
      topPosition = tempY - BASE_HEIGHT * scale;
    }

    const cursorPos = [e.clientX, e.clientY];
    const normalizedValue =
      (100 - (tempY - topPosition) * (100 / (BASE_HEIGHT * scale))) / 100;
    const unnormalizedValue = snap(normalizedValue * (max - min), step, min);

    setState({ ...state, topPosition, scale, cursorPos });
    if (unnormalizedValue !== value) {
      onChange && onChange(unnormalizedValue);
    }
  }

  function endDrag() {
    document.removeEventListener("mousemove", handleDrag, false);
    document.removeEventListener("mouseup", endDrag, false);
    setState({ ...state, ...emptyKnobState() });
  }

  function startDrag(
    e: PointerEvent | MouseEvent | React.MouseEvent | React.PointerEvent,
  ) {
    e.preventDefault();

    const knobRect = (e.currentTarget! as HTMLElement).getBoundingClientRect();
    const knobCenter = [
      knobRect.left + knobRect.width / 2,
      knobRect.top + knobRect.height / 2,
    ];

    const xPosition = e.clientX;
    const distance = Math.abs(xPosition - knobCenter[0]);
    const scale = distance / 200 + 1;
    const topPosition =
      e.clientY -
      (BASE_HEIGHT * scale -
        getNormalizedValue(value, min, max) * (BASE_HEIGHT * scale));

    const cursorPos = [e.clientX, e.clientY];

    document.addEventListener("mousemove", handleDrag, false);
    document.addEventListener("mouseup", endDrag, false);

    setState({
      xPosition,
      topPosition,
      scale,
      knobCenter,
      cursorPos,
    });
  }
  const rotationAmount =
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
      onMouseDown={startDrag}
      id="knob"
    >
      <Rotate rotation={rotationAmount}>
        {children || (
          <KnobInner>
            <KnobHandle />
          </KnobInner>
        )}
      </Rotate>
    </div>
  );
};

export default Knob;
