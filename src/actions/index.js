import {
  SELECT_ADULT,
  SELECT_CHILD,
  SELECT_TICKET_TYPE,
  SELECT_DEPARTURE_DATE,
  SELECT_RETURN_DATE,
  SELECT_TIME_OF_DAY,
  SELECT_DATE,
  SELECT_CLASS,
  FETCH_STATIONS,
  SELECT_DIRECT_TRIP,
  SELECT_DESTINATION,
  SELECT_ORIGIN,
  SELECT_CURRENCY,
  SELECT_LANGUAGE,
  SELECT_DEPARTURE_TRAIN,
  SELECT_RETURN_TRAIN,
  SET_CURRENT_RESERVATION_STATE,
  SET_RESERVATION_STEP_STATUS,
  FETCH_TRAINS,
  SET_LOADER,
} from "./types";
import axios from "axios";

export const setReservationStepStatus = (stepStatus) => {
  return {
    type: SET_RESERVATION_STEP_STATUS,
    payload: stepStatus,
  };
};

export const setCurrentReservationState = (currentState) => {
  return {
    type: SET_CURRENT_RESERVATION_STATE,
    payload: currentState,
  };
};

export const selectDepartureTrain = (train) => {
  return {
    type: SELECT_DEPARTURE_TRAIN,
    payload: train,
  };
};

export const selectReturnTrain = (train) => {
  return {
    type: SELECT_RETURN_TRAIN,
    payload: train,
  };
};

export const setOriginCity = (city) => {
  return {
    type: SELECT_ORIGIN,
    payload: city,
  };
};

export const setDestinationCity = (city) => {
  return {
    type: SELECT_DESTINATION,
    payload: city,
  };
};

export const selectCurrency = (currency) => {
  return {
    type: SELECT_CURRENCY,
    payload: currency,
  };
};

export const selectLanguage = (lang) => {
  return {
    type: SELECT_LANGUAGE,
    payload: lang,
  };
};

export const getConvertedPrice = (currency, price) => {
  const usdRate = 0.103824;
  const euroRate = 0.0917046;
  switch (currency) {
    case "USD":
      return parseFloat(price * usdRate).toFixed(2);
    case "EUR":
      return parseFloat(price * euroRate).toFixed(2);
    default:
      return parseFloat(price).toFixed(2);
  }
};
export const getTrainTime = (date) => {
  let hours = new Date(date).getHours();
  let minutes = new Date(date).getMinutes();
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes}`;
};

export const setDirectTrip = () => {
  return {
    type: SELECT_DIRECT_TRIP,
    payload: true,
  };
};

export const fetchStations = () => async (dispatch) => {
  await axios
    .get("api/stations")
    .then((response) => {
      dispatch({
        type: FETCH_STATIONS,
        payload: response.data.cities,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const setLoader = (loader) => {
  return {
    type: SET_LOADER,
    payload: loader,
  };
};

export const fetchTrains = (data) => async (dispatch) => {
  dispatch(setLoader(true));
  await axios
    .post("api/times", data)
    .then((response) => {
      dispatch({
        type: FETCH_TRAINS,
        payload: response.data,
      });
      dispatch(setLoader(false));
    })
    .catch((err) => console.log(err));
};

export const setTicketType = (ticketType) => {
  return {
    type: SELECT_TICKET_TYPE,
    payload: ticketType,
  };
};

export const setDepartureDate = (date) => {
  return {
    type: SELECT_DEPARTURE_DATE,
    payload: date,
  };
};
export const setReturnDate = (date) => {
  return {
    type: SELECT_RETURN_DATE,
    payload: date,
  };
};

export const selectDate = (date) => {
  return {
    type: SELECT_DATE,
    payload: date,
  };
};

export const selectTicketClass = (ticketC) => {
  return {
    type: SELECT_CLASS,
    payload: ticketC,
  };
};

export const selectTimeofTheDay = (time) => {
  return {
    type: SELECT_TIME_OF_DAY,
    payload: time,
  };
};

export const selectAdultsPassengerNumber = (num) => {
  return {
    type: SELECT_ADULT,
    payload: num,
  };
};

export const selectChildrenPassengerNumber = (num) => {
  return {
    type: SELECT_CHILD,
    payload: num,
  };
};

//Function to capitalize first letter of a string
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

//Function to get passenger count
export const getPassengersCount = (passengers) => {
  let adultsCount = 0;
  let childrenCount = 0;
  let adultsText;
  for (let i = 0; i < passengers.length; i++) {
    if (passengers[i].demographicProfile.id === 1) {
      childrenCount++;
    } else if (passengers[i].demographicProfile.id === 3) {
      adultsCount++;
    }
  }
  if (adultsCount >= 2) {
    adultsText = "adults";
  } else {
    adultsText = "adult";
  }
  return {
    adultsCount,
    childrenCount,
    adultsText,
  };
};
export const getDatewithNames = (date) => {
  const formattedDate = {
    dayName: getDaysName(date),
    monthName: getMonthName(date),
    year: date.getFullYear(),
    currentDate: date.getDate(),
  };
  return formattedDate;
};
//Functions to get formatted date with names
//---------------------------------------------------------------//
//---------------------------------------------------------------//

const getDaysName = (date) => {
  switch (date.getDay()) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return null;
  }
};

const getMonthName = (date) => {
  switch (date.getMonth()) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";

    default:
      return null;
  }
};

export const getLayoverTime = (
  tripDuration,
  firstRangeDuration,
  secondRangeDuration
) => {
  function convertToNumber(stringNumber) {
    let num = stringNumber.split(":");
    return parseInt(num[0]) * 60 + parseInt(num[1]);
  }
  let layover =
    convertToNumber(tripDuration) -
    convertToNumber(firstRangeDuration) -
    convertToNumber(secondRangeDuration);
  if (layover >= 60) {
    let h = parseInt(layover / 60);
    let min = Math.ceil((layover / 60 - h) * 60);
    return `${h}h: ${min}m`;
  } else {
    return `${layover}m`;
  }
};
