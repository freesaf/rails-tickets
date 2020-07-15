import { FETCH_TRAINS } from "../actions/types";

const INITIAL_STATE = {
  trainsTimes: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TRAINS:
      return { ...state, trainsTimes: action.payload };

    default:
      return state;
  }
};
