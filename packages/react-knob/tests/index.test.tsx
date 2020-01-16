import React from "react";
import Knob from "../src";
import ReactDOM from "react-dom";

(window as  any)["h"] = React.createElement;

describe("Knob", () => {
  it("Doesn't crash", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Knob value={0} />, div);
  });
});
