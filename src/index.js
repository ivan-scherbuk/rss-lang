import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./redux/rootReducer";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = [applyMiddleware(thunk)];

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(
  rootReducer,
  composeEnhancers(
    ...enhancers
  )
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
