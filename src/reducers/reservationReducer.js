import {
  SELECT_DEPARTURE_TRAIN,
  SELECT_RETURN_TRAIN,
  SUBMIT_PASSENGER_INFO,
  ADD_EXTRA,
  PROCED_TO_PAYMENTS,
  SELECT_DIRECT_TRIP,
  SET_CURRENT_RESERVATION_STATE,
  SET_RESERVATION_STEP_STATUS,
} from "../actions/types";

const INITIAL_STATE = {
  currentReservationState: "train",
  trainSelectionCompleted: true,
  passengerInfosCompleted: true,
  confirmationCompleted: false,
  paymentCompleted: false,
  departureTrain: null,
  returnTrain: null,
  passengerInfos: null,
  otherServices: null,
  payments: null,
  directTrip: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_RESERVATION_STATE:
      return { ...state, currentReservationState: action.payload };
    case SET_RESERVATION_STEP_STATUS:
      return {
        ...state,
        [action.payload.stepName]: action.payload.status,
      };
    case SELECT_DEPARTURE_TRAIN:
      return { ...state, departureTrain: action.payload };
    case SELECT_RETURN_TRAIN:
      return { ...state, returnTrain: action.payload };
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
