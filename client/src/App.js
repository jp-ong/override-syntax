import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import Verify from "./components/verify/Verify";
import Account from "./components/account/Account";
import Store from "./components/store/Store";
import Item from "./components/item/Item";
import Checkout from "./components/checkout/Checkout";
import Orders from "./components/orders/Orders";
import ErrorPage from "./components/error/ErrorPage";
import Disclaimer from "./components/Disclaimer";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <NavBar />
            <Home />
            <Disclaimer />
          </Route>

          <Route exact path="/verify">
            <Verify />
            <Disclaimer />
          </Route>

          <Route exact path="/account">
            <NavBar />
            <Account />
            <Disclaimer />
          </Route>

          <Route exact path="/orders">
            <NavBar />
            <Orders />
            <Disclaimer />
          </Route>

          <Route
            exact
            path="/store/:category"
            render={(props) => (
              <>
                <NavBar />
                <Store {...props} />
                <Disclaimer />
              </>
            )}
          />

          <Route
            exact
            path="/item/:id"
            render={(props) => (
              <>
                <NavBar />
                <Item {...props} />
                <Disclaimer />
              </>
            )}
          />
          <Route exact path="/checkout">
            <NavBar />
            <Checkout />
            <Disclaimer />
          </Route>

          <Route exact path="*">
            <NavBar />
            <ErrorPage />
            <Disclaimer />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
