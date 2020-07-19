import { combineReducers } from "redux";
import stationsReducer from "./stationsReducer";
import dateReducer from "./dateReducer";
import passengersReducer from "./passengersReducer";
import styleReducer from "./styleReducer";
import reservationReducer from "./reservationReducer";
import locationReducer from "./locationReducer";
import trainsReducer from "./trainReducer";
import loaderReducer from "./loaderReducer";
import ticketsReducer from "./ticketsReducer";
import requestReducer from "./requestReducer";

export default combineReducers({
  stations: stationsReducer,
  time: dateReducer,
  passengers: passengersReducer,
  styleSetting: styleReducer,
  tickets: ticketsReducer,
  reservation: reservationReducer,
  localisation: locationReducer,
  trainSearch: trainsReducer,
  loader: loaderReducer,
  reservationData: requestReducer,
});
