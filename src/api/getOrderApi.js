import { GET_ORDERS } from "../configs/urlConfig";
import http from "../services/httpService";
export async function GetOrders() {
  try {
    const response = await http.get(GET_ORDERS);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function GetOrder(id) {
  try {
    const response = await http.get(`${GET_ORDERS}/${id}`);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
