import React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

ReactDOM.render(
  <div id="content" className="datalogz-primary-dark-bg">
    <App />
  </div>,

  document.getElementById("content") || document.createElement("div")
);