import { applyMiddleware, compose, createStore } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = [applyMiddleware(thunk)];

export const store = createStore(rootReducer, composeEnhancers(...enhancers));
export const persistor = persistStore(store)