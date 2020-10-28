import { ITEMS_LOADING, FETCH_ITEMS } from "../types/itemTypes";

const initialState = {
  items_loading: true,
  items: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ITEMS_LOADING:
      return { ...state, items_loading: true };
    case FETCH_ITEMS:
      return {
        ...state,
        items: payload,
        items_loading: false,
      };
    default:
      return { ...state };
  }
};
