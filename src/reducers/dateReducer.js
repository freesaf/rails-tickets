import {
  SELECT_DEPARATURE_DATE,
  SELECT_RETURN_DATE,
  SELECT_TIME_OF_DAY,
  GET_FORMATTED_DATE,
  SELECT_DATE,
  NIGHT,
} from "../actions/types";
const INITAIL_STATE = {
  deparatureDate: null,
  returnDate: null,
  selectedDate: null,
  timeOftheday: NIGHT,
  formattedDate: null,
};

export default (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case SELECT_DEPARATURE_DATE:
      return { ...state, deparatureDate: action.payload };
    case SELECT_RETURN_DATE:
      return { ...state, returnDate: action.payload };
    case SELECT_TIME_OF_DAY:
      return { ...state, timeOftheday: action.payload };
    case SELECT_DATE:
      return { ...state, selectedDate: action.payload };
    case GET_FORMATTED_DATE:
      return { ...state, formattedDate: action.payload };

    default:
      return state;
  }
};
