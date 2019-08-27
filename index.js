import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import App from "./App";
import Dashboard from './component/pages/admin/index';
import "./index.css";

ReactDOM.render(
  <HashRouter>
    <div>
      <Route path="/" component={App} exact />
      <Route path="/dashboard" component={Dashboard}/>

    </div>
  </HashRouter>,
  document.getElementById("root")
);
