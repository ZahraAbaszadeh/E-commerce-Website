import { CREATE_ORDER, GET_ORDERS, DELETE_ORDER } from "../types/orderTypes";

export const createOrder = (orderData) => {
  return {
    type: CREATE_ORDER,
    payload: orderData,
  };
};

export const getOrders = () => {
  return {
    type: GET_ORDERS,
  };
};

export const deleteOrder = () => {
  return {
    type: DELETE_ORDER,
  };
};
