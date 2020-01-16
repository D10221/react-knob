import { useState } from "react";
export const initialState = {
  scale: 1,
  cursorPos: [] as number[],
  knobCenter: [] as number[],
  topPosition: 0,
};
export type State = typeof initialState;
/** */
export default function useKnobState(onChange?: (value: number) => any) {
  const [state, setState] = useState(initialState);
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
