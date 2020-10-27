import { STATICS_LOADING, FETCH_STATICS } from "../types/staticsTypes";

const initialState = {
  statics_loading: false,
  categories: {},
  tags: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case STATICS_LOADING:
      return { ...state, statics_loading: true };
    case FETCH_STATICS:
      return {
        ...state,
        categories: payload.categories,
        tags: payload.tags,
        statics_loading: false,
      };
    default:
      return { ...state };
  }
};
