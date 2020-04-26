import React from "react";
// Only needed for development
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from "react-dom";
import Example from "./Example";
import Example2 from "./Example2";

function App() {
  const { pathname } = window.location;
  if (pathname === "/example2") {
    return <Example2 />;
  }
  return <Example />;
}

ReactDOM.render(<App />, document.querySelector("#root"));
