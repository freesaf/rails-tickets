import {
  SELECT_TICKET_TYPE,
  ROUND_TRIP,
  FIRST_CLASS,
  SELECT_CLASS,
} from "../actions/types";

const INITIAL_STATE = {
  ticketType: ROUND_TRIP,
  ticketClass: FIRST_CLASS,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_TICKET_TYPE:
      return { ...state, ticketType: action.payload };
    case SELECT_CLASS:
      return { ...state, ticketClass: action.payload };

    default:
      return state;
  }
};
