import React, { useState } from "react";
import Knob from "@d10221/react-knob";

const App = () => {
  const [state, setState] = useState({ value: 0 });
  function handleChange(value: number) {
    if (value < 0) return;
    if (value > 100) return;
    setState({ value });
  }
  function render() {
    return (
      <>
        <header>React Knob</header>
        <main>
          <Knob
            value={state.value}
            onChange={handleChange}
            size={65}
            min={0}
            max={100}
            step={1}
            bufferSize={300}
          ></Knob>
        </main>
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
