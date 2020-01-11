import React, { useState, useEffect } from "react";
import Knob from "./knob";
import css from "./knob/css";

const App = () => {
  const [state, setState] = useState({ value: 0 });
  const className = "wrapper-xyz";
  useEffect(() =>
    css(
      ` 
  /* border: 1px solid pink;   */
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  margin:0;
  padding: 0;`,
      className,
    ),
  );
  function handleChange(value: number) {
    if (value < 0) return;
    if (value > 100) return;
    setState({ value });
  }
  function render() {
    return (
      <>
        <header> Fucking Knob </header>
        <div className={className}>
          <Knob
            value={state.value}
            onChange={handleChange}
            size={65}
            min={0}
            max={100}
            step={1}
            bufferSize={300}
          ></Knob>
        </div>
        <input
          type="number"
          value={state.value}
          onChange={e => handleChange(e.target.valueAsNumber)}
        />
      </>
    );
  }
  return render();
};

export default App;
