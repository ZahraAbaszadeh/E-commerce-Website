import { applyMiddleware, compose, createStore } from "redux";
import { allReducer } from "./reducers/index";
import { APP_ENVIORMENT } from "../configs/variablesConfig";
import ReduxThunk from "redux-thunk";
import { saveBasketState, saveOrderState } from "../utils/function";

const composeEnhancers =
  (APP_ENVIORMENT !== "production" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  allReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

store.subscribe(() => {
  saveBasketState(store.getState().shoppingReducer);
  saveOrderState(store.getState().orderReducer);
});
