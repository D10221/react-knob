import React, { FunctionComponent, useEffect, useState } from "react";
import KnobSkin from "@d10221/react-knob-skin-svg-simple"; //this should be bundled here!
import Rotate from "@d10221/react-rotate"; //this should be bundled here!
import Overlay from "@d10221/react-knob-overlay";
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

type RenderState<S> = (state: S) => any

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
   * render props
   * @default {KnobOverlay}
   */
  renderState?: RenderState<KnobState> | null | undefined;
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
  renderState,
  onChange: _onchange = undefined as OnChange | undefined,
  children = undefined as React.ReactNode | undefined,
  containerProps = undefined,
}) => {

    const onChange: OnChange = val =>
      typeof _onchange === "function" && val !== value && _onchange(val);

    const [render, setRender] = useState(renderState)
    useEffect(() => {
      if (render) return;
      setRender(Overlay)
    });

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
        {typeof render === "function" ? render({ cursorPos, knobCenter, scale, topPosition }) : null}
      </KnobContainer>
    );
  };

export default Knob;
