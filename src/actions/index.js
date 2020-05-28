import {
  SELECT_ADULT,
  SELECT_CHILD,
  SELECT_TICKET_TYPE,
  SELECT_ONE_WAY,
  NIGHT,
  MORNING,
  AFTER_NOON,
  EVENING,
  SELECT_DEPARATURE_DATE,
  SELECT_RETURN_DATE,
  SELECT_TIME_OF_DAY,
  SELECT_DATE,
  SELECT_CLASS,
  GET_FORMATTED_DATE,
} from "./types";

export const setTicketType = (ticketType) => {
  return {
    type: SELECT_TICKET_TYPE,
    payload: ticketType,
  };
};

export const setDeparatureDate = (date) => {
  return {
    type: SELECT_DEPARATURE_DATE,
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
      return "Monday";
    case 1:
      return "Tuesday";
    case 2:
      return "Wednesday";
    case 3:
      return "Thursday";
    case 4:
      return "Friday";
    case 5:
      return "Saturday";
    case 6:
      return "Sunday";
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
