import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home/home";
import AllCountries from "../AllCountries/AllCountries";
import SignIn from "../auth/signin";
import SignUp from "../auth/signup";
import MyRecords from "../myRecords/myRecords";
import PageNotFound from '../404/404';
export default function Pages() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/AllCountries" component={AllCountries} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/myRecords" component={MyRecords} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}
