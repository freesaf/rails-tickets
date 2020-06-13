import { combineReducers } from "redux";
import stationsReducer from "./stationsReducer";
import dateReducer from "./dateReducer";
import ticketReducer from "./ticketReducer";
import passengersReducer from "./passengersReducer";
import styleReducer from "./styleReducer";
import reservationReducer from "./reservationReducer";

export default combineReducers({
  stations: stationsReducer,
  time: dateReducer,
  tickets: ticketReducer,
  passengers: passengersReducer,
  styleSetting: styleReducer,
  reservation: reservationReducer,
});
