import {
  EN,
  EUR,
  SELECT_CURRENCY,
  SELECT_LANGUAGE,
} from "../actions/types";

const INITIAL_STATE = {
  lang: EN,
  currency: EUR,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_CURRENCY:
      return { ...state, currency: action.payload };
    case SELECT_LANGUAGE:
      return { ...state, lang: action.payload };
    default:
      return state;
  }
};
