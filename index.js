import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import App from "./App";

//user personality
import Login from "./component/pages/form-user/login";
import Register from "./component/pages/form-user/register";
import Profile from "./component/pages/profile/";

//categories
import Setting from "./component/pages/category/setting/";
import People from "./component/pages/category/people/";
import Notifications from "./component/pages/category/notification/"
import Photo from "./component/pages/category/photo/"
import Statistic from "./component/pages/category/statistic/"

ReactDOM.render(
  <HashRouter>
    <div>
      <Route path="/" component={App} exact />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/people" component={People} />
      <Route path="/setting" component={Setting} />
      <Route path="/notification" component={Notifications} />
      <Route path="/photo" component={Photo} />
      <Route path="/statistic" component={Statistic} />
    </div>
  </HashRouter>,
  document.getElementById("root")
);
