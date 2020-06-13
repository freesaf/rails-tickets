import {
  SELECT_TRAIN,
  SUBMIT_PASSENGER_INFO,
  ADD_EXTRA,
  PROCED_TO_PAYMENTS,
  SELECT_DIRECT_TRIP,
} from "../actions/types";

const INITIAL_STATE = {
  selectedTrain: null,
  passengerInfos: null,
  otherServices: null,
  payments: null,
  directTrip: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_TRAIN:
      return { ...state, selectedTrain: action.payload };
    case SUBMIT_PASSENGER_INFO:
      return { ...state, passengerInfos: action.payload };
    case ADD_EXTRA:
      return { ...state, otherServices: action.payload };
    case PROCED_TO_PAYMENTS:
      return { ...state, payments: action.payload };
    case SELECT_DIRECT_TRIP:
      return { ...state, directTrip: action.payload };
    default:
      return state;
  }
};
