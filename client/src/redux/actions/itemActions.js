import axios from "axios";
import { ITEMS_LOADING, FETCH_ITEMS } from "../types/itemTypes";

const setLoading = () => {
  return { type: ITEMS_LOADING };
};

export const fetchItems = () => (dispatch) => {
  dispatch(setLoading());

  axios
    .get("/api/items")
    .then((response) => {
      dispatch({ type: FETCH_ITEMS, payload: response.data.items });
    })
    .catch(({ response }) => {
      window.location.reload("/");
    });
};
