import {
  SELECT_DESTINATION,
  SELECT_ORIGIN,
  FETCH_STATIONS,
} from "../actions/types";

const INITIAL_STATE = {
  originCity: null,
  destinationCity: null,
  cities: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_ORIGIN:
      return { ...state, originCity: action.payload };
    case SELECT_DESTINATION:
      return { ...state, destinationCity: action.payload };
    case FETCH_STATIONS:
      return { ...state, cities: action.payload };

    default:
      return state;
  }
};
