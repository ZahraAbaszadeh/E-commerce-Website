import { combineReducers } from "redux";
import { ShoppingReducer } from "./shoppingReducer";
import { productSort } from "./productSortReducer";
import { userLogin } from "./userLoginReducer";
import { orderReducer } from "./orderReducer";
import {
  loadBasketState,
  loadOrderState,
  loadUserData,
} from "../../utils/function";

export const allReducer = combineReducers({
  userLogin(state = loadUserData(), action) {
    return userLogin(state, action);
  },
  productSort(state = "desc", action) {
    return productSort(state, action);
  },
  shoppingReducer(state = loadBasketState(), action) {
    return ShoppingReducer(state, action);
  },
  orderReducer(state = loadOrderState(), action) {
    return orderReducer(state, action);
  },
});
