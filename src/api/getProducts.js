import { GET_PRODUCTS } from "configs/urlConfig";
import http from "services/httpService";

export async function GetProducts() {
  try {
    const response = await http.get(GET_PRODUCTS);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
