import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <NavBar />
            <Home />
          </Route>

          <Route exact path="/verify">
            <NavBar />
          </Route>

          <Route exact path="/account">
            <NavBar />
          </Route>

          <Route exact path="/orders">
            <NavBar />
          </Route>

          <Route exact path="/store/:category">
            <NavBar />
          </Route>

          <Route exact path="/item/:id">
            <NavBar />
          </Route>

          <Route exact path="*">
            <NavBar />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
