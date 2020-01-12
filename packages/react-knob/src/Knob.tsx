import React, { useState } from "react";
import KnobContainer, { KnobContainerProps } from "./KnobContainer";
import Rotate from "./rotate";
import PointerHandler from "./PointerHandler";
import { getRotation } from "./utils";
import { KnobSkin } from "./KnobSkin";
import {
  DEFAULT_SIZE,
  DEFAULT_STEP,
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_VALUE,
} from "./defaults";
import KnobOverlay from "./KnobOverlay";
/**
 * Create a knob with default skin if no children provided
 */
const Knob = ({
  value = DEFAULT_VALUE,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  step = DEFAULT_STEP,
  size = DEFAULT_SIZE,
  bufferSize = 360,
  //
  onChange = undefined as ((value: number) => any) | undefined,
  children = undefined as React.ReactNode | undefined,
  containerProps = undefined as Omit<KnobContainerProps, "size"> | undefined,
}) => {
  const [{ scale, cursorPos, knobCenter, topPosition }, setState] = useState({
    scale: 1,
    cursorPos: [] as number[],
    knobCenter: [] as number[],
    topPosition: 0,
  });

  const onPointerDown = PointerHandler({
    value,
    min,
    max,
    step,
    onChange: ({
      value: _value,
      cursorPos,
      knobCenter,
      scale,
      topPosition,
    }) => {
      if (value !== _value) {
        if (onChange) onChange(_value);
        setState({ cursorPos, knobCenter, scale, topPosition });
      }
    },
  });
  return (
    <KnobContainer
      size={size}
      onPointerDown={onPointerDown}
      {...containerProps}
    >
      <Rotate rotation={getRotation({ value, min, max, bufferSize })}>
        {children || <KnobSkin />}
      </Rotate>
      <KnobOverlay
        cursorPos={cursorPos}
        knobCenter={knobCenter}
        scale={scale}
        topPosition={topPosition}
      />
    </KnobContainer>
  );
};

export default Knob;
