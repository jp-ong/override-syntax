import { STATICS_LOADING, FETCH_STATICS } from "../types/staticsTypes";

const statics = require("../../assets/data/statics.json");

const setLoading = () => {
  return { type: STATICS_LOADING };
};

export const fetchStatics = () => (dispatch) => {
  dispatch(setLoading());
  dispatch({ type: FETCH_STATICS, payload: statics });
};
