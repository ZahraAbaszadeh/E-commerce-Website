import { LOGIN_SUCCESS, USER_DATA, LOGOUT } from "../types/userTypes";

export const setUserDataWhenLogin = (userData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
};

export const userLogOut = () => {
  return {
    type: LOGOUT,
  };
};

export const getUserDataWhenLogin = () => {
  return {
    type: USER_DATA,
  };
};
