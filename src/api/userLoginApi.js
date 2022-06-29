import { LOGIN, REFRESH_TOKEN_URL } from "../configs/urlConfig";
import {
  ACCESS_TOKEN,
  IS_LOGGED_IN,
  REFRESH_TOKEN,
} from "../configs/variablesConfig";
import http from "../services/httpService";
import { parseJwt } from "../utils/function";

export async function Login(data) {
  try {
    const response = await http.post(LOGIN, data);

    localStorage.setItem(ACCESS_TOKEN, response.data.token);
    localStorage.setItem(REFRESH_TOKEN, response.data.token);
    localStorage.setItem(IS_LOGGED_IN, true.toString());

    const allUserData = parseJwt(response.data.token);
    allUserData.loggedIn = true;
    allUserData.token = response.data.token;

    localStorage.setItem("userData", JSON.stringify(allUserData));

    return allUserData;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function refreshToken() {
  try {
    const response = await http.post(REFRESH_TOKEN_URL);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
