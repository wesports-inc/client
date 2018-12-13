import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import App from "./App";
import Profile from "./component/pages/profile/";
import Login from "./component/pages/form-user/login";
import Test from "./component/functions/Test";
import Register from "./component/pages/form-user/register";

ReactDOM.render(
  <HashRouter>
    <div>
      <Route path="/" component={App} exact />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/test" component={Test} />
    </div>
  </HashRouter>,
  document.getElementById("root")
);
