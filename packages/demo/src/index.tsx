import React, { useState, ChangeEvent } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Knob, CssSkin, SvgSkin, SimpleSkin } from "@d10221/react-knob";
import * as serviceWorker from "./serviceWorker";
import ClickAwayListener from "@d10221/react-click-away-listener";
const repoUrl = "https://github.com/D10221/react-knob";
const issuesUrl = "https://github.com/D10221/react-knob/issues";
const Icon = ({ label = "", value = "", className = "icon" }) => (
  <span
    className={className}
    role="img"
    aria-label={label || ""}
    aria-hidden={!Boolean(label)}
  >
    {value}
  </span>
);

const App = () => {
  const [{ value, dialogOpen, size, noOverlay, skin, bufferSize }, setState] = useState({
    value: 0,
    dialogOpen: true,
    size: 65,
    noOverlay: false,
    skin: "svg:1",
    bufferSize: 300,
  });
  function changeValue(value: number) {
    if (value < 0) return;
    if (value > 100) return;
    setState({ value, dialogOpen, size, noOverlay, skin, bufferSize });
  }
  function handleInputValueChanged(e: ChangeEvent<HTMLInputElement>) {
    changeValue(e.target.valueAsNumber);
  }
  function handleDialogOpen(open: boolean) {
    return () => setState({ value, dialogOpen: open, size, noOverlay, skin, bufferSize });
  }
  function handleSizeChanged(e: ChangeEvent<HTMLInputElement>) {
    setState({ value, dialogOpen, size: e.target.valueAsNumber, noOverlay, skin, bufferSize });
  }
  function onNoOverlayChanged(e: ChangeEvent<HTMLInputElement>) {
    setState({
      value,
      dialogOpen,
      noOverlay: !e.target.checked,
      size,
      skin,
      bufferSize
    });
  }
  function handleChangeSkin(e: React.MouseEvent<HTMLButtonElement>) {
    setState({
      value,
      dialogOpen,
      noOverlay,
      size,
      bufferSize,
      skin: e.currentTarget.value
    })
  }
  const skins = ["css", "css:custom", "svg:1", "svg:2"];
  function renderSkin(skin: string) {
    switch (skin) {
      case "css": {     
        // No Class   
        return <CssSkin  />
      }
      case "css:custom": {
        // circleClass:optional
        // dialClass:optional
        // dialClass={"knob-dial"}
        return <CssSkin circleClass={"knob-circle"} />
      }
      case "svg:1":
        {
          // local sample: 
          return <SimpleSkin />
        }
      case "svg:2":
        {
          // inbuild svg?
          return <SvgSkin bufferSize={bufferSize} />
        }
      default: return null; //default skin
    }
  }
  function render() {
    return (
      <>
        <header>
          <a aria-label="project home" href={repoUrl}>
            React Knob
          </a>
          <button className="clear" onClick={handleDialogOpen(true)}>
            <Icon value="⚙" label="Settings" />
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
            bufferSize={bufferSize}
            noOverlay={noOverlay}
          >
            {/* Children are Optional: defaults to 'KnobSkin' */}
            {renderSkin(skin)}
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
            <Icon value="💬" label="Feedback" />
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
              <div className="row">
                <label>Skin</label>
                {skins.map(skin => (
                  <button key={`${skin}`} className="clear" onClick={handleChangeSkin} value={skin}>
                    <Icon value={`${skin}`} className={"numeral"} />
                  </button>))}
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
