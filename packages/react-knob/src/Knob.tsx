import React, { FunctionComponent } from "react";
import KnobContainer, { KnobContainerProps } from "./KnobContainer";
import Rotate from "./rotate";
import PointerHandler from "./PointerHandler";
import { getRotation } from "./utils";
import KnobSkin from "./SkinSvgSimple";
import {
  DEFAULT_SIZE,
  DEFAULT_STEP,
  DEFAULT_MAX,
  DEFAULT_MIN,
  DEFAULT_VALUE,
  DEFAULT_BUFFER_SIZE
} from "./defaults";
import KnobOverlay from "./KnobOverlay";
import useKnobState from "./KnobState";
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
   * do not render overlay
   */
  noOverlay?: boolean | undefined;
  /**
   * @optional
   * @description callback with the new value   
   */
  onChange?: OnChange | undefined;
  /**
   * @description allows override this component main container props see './KnobContainer'
   * 
   */
  containerProps?: Omit<KnobContainerProps, "size"> | undefined | undefined
}> = ({
  value = DEFAULT_VALUE,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  step = DEFAULT_STEP,
  size = DEFAULT_SIZE,
  bufferSize = DEFAULT_BUFFER_SIZE,
  //
  noOverlay = false,
  // ...
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
        <Rotate rotation={rotation}>
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
