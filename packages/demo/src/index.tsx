import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Knob from "@d10221/react-knob";
import * as serviceWorker from "./serviceWorker";

const repoUrl = "https://github.com/D10221/react-knob";
const issuesUrl = "https://github.com/D10221/react-knob#issues";

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
        <header>
          <a href={repoUrl}>React Knob</a>
        </header>
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
          <input
            type="number"
            value={state.value}
            onChange={e => handleChange(e.target.valueAsNumber)}
          />
        </main>
        <footer>
          <div>
            <span aria-label="Feedback" aria-hidden="false">
              ☁
            </span>
            <a href={issuesUrl}>Feedback</a>
          </div>
        </footer>
      </>
    );
  }
  return render();
};

ReactDOM.render(<App />, document.body);

serviceWorker.unregister();
