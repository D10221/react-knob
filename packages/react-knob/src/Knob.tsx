import React from "react";
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
  const onPointerDown = PointerHandler({ value, min, max, step, onChange });
  return (
    <KnobContainer
      size={size}
      onPointerDown={onPointerDown}
      {...containerProps}
    >
      <Rotate rotation={getRotation({ value, min, max, bufferSize })}>
        {children || <KnobSkin />}
      </Rotate>
    </KnobContainer>
  );
};

export default Knob;
