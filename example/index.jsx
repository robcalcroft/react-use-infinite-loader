import React from "react";
// Don't want react-dom to be downloaded for consumers!
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from "react-dom";
import Example from "./Example";

ReactDOM.render(<Example />, document.querySelector("#root"));
