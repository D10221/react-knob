import React from "react";
import KnobContainer, { KnobContainerProps } from "./KnobContainer";
import Rotate from "./rotate";
import PointerHandler from "./PointerHandler";
import { getRotation } from "./utils";
import KnobSkin from "./KnobSkin";
import {
  DEFAULT_SIZE,
  DEFAULT_STEP,
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_VALUE,
} from "./defaults";
import KnobOverlay from "./KnobOverlay";
import useKnobState from "./KnobState";
type OnChange = (value: number) => any;
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
  noOverlay = false,
  // ...
  onChange: _onchange = undefined as OnChange | undefined,
  children = undefined as React.ReactNode | undefined,
  containerProps = undefined as Omit<KnobContainerProps, "size"> | undefined,
}) => {
  const onChange: OnChange = val =>
    typeof _onchange === "function" && val !== value && _onchange(val);

  const { state, move, done, start } = useKnobState(onChange);
  const { cursorPos, knobCenter, scale, topPosition } = state;
  const onPointerDown = PointerHandler({
    value,
    min,
    max,
    step,
    onMove: move,
    onDown: start,
    onUp: done,
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
      {noOverlay || !topPosition ? null : (
        <KnobOverlay
          cursorPos={cursorPos}
          knobCenter={knobCenter}
          scale={scale}
          topPosition={topPosition}
        />
      )}
    </KnobContainer>
  );
};

export default Knob;
