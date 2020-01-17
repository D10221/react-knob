import ClickAwayListener from "@d10221/react-click-away-listener"; // external module
import Knob from "@d10221/react-knob"; //local: module
import KnobOverlay from "@d10221/react-knob-overlay"; //local: module
import SkinCss from "@d10221/react-knob-skin-css"; // local: module
import SkinSvg from "@d10221/react-knob-skin-svg"; // local: module
import SkinSvgSimple from "@d10221/react-knob-skin-svg-simple"; // local:module
// import KnobOverlay from "@d10221/react-knob-overlay";
import React, { ChangeEvent, useState } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
(window as any).h = React.createElement; // hyperscript compatible
const repoUrl = "https://github.com/D10221/react-knob";
const issuesUrl = "https://github.com/D10221/react-knob/issues";
/** */
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
/** */
const FlexSpacer = () => <div style={{ flex: "1 0" }} />;
const BUFFER_SIZE = 300;
const DEFAULT_SKIN = "svg:1";
const skins = [
  { key: "css:1", display: "css" },
  { key: "css:2", display: "css custom" },
  { key: "svg:0", display: "svg fancy" },
  { key: "svg:1", display: "svg simple" },
  { key: "svg:2", display: "svg custom #1" },
  { key: "svg:3", display: "svg custom #2" },
];
/**
 *
 */
function renderSkin({ skin = DEFAULT_SKIN, bufferSize = BUFFER_SIZE }) {
  switch (skin) {
    case "css:1": {
      // No Class
      return <SkinCss />;
    }
    case "css:2": {
      return <SkinCss circleClass={"knob-circle"} />;
    }    
    case "svg:0": {
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
    case "svg:1": return <SkinSvgSimple />
    case "svg:2": {
      // local sample:
      return <SkinSvgSimple styles={{ dial: { fill: "white" } }} />;
    }
    case "svg:3": {
      // local sample:
      return <SkinSvgSimple classes={{ dial: "red-dial" }} />;
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
  max: 100,
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
      value,
      dialogOpen,
      size,
      overlay,
      skin,
      bufferSize,
      step,
      min,
      max,
      ...update,
    });
  }
  function reset() {
    setState(initialState);
  }
  function canChangeValue(value: number) {
    return !isNaN(value) && value >= min && value <= max;
  }
  function onValueChanged(value: number) {
    if (!canChangeValue(value)) return;
    setState({ value });
  }
  function onInputValueChanged(e: ChangeEvent<HTMLInputElement>) {
    onValueChanged(e.target.valueAsNumber);
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
  function stepUp() {
    const next = value + step;
    if (canChangeValue(next))
      setState({
        value: next,
      });
  }
  function stepDown() {
    const next = value - step;
    if (canChangeValue(next))
      setState({
        value: next,
      });
  }
  function closeDialog() {
    setState({ dialogOpen: false });
  }
  return (
    <>
      <header>
        <a aria-label="project home" href={repoUrl}>
          React Knob
        </a>
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
          render={state => (
            <KnobOverlay
              {...state}
              lineClassName="overlay-line" // 
              // lineStyle={{ backgroundColor: "white" }}
            />
          )}
        >
          {/* Children are Optional: defaults to 'KnobSkin' */}
          {renderSkin({ skin, bufferSize })}
        </Knob>
        <div className="row margin-1 align-center">
          <button className="color-extra-20 clear" onClick={stepDown}>
            <Icon value={"◀"} />
          </button>
          <input
            id="value-input"
            type="number"
            value={value}
            onChange={onInputValueChanged}
            min={min}
            max={max}
            step={step}
            style={{ width: `${size * 0.7}px` }}
          />
          <button className="color-extra-20 clear" onClick={stepUp}>
            <Icon value={"▶"} />
          </button>
        </div>
      </main>
      <footer>
        <div>
          <Icon value="💬" label="Feedback" />
          <a href={issuesUrl}>Feedback</a>
        </div>
      </footer>
      <div className="settings">
        <button
          className="clear"
          onClick={e => {
            e.preventDefault();
            setState({ dialogOpen: !dialogOpen });
          }}
        >
          <Icon value="⚙" label="Settings" className="icon xx-large" />
        </button>
      </div>
      <ClickAwayListener onClickAway={closeDialog}>
        <dialog open={dialogOpen} className={dialogOpen ? "open" : ""}>
          <div className="column">
            <div className="row space-between no-margin no-padding">
              <FlexSpacer />
              <button onClick={closeDialog} className="clear color-extra-20">
                <Icon value={"✖"} />
              </button>
            </div>
            <div className="row space-between">
              <label className="fixed" htmlFor="size-input-range">
                Size
              </label>
              <input
                id="size-input-range"
                type="range"
                min={25}
                max={250}
                value={size}
                onChange={onSizeChanged}
              />
            </div>
            <div className="row space-between">
              <label className="fixed" htmlFor="Overlay">
                Overlay
              </label>
              <input
                type="checkbox"
                checked={overlay}
                onChange={onOverlayChanged}
              />
              <div style={{ flex: "1 0" }} />
            </div>
            <div className="row space-between">
              <label className="fixed">Skin</label>
              <select onChange={onSkinChanged} value={skin}>
                {skins.map(skin => (
                  <option
                    key={`options-select-skin-option-${skin.key}`}
                    value={skin.key}
                  >
                    {skin.display}
                  </option>
                ))}
              </select>
              <div style={{ flex: "1 0" }} />
            </div>
            <div className="row space-between">
              <label className="row fixed">Step</label>
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
          <div className="row space-between">
            <label className="row fixed" htmlFor="size-input-range">
              Min
            </label>
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
          <div className="row space-between">
            <label className="row fixed" htmlFor="size-input-range">
              Max
            </label>
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
          <div className="row space-between">
            <label className="row fixed" htmlFor="size-input-range">
              Buffer Size
            </label>
            <input
              id="buffer-size-range"
              type="range"
              min={100}
              max={360}
              step={1}
              value={bufferSize}
              onChange={e => setState({ bufferSize: e.target.valueAsNumber })}
            />
          </div>
          <pre>
            {JSON.stringify(
              {
                SIZE: size,
                OVERLAY: overlay,
                SKIN: skin,
                STEP: step,
                MIN: min,
                MAX: max,
                "BUFFER SIZE": bufferSize,
              },
              null,
              2,
            ).replace(/({|}|,|")/gi, "")}
          </pre>
          <div className="row" style={{ justifyContent: "flex-end" }}>
            <button
              className="clear color-extra-20 border-thin-solid-color-extra-20"
              onClick={reset}
            >
              <Icon value={"RESET"} />
            </button>
          </div>
        </dialog>
      </ClickAwayListener>
    </>
  );
};

ReactDOM.render(<App />, document.body);

serviceWorker.unregister();
