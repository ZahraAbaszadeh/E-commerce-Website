import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADJUST_QUANTITY,
  LOAD_CURRENT_ITEM,
  GET_BASKET_LENGTH,
  GET_ITEM_FROM_CART,
  CLEAR_CART,
} from "../types/shoppingTypes";

export const addToCart = (productId, qty = 1) => {
  return {
    type: ADD_TO_CART,
    payload: {
      id: productId,
      qty: qty,
    },
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: {
      id: productId,
    },
  };
};

export const adjustQuantity = (productId, quantity) => {
  return {
    type: ADJUST_QUANTITY,
    payload: {
      id: productId,
      qty: quantity,
    },
  };
};

export const loadCurrentItem = (product) => {
  return {
    type: LOAD_CURRENT_ITEM,
    payload: product,
  };
};

export const getBasketLength = () => {
  return {
    type: GET_BASKET_LENGTH,
  };
};

export const getItemFromCart = (productId) => {
  return {
    type: GET_ITEM_FROM_CART,
    payload: {
      id: productId,
    },
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
