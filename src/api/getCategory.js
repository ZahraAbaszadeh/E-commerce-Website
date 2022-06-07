import { GET_CATEGORIES } from "configs/urlConfig";
import http from "services/httpService";

export async function GetCategories() {
  try {
    const response = await http.get(GET_CATEGORIES);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function GetCategory(id) {
  try {
    const response = await http.get(`${GET_CATEGORIES}/${id}`);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}
