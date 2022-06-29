import { LOGIN_SUCCESS, USER_DATA, LOGOUT } from "../types/userTypes";

const userInfo = {
  id: null,
  role: "",
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  createdAt: null,
  exp: null,
  loggedIn: false,
  token: "",
};

export function userLogin(userInofoState = userInfo, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return (userInofoState = action.payload);
      break;

    case USER_DATA:
      return userInofoState;
      break;

    case LOGOUT:
      return (userInofoState = userInfo);
      break;

    default:
      return userInofoState;
      break;
  }
}
