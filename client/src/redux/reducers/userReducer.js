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
  ORDER_SUCCESS,
  ORDER_ERROR,
  CLEAR_USER,
  CLEAR_FEEDBACK,
} from "../types/userTypes";

const initialState = {
  token: null,
  user_loading: true,
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
        message: payload.message || "",
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
    case PROFILE_SUCCESS:
    case PASSWORD_SUCCESS:
      return {
        ...state,
        user: payload.user,
        message: payload.message,
        status: payload.status,
        error: "",
        user_loading: false,
      };
    case PROFILE_ERROR:
    case PASSWORD_ERROR:
      return {
        ...state,
        error: payload.error,
        status: payload.status,
        message: "",
        user_loading: false,
      };
    case ORDER_SUCCESS:
      return {
        ...state,
        status: payload.status,
        message: payload.message,
        user_loading: false,
      };
    case ORDER_ERROR:
      return {
        ...state,
        status: payload.status,
        error: payload.error,
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
    case CLEAR_FEEDBACK:
      return {
        ...state,
        error: "",
        message: "",
        status: "",
        user_loading: false,
      };
    default:
      return { ...state };
  }
};
