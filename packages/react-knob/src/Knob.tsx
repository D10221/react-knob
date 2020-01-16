import KnobSkin from "@d10221/react-knob-skin-svg-simple"; //this should be bundled here!
import Rotate from "@d10221/react-rotate"; //this should be bundled here!
import React, { FunctionComponent } from "react";
import {
  DEFAULT_BUFFER_SIZE,
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_SIZE,
  DEFAULT_STEP,
  DEFAULT_VALUE,
} from "./defaults";
import KnobContainer, { KnobContainerProps } from "./KnobContainer";
import KnobOverlay from "./KnobOverlay";
import useKnobState, { State as KnobState } from "./KnobState";
import PointerHandler from "./PointerHandler";
import { getRotation } from "./utils";
type OnChange = (value: number) => any;
/**
 * Creates a knob with default skin if no children provided
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
  step: number;
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
   * render props
   * @default {KnobOverlay}
   */
  renderProps?: (state: KnobState) => any | undefined;
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
  renderProps = KnobOverlay,
  onChange: _onchange = undefined as OnChange | undefined,
  children = undefined as React.ReactNode | undefined,
  containerProps = undefined,
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
    const rotation = getRotation({ value, min, max, bufferSize });
    return (
      <KnobContainer
        size={size}
        onPointerDown={onPointerDown}
        {...containerProps}
      >
        <Rotate rotation={rotation}>{children || <KnobSkin />}</Rotate>
        {!topPosition ? null : typeof renderProps !== "function" ? null : renderProps({ cursorPos, knobCenter, scale, topPosition })}
      </KnobContainer>
    );
  };

export default Knob;
