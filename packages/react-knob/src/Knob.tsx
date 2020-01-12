import React from "react";
import KnobContainer, { KnobContainerProps } from "./KnobContainer";
import Rotate from "./rotate";
import PointerHandler from "./PointerHandler";
import { getRotation } from "./utils";
import { KnobSkin } from "./KnobSkin";
/**
 * 
 */
const Knob = ({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  size = 65 as number | string,
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
