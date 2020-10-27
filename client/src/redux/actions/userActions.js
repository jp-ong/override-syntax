import axios from "axios";
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

const setLoading = () => {
  return { type: USER_LOADING };
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

export const clearUser = () => (dispatch) => {
  sessionStorage.removeItem("token");
  dispatch({ type: CLEAR_USER });
};

export const authUser = () => (dispatch) => {
  dispatch(setLoading());

  const token = sessionStorage.getItem("token");
  axios
    .get("/api/users/user", {
      headers: {
        "x-auth-token": token,
      },
    })
    .then((response) => {
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          token: token,
          user: response.data.user,
          message: response.data.msg,
          status: response.data.status,
        },
      });
      dispatch({ type: CLEAR_ERROR });
    })
    .catch(({ response }) => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          error: response.data.msg,
          status: response.data.status,
        },
      });
      dispatch({ type: CLEAR_USER });
    });
};

export const loginUser = (credentials) => (dispatch) => {
  dispatch(setLoading());

  const postBody = {
    email: credentials.email,
    password: credentials.password,
  };
  axios
    .post("/api/users/login", postBody)
    .then((response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token: response.data.token },
      });
      sessionStorage.setItem("token", response.data.token);
      window.location.replace("/");
    })
    .catch(({ response }) => {
      dispatch({
        type: LOGIN_ERROR,
        payload: { error: response.data.msg, status: response.data.status },
      });
      sessionStorage.removeItem("token");
    });
};

export const registerUser = (credentials) => (dispatch) => {
  dispatch(setLoading());

  const postBody = {
    fullname: {
      firstname: credentials.firstname,
      lastname: credentials.lastname,
    },
    email: credentials.email,
    password: credentials.password,
    password2: credentials.password2,
  };
  axios
    .post("/api/users/register", postBody)
    .then((response) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { token: response.data.token },
      });
      sessionStorage.setItem("token", response.data.token);
      window.location.replace("/");
    })
    .catch(({ response }) => {
      dispatch({
        type: REGISTER_ERROR,
        payload: { error: response.data.msg, status: response.data.status },
      });
      sessionStorage.removeItem("token");
    });
};

export const editProfile = (profile) => (dispatch) => {
  dispatch(setLoading());

  axios
    .patch("/api/users/profile", profile)
    .then((response) => console.log(response.data))
    .catch(({ response }) => console.log(response.data));
};
