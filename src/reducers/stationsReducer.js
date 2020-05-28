import {
  SELECT_DESTINATION_STATION,
  SELECT_ORIGIN_STATION,
} from "../actions/types";

const INITIAL_STATE = {
  origin: null,
  destination: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_ORIGIN_STATION:
      return { ...state, origin: action.payload };
    case SELECT_DESTINATION_STATION:
      return { ...state, origin: action.payload };

    default:
      return state;
  }
};
