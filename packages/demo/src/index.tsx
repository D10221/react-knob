import React, { useState, ChangeEvent } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Knob, { KnobSkin } from "@d10221/react-knob";
import * as serviceWorker from "./serviceWorker";
import ClickAwayListener from "@d10221/react-click-away-listener";
const repoUrl = "https://github.com/D10221/react-knob";
const issuesUrl = "https://github.com/D10221/react-knob/issues";

const App = () => {
  const [{ value, dialogOpen, size, noOverlay }, setState] = useState({
    value: 0,
    dialogOpen: true,
    size: 65,
    noOverlay: false,
  });
  function changeValue(value: number) {
    if (value < 0) return;
    if (value > 100) return;
    setState({ value, dialogOpen, size, noOverlay });
  }
  function handleInputValueChanged(e: ChangeEvent<HTMLInputElement>) {
    changeValue(e.target.valueAsNumber);
  }
  function handleDialogOpen(open: boolean) {
    return () => setState({ value, dialogOpen: open, size, noOverlay });
  }
  function handleSizeChanged(e: ChangeEvent<HTMLInputElement>) {
    setState({ value, dialogOpen, size: e.target.valueAsNumber, noOverlay });
  }
  function onNoOverlayChanged(e: ChangeEvent<HTMLInputElement>) {
    setState({
      value,
      dialogOpen,
      noOverlay: !e.target.checked,
      size,
    });
  }
  function render() {
    return (
      <>
        <header>
          <a aria-label="project home" href={repoUrl}>
            React Knob
          </a>
          <button className="clear" onClick={handleDialogOpen(true)}>
            <span role="img" aria-label="Feedback">
              {"⚙"}
            </span>
          </button>
        </header>
        <main>
          <Knob
            value={value}
            onChange={changeValue}
            size={size}
            min={0}
            max={100}
            step={1}
            bufferSize={300}
            noOverlay={noOverlay}
          >
            {/* Children are Optional: defaults to 'KnobSkin' */}
            <KnobSkin
              /* circleClass:optional */
              circleClass={"knob-circle-roland"}
              /* dialClass:optional */
              dialClass={"knob-dial"}
            />
          </Knob>
          <input
            aria-label="knob value"
            type="number"
            value={value}
            onChange={handleInputValueChanged}
            min={0}
            max={100}
          />
        </main>
        <footer>
          <div>
            <span role="img" aria-label="Feedback">
              {"💬"}
            </span>
            <a href={issuesUrl}>Feedback</a>
          </div>
        </footer>
        <ClickAwayListener onClickAway={handleDialogOpen(false)}>
          <dialog open={dialogOpen}>
            <div className="column">
              <div className="row">
                <label htmlFor="size-input-range">Size</label>
                <input
                  id="size-input-range"
                  type="range"
                  min={25}
                  max={250}
                  value={size}
                  onChange={handleSizeChanged}
                />
              </div>
              <div className="row">
                <label htmlFor="no-overlay">Overlay</label>
                <input
                  type="checkbox"
                  checked={!noOverlay}
                  onChange={onNoOverlayChanged}
                />
              </div>
            </div>
          </dialog>
        </ClickAwayListener>
      </>
    );
  }
  return render();
};

ReactDOM.render(<App />, document.body);

serviceWorker.unregister();
