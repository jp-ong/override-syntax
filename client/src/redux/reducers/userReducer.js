import {
  USER_LOADING,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  PASSWORD_SUCCESS,
  PASSWORD_ERROR,
  CLEAR_USER,
  CLEAR_ERROR,
} from "../types/userTypes";

const initialState = {
  token: null,
  user_loading: false,
  logged_in: false,
  user: {},
  message: "",
  error: "",
  status: "",
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADING:
      return { ...state, user_loading: true };
    case AUTH_SUCCESS:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: payload.token || null,
        user: payload.user,
        message: payload.msg || "",
        status: payload.status,
        logged_in: true,
        user_loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      return {
        ...state,
        error: payload.error,
        status: payload.status,
        logged_in: false,
        user_loading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: {},
        message: "",
        token: null,
        logged_in: false,
        user_loading: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: "",
        status: "",
        user_loading: false,
      };
    default:
      return { ...state };
  }
};
