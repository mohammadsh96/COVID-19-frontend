import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Header from "../components/header";
import Home from "../Home/home";
import AllCountries from '../allCountries/AllCountries'
import SignIn from "../auth/signin";
import SignUp from "../auth/signup";
// import Products from "../components/products/products";
// import SingleProduct from "../components/products/singleProduct";
// import Dashboard from "../components/dashboard/dashboard"
// import Back from "../components/Back/back";
export default function Pages() {
  return (
    <>
  
     


      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/AllCountries" component={AllCountries} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          {/* 
          <Route exact path="/productDetails" component={Products} />
          <Route exact path="/productDetails" component={Products} />
          <Route exact path="/productDetails/:id" component={SingleProduct} />
          
          <Route exact path="/Dashboard" component={Dashboard} /> */}



        
        </Switch>
      </Router>
      
    </>
  );
}