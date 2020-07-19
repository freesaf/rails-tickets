import { SELECT_TICKET_TYPE, SELECT_CLASS } from "../actions/types";

const INITIAL_STATE = {
  roundtrip: false,
  ticketClass: 1,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_TICKET_TYPE:
      return { ...state, roundtrip: action.payload };
    case SELECT_CLASS:
      return { ...state, ticketClass: action.payload };

    default:
      return state;
  }
};
