import moment from "moment";

import {
  SELECT_ADULT,
  SELECT_CHILD,
  SELECT_TICKET_TYPE,
  SELECT_RETURN_DATE,
  SELECT_DEPARTURE_DATE,
  SELECT_TIME_OF_DAY,
  SELECT_CLASS,
  SELECT_DESTINATION_ID,
  SELECT_ORIGIN_ID,
  RESET_STATE,
} from "../actions/types";

const INITIAL_STATE = {
  origin: null,
  destination: null,
  originDate: null,
  adulte: 1,
  kids: 0,
  comfort: 1,
  roundtrip: false,
  destinationDate: "",
  _csrf: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_ORIGIN_ID:
      return { ...state, origin: action.payload };
    case SELECT_DESTINATION_ID:
      return { ...state, destination: action.payload };
    case SELECT_ADULT:
      return { ...state, adulte: action.payload };
    case SELECT_CHILD:
      return { ...state, kids: action.payload };
    case SELECT_TICKET_TYPE:
      return { ...state, roundtrip: action.payload };
    case SELECT_CLASS:
      return { ...state, comfort: action.payload };
    case SELECT_DEPARTURE_DATE:
      return {
        ...state,
        originDate: moment(action.payload).format(),
      };
    case SELECT_RETURN_DATE:
      if (action.payload === null) {
        return { ...state, destinationDate: "" };
      } else {
        return {
          ...state,
          destinationDate: moment(action.payload).format(),
        };
      }

    case SELECT_TIME_OF_DAY:
      return { ...state, timeOftheday: action.payload };
    case RESET_STATE:
      return INITIAL_STATE;

    default:
      return state;
  }
};
