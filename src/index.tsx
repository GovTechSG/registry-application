// @flow
/* eslint-disable no-underscore-dangle */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import Web3 from "web3";

import createHistory from "history/createBrowserHistory";
import { Route, RouteProps } from "react-router-dom";
import {
  ConnectedRouter,
  routerMiddleware,
  routerReducer
} from "react-router-redux";

import App from "@src/containers/App";
import reducers from "@src/reducers";

// CSS escape hatch: name files with myfile.legacy.css
const legacyCss = require("./styles/style.legacy.css");

// https://github.com/emotion-js/emotion/pull/419
// import { ThemeProvider } from "emotion-theming";
import { gotoStep } from "@src/actions";
import styled from "react-emotion";

// TypeScript definitions for devtools in /my-globals/index.d.ts
// Redux devtools are still enabled in production!
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist: []
    })
  : compose;

// Extend window for TypeScript
declare global {
  interface Window {
    web3: Web3;
    gatewayUrl: string;
  }
}

// TODO: Figure out how to move this into state
const url = new URL(window.location.href);
const step = url.searchParams.get("step");
const endpoint = url.searchParams.get("h") || "http://127.0.0.1:8545";
const endpointWs = url.searchParams.get("w") || "ws://127.0.0.1:9545";
const provider =
  Web3.givenProvider || new Web3.providers.HttpProvider(endpoint);
// const provider = Web3.givenProvider || new Web3.providers.WebsocketProvider(endpoint);
window.web3 = new Web3(provider);

window.gatewayUrl = url.searchParams.get("gateway") || "http://localhost:3000";

const appReducer = combineReducers({
  ...reducers,
  router: routerReducer
});

const history = createHistory();
const middleware = [thunkMiddleware, routerMiddleware(history)];

const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

if (step != null) {
  store.dispatch(gotoStep(Number.parseInt(step, 10)));
}

// Example of extending extra props on library components
interface MyRouteProps extends RouteProps {
  unusedProp: string;
}
class MyRoute extends Route<MyRouteProps> {}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <MyRoute exact path="/" component={App} unusedProp="unused" />
        <MyRoute path="/counter" component={App} unusedProp="unused" />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
