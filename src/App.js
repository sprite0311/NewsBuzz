import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
          <Route exact path="/"><News key="general" pageSize={6} country="in" catagory="general"/></Route> 
          <Route exact path="/business"><News key="business" pageSize={6} country="in" catagory="business"/></Route> 
          <Route exact path="/entertainment"><News key="entertainment" pageSize={6} country="in" catagory="entertainment"/></Route> 
          <Route exact path="/general"><News key="general" pageSize={6} country="in" catagory="general"/></Route> 
          <Route exact path="/health"><News key="health" pageSize={6} country="in" catagory="health"/></Route> 
          <Route exact path="/science"><News key="science" pageSize={6} country="in" catagory="science"/></Route> 
          <Route exact path="/sports"><News key="sports" pageSize={6} country="in" catagory="sports"/></Route> 
          <Route exact path="/technology"><News key="technology" pageSize={6} country="in" catagory="technology"/></Route> 
        </Switch>
        </Router>
      </div>
    );
  }
}
