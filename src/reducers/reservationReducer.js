import {
  SELECT_DEPARTURE_TRAIN,
  SELECT_RETURN_TRAIN,
  SUBMIT_PASSENGER_INFO,
  ADD_EXTRA,
  PROCED_TO_PAYMENTS,
  SELECT_DIRECT_TRIP,
  SET_CURRENT_RESERVATION_STATE,
  SET_RESERVATION_STEP_STATUS,
  SELECT_RETURN_PRICE,
  SELECT_DEPART_PRICE,
} from "../actions/types";

const INITIAL_STATE = {
  currentReservationState: "train",
  trainSelectionCompleted: true,
  passengerInfosCompleted: false,
  confirmationCompleted: false,
  paymentCompleted: false,
  departureTrain: null,
  returnTrain: null,
  passengerInfos: "",
  otherServices: null,
  payments: null,
  directTrip: null,
  departPrice: null,
  returnPrice: null,
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
    case SELECT_DEPART_PRICE:
      return { ...state, departPrice: action.payload };
    case SELECT_RETURN_PRICE:
      return { ...state, returnPrice: action.payload };
    default:
      return state;
  }
};
