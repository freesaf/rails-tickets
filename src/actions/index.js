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
  SELECT_TRAIN,
  SUBMIT_PASSENGER_INFO,
  ADD_EXTRA,
  PROCED_TO_PAYMENTS,
  SELECT_DIRECT_TRIP,
} from "./types";

export const setDirectTrip = () => {
  return {
    type: SELECT_DIRECT_TRIP,
    payload: true,
  };
};

export const fetchStations = () => async (dispatch) => {
  await fetch("https://www.oncf.ma/en/api/gares/list/")
    .then((res) => res.json())
    .then((stations) => {
      dispatch({
        type: FETCH_STATIONS,
        payload: stations,
      });
    })
    .catch((err) => {
      console.log(err);
    });
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

export const selectTicketClass = (ticketClass) => {
  return {
    type: SELECT_CLASS,
    payload: ticketClass,
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
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "Mai";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";

    default:
      return null;
  }
};
