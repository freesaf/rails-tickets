import {
  SELECT_DEPARTURE_DATE,
  SELECT_RETURN_DATE,
  SELECT_TIME_OF_DAY,
  SELECT_TIME_OF_DAY_TITLE,
  SELECT_DATE,
  NIGHT,
} from "../actions/types";
const INITAIL_STATE = {
  departureDate: null,
  returnDate: null,
  selectedDate: null,
  timeOfthedayTitle: null,
  timeOftheday: {},
};

export default (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case SELECT_DEPARTURE_DATE:
      return { ...state, departureDate: action.payload };
    case SELECT_RETURN_DATE:
      return { ...state, returnDate: action.payload };
    case SELECT_TIME_OF_DAY:
      return { ...state, timeOftheday: action.payload };
    case SELECT_TIME_OF_DAY_TITLE:
      return { ...state, timeOfthedayTitle: action.payload };
    case SELECT_DATE:
      return { ...state, selectedDate: action.payload };

    default:
      return state;
  }
};
