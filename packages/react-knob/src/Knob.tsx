import React, { FunctionComponent } from "react";
import Rotate from "@d10221/react-rotate"; //this should be bundled here!
import {
  DEFAULT_BUFFER_SIZE,
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_SIZE,
  DEFAULT_STEP,
  DEFAULT_VALUE,
} from "./defaults";
import KnobContainer, { KnobContainerProps } from "./KnobContainer";
import useKnobState, { State as KnobState } from "./KnobState";
import PointerHandler from "./PointerHandler";
import { getRotation } from "./utils";
/** */
type RenderState<S> = (state: S) => any;
/** */
type OnChange = (value: number) => any;
/** */
function noop() {
  return null;
}
/**
 * Holds internal state
 * Applies rotation via style.transform property
 * Gate for options
 * Controls overlay visibility
 */
const Knob: FunctionComponent<{
  /**
   * Holds the value to be translated to rotation amount
   * @required
   * @default 0
   */
  value: number;
  /** @description minimum applicable value @default 0*/
  min?: number;
  /** @description maximum applicable value @default 100*/
  max?: number;
  /** Step size @default 1 */
  step?: number | undefined;
  /**
   * @description will be applied as 'width' and 'height' equally as style property
   * @optional
   * @default 65px
   * */
  size?: number | string | undefined;
  /**
   * @description total rotation in deg, ex: 360°
   */
  bufferSize?: number;
  /**
   * render knob statee, ... after children
   * @default {KnobOverlay}
   * @optional
   */
  render?: RenderState<KnobState & { value: number }> | null | undefined;
  /**
   * @optional
   * @description callback with the new value
   */
  onChange?: OnChange | undefined;
  /**
   * @description allows override this component main container props see './KnobContainer'
   * Note size is set by this props
   * Style can be overriden by style/className
   */
  containerProps?: Omit<KnobContainerProps, "size"> | undefined | undefined;
}> = ({
  value = DEFAULT_VALUE,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  step = DEFAULT_STEP,
  size = DEFAULT_SIZE,
  bufferSize = DEFAULT_BUFFER_SIZE,
  render: Render,
  onChange: _onchange = undefined as OnChange | undefined,
  children = undefined as React.ReactNode | undefined,
  containerProps = undefined,
}) => {
  Render = Render || noop;
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
  const rotation = getRotation({ value, min, max, bufferSize });
  return (
    <KnobContainer
      size={size}
      onPointerDown={onPointerDown}
      {...containerProps}
    >
      <Rotate rotation={rotation}>{children}</Rotate>
      <Render {...{ cursorPos, knobCenter, scale, topPosition, value }} />
    </KnobContainer>
  );
};

export default Knob;
