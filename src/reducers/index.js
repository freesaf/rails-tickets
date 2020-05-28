import { combineReducers } from "redux";
import stationsReducer from "./stationsReducer";
import dateReducer from "./dateReducer";
import ticketReducer from "./ticketReducer";
import passengersReducer from "./passengersReducer";
import styleReducer from "./styleReducer";

export default combineReducers({
  stations: stationsReducer,
  time: dateReducer,
  tickets: ticketReducer,
  passengers: passengersReducer,
  styleSetting: styleReducer,
});
