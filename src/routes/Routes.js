import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home";
import NotFound from "../components/NotFound/NotFound";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import AppliedRoute from "./AppliedRoute";

export default ({ childProps }) =>
<Switch>
  <AppliedRoute path="/" exact component={Home} props={childProps} />
  <AppliedRoute path="/login" exact component={Login} props={childProps} />
  <AppliedRoute path="/signup" exact component={Signup} props={childProps} />

  { /* Finally, catch all unmatched routes */ }
  <Route component={NotFound} />
</Switch>;