import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import App from "./App";
// import "./index.css";
import Home from "./component/pages/home/index.home";

ReactDOM.render(
  <HashRouter>
    <div>
      <Route path="/" component={App} exact />
      <Route path="/home" component={Home} />
    </div>
  </HashRouter>,
  document.getElementById("root")
);
