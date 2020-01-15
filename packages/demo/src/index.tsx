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
};
/** */
const App = () => {
  const [
    { value, dialogOpen, size, overlay, skin, bufferSize },
    _setState,
  ] = useState(initialState);
  /** */
  function setState(update: Partial<typeof initialState>) {
    _setState({
      value, dialogOpen, size, overlay, skin, bufferSize,
      ...update,
    })
  }
  function onValueChanged(value: number) {
    if (value < 0) return;
    if (value > 100) return;
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
            min={0}
            max={100}
            step={1}
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
