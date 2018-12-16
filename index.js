import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import App from "./App";
import Profile from "./component/pages/profile/";
import Login from "./component/pages/form-user/login";
import Setting from "./component/pages/profile/setting/";
import Register from "./component/pages/form-user/register";
import People from "./component/pages/people/index";
import Notification from "./component/pages/profile/notification/"

ReactDOM.render(
  <HashRouter>
    <div>
      <Route path="/" component={App} exact />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/people" component={People} />
      <Route path="/setting" component={Setting} />
      <Route path="/notification" component={Notification} />
    </div>
  </HashRouter>,
  document.getElementById("root")
);
