import {
  ACCESS_TOKEN,
  IS_LOGGED_IN,
  REFRESH_TOKEN,
} from "configs/variablesConfig";
import Navigate from "universal-navigate";

export const parseJwt = (token) => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export const CheckUserExpired = (pageStatus) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) return;
  const { exp } = parseJwt(token);
  if (exp * 1000 < Date.now()) {
    localStorage.removeItem("userData");
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(IS_LOGGED_IN);

    if (pageStatus != "public") {
      Navigate.push({
        url: "/login?expired=true",
        animated: true,
      });
    }
  }
};
