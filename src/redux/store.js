import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import dataReducer from "./reducers/dataReducers";
import uiReducer from "./reducers/uiReducers";
import userReducer from "./reducers/userReducers";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    data: dataReducer,
    ui: uiReducer,
    user: userReducer
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;