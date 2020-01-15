import ClickAwayListener from "@d10221/react-click-away-listener"; // external module
import Knob from "@d10221/react-knob"; //local: module
import SkinCss from "@d10221/react-knob-skin-css"; // local: module
import SkinSvg from "@d10221/react-knob-skin-svg"; // local: module
import SkinSvgSimple from "@d10221/react-knob-skin-svg-simple"; // local:module
import React, { ChangeEvent, useState } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

const repoUrl = "https://github.com/D10221/react-knob";
const issuesUrl = "https://github.com/D10221/react-knob/issues";

function round(n: number, decimals?: number) {
  return parseFloat(n.toFixed(decimals));
}

/** */
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
const BUFFER_SIZE = 300;
const DEFAULT_SKIN = "default";
const skins = [
  { key: "default", display: "default" },
  { key: "css:1", display: "css" },
  { key: "css:2", display: "css custom" },
  { key: "svg:1", display: "svg fancy" },
  { key: "svg:2", display: "svg custom #1" },
  { key: "svg:3", display: "svg custom #2" },
];
/**
 *
 */
function renderSkin({ skin = DEFAULT_SKIN, bufferSize = BUFFER_SIZE }) {
  switch (skin) {
    case "css": {
      // No Class
      return <SkinCss />;
    }
    case "css:2": {
      return <SkinCss circleClass={"knob-circle"} />;
    }
    case "svg:1": {
      // inbuild svg?
      return (
        <SkinSvg
          bufferSize={bufferSize}
          classes={
            {
              // labels: "red-labels"
            }
          }
          styles={{
            labels: {
              // display: "none"
            },
          }}
        />
      );
    }
    case "svg:2": {
      // local sample:
      return (
        <SkinSvgSimple
          styles={{ dial: { fill: "white" } }}
        />
      );
    }
    case "svg:3": {
      // local sample:
      return (
        <SkinSvgSimple
          classes={{ dial: "red-dial" }}
        />
      );
    }
    default:
      return null; //inbuilt skin
  }
}
const initialState = {
  value: 0,
  dialogOpen: false,
  size: 65,
  overlay: true,
  skin: DEFAULT_SKIN,
  bufferSize: BUFFER_SIZE,
  step: 1,
  min: 0,
  max: 100
};
/** */
const App = () => {
  const [
    { value, dialogOpen, size, overlay, skin, bufferSize, step, min, max },
    _setState,
  ] = useState(initialState);
  /** */
  function setState(update: Partial<typeof initialState>) {
    _setState({
      value, dialogOpen, size, overlay, skin, bufferSize, step, min, max,
      ...update,
    })
  }
  function onValueChanged(value: number) {
    if (value < min) return;
    if (value > max) return;
    setState({ value });
  }
  function onInputValueChanged(e: ChangeEvent<HTMLInputElement>) {
    onValueChanged(e.target.valueAsNumber);
  }
  function onDialogOpenChanged(open: boolean) {
    return () =>
      setState({ dialogOpen: open });
  }
  function onSizeChanged(e: ChangeEvent<HTMLInputElement>) {
    setState({
      size: e.target.valueAsNumber,
    });
  }
  function onOverlayChanged(e: ChangeEvent<HTMLInputElement>) {
    setState({
      overlay: e.target.checked,
    });
  }
  function onSkinChanged(e: ChangeEvent<HTMLSelectElement>) {
    setState({
      skin: e.currentTarget.value,
    });
  }
  /** */
  function render() {
    return (
      <>
        <header>
          <a aria-label="project home" href={repoUrl}>
            React Knob
          </a>
          <button className="clear" onClick={onDialogOpenChanged(true)}>
            <Icon value="⚙" label="Settings" />
          </button>
        </header>
        <main>
          <Knob
            value={value}
            onChange={onValueChanged}
            size={size}
            min={min}
            max={max}
            step={step}
            bufferSize={bufferSize}
            overlay={overlay}
          >
            {/* Children are Optional: defaults to 'KnobSkin' */}
            {renderSkin({ skin, bufferSize })}
          </Knob>
          <input
            aria-label="knob value"
            type="number"
            value={value}
            onChange={onInputValueChanged}
            min={min}
            max={max}
          />
        </main>
        <footer>
          <div>
            <Icon value="💬" label="Feedback" />
            <a href={issuesUrl}>Feedback</a>
          </div>
        </footer>
        <ClickAwayListener onClickAway={onDialogOpenChanged(false)}>
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
                  onChange={onSizeChanged}
                />
              </div>
              <div className="row">
                <label htmlFor="Overlay">Overlay</label>
                <input
                  type="checkbox"
                  checked={overlay}
                  onChange={onOverlayChanged}
                />
              </div>
              <div className="row">
                <label>Skin</label>
                <select onChange={onSkinChanged}>
                  {skins.map(skin => (
                    <option
                      key={`options-select-skin-option-${skin.key}`}
                      value={skin.key}
                    >
                      {skin.display}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row">
                <label>Step ({step})</label>
                <input
                  id="step-range"
                  type="range"
                  min={0.5}
                  max={round(max / 4)}
                  step={0.5}
                  value={step}
                  onChange={e => setState({ step: e.target.valueAsNumber })}
                />
              </div>
            </div>
            <div className="row">
              <label htmlFor="size-input-range">Min ({min})</label>
              <input
                id="min-range"
                type="range"
                min={0}
                max={round(max / 4)}
                step={1}
                value={min}
                onChange={e => setState({ min: e.target.valueAsNumber })}
              />
            </div>
            <div className="row">
              <label htmlFor="size-input-range">Max ({max})</label>
              <input
                id="max-range"
                type="range"
                min={round(max / 4)}
                max={1000}
                step={1}
                value={max}
                onChange={e => setState({ max: e.target.valueAsNumber })}
              />
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
