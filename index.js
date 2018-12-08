import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import App from "./App";
import Welcome from "./component/pages/welcome-pages/Welcomes";
import Test from "./component/functions/Test";

ReactDOM.render(
  <HashRouter>
    <div>
      <Route path="/" component={App} exact />
      <Route path="/welcome" component={Welcome} />
      <Route path="/test" component={Test} />
    </div>
  </HashRouter>,
  document.getElementById("root")
);
