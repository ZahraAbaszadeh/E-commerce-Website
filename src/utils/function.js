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

export function ShowPrice(price, FA_Number = false) {
  price = price.replace(/\,/g, "");
  const objRegex = new RegExp("(-?[0-9]+)([0-9]{3})");
  while (objRegex.test(price)) {
    price = price.replace(objRegex, "$1,$2");
  }

  if (FA_Number) {
    const persian = {
      0: "۰",
      1: "۱",
      2: "۲",
      3: "۳",
      4: "۴",
      5: "۵",
      6: "۶",
      7: "۷",
      8: "۸",
      9: "۹",
    };
    const string = (price + "").split("");
    const count = string.length;
    let num;
    for (let i = 0; i <= count; i++) {
      num = string[i];
      if (persian[num]) {
        string[i] = persian[num];
      }
    }
    return string.join("");
  } else {
    return price;
  }
}
