import { useState } from "react";
/** */
export default function useKnobState(onChange?: (value: number) => any) {
  const [state, setState] = useState({
    scale: 1,
    cursorPos: [] as number[],
    knobCenter: [] as number[],
    topPosition: 0,
  });
  return {
    state,
    setState,
    start: () => {
      /* noop */
    },
    move: ({
      value = 0,
      cursorPos = [] as number[],
      knobCenter = [] as number[],
      scale = 1,
      topPosition = 0,
    }) => {
      if (onChange) onChange(value);
      setState({ cursorPos, knobCenter, scale, topPosition });
    },
    done: () => {
      setState({ scale: 1, cursorPos: [], knobCenter: [], topPosition: 0 });
    },
  };
}
