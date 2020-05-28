import React, { useState, useRef } from "react";
import Modal from "./Modal";
import DatePicker from "./DatePicker";
import PassengersSelection from "./PassengersSelection";
import { useSelector, useDispatch } from "react-redux";
import {
  setDeparatureDate,
  setReturnDate,
  selectDate,
} from "../actions";
import {
  ONE_WAY,
  ROUND_TRIP,
  FIRST_CLASS,
  STANDARD_CLASS,
} from "../actions/types";
import TwoOptionAlert from "./TwoOptionAlert";

export default function SeartchForm({ styleSetting }) {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  const ticketType = state.tickets.ticketType;
  const [fromValue, setfromValue] = useState("");
  const [toValue, settoValue] = useState("");
  const deparatureDate = state.time.deparatureDate;
  const returnDate = state.time.returnDate;
  const ticketClass = state.tickets.ticketClass;
  const numberOfAdults = state.passengers.adults;
  const numberOfChildren = state.passengers.children;
  const totalPassengers = numberOfAdults + numberOfChildren;
  const timeOftheday = state.time.timeOftheday;
  const passengers = {
    adults: state.passengers.adults,
    children: state.passengers.children,
  };

  const reservationInfo = {
    from: fromValue,
    to: toValue,
    depart: deparatureDate,
    return: returnDate,
    ticketType: ticketType,
    timeOftheday: timeOftheday,
    ticketClass: ticketClass,
    passengers: passengers,
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (ticketType === ROUND_TRIP && returnDate === null) {
      alertMessage("Please select your return Date", "date");
    } else {
      console.log(reservationInfo);
    }
  };

  const modalRef = useRef();

  const swapEntries = () => {
    setfromValue(toValue);
    settoValue(fromValue);
  };

  const closeModal = () => {
    modalRef.current.close();
  };
  const selectPassengers = () => {
    openModal("passengers");
  };

  const alertMessage = (message, continueReservation, resetDates) => {
    modalRef.current.open(
      <TwoOptionAlert
        message={message}
        //close the modal alert
        closePopup={closeModal}
        onClickOptions={{
          //Accept
          option1Click: () => {
            openModal(continueReservation);
          },
          //Decline
          option2Click: () => {
            // reset the dates if the user want to choose another date
            dispatch(setDeparatureDate(null));
            dispatch(setReturnDate(null));
            dispatch(selectDate(null));
            openModal(resetDates);
          },
        }}
      />
    );
  };

  const openModal = (content) => {
    if (content === "date") {
      modalRef.current.open(
        <DatePicker
          styleSetting={styleSetting}
          openAlert={alertMessage}
          closeDatePicker={closeModal}
          openPassengerSelection={selectPassengers}
        />
      );
    } else if (content === "passengers") {
      modalRef.current.open(
        <PassengersSelection
          styleSetting={styleSetting}
          openAlert={alertMessage}
          closePassengerSelection={closeModal}
          search={submitSearch}
        />
      );
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

  const showDates = (dateType, date) => {
    return (
      <span className="flex flex-col justify-center items-center h-16 leading-4 text-sm m-0">
        <span className="pt-1 text-white font-semibold">
          {dateType}
        </span>
        <span className="text-gray-300">{getDaysName(date)}</span>
        <span className="text-base font-semibold text-white">
          {date.getDate()}
        </span>
        <span className="pb-1  text-gray-300">
          {getMonthName(date)}
        </span>
      </span>
    );
  };

  const updateCalendarBtn = () => {
    if (deparatureDate) {
      if (ticketType === ONE_WAY) {
        return showDates("Deparature", deparatureDate);
      } else if (ticketType === ROUND_TRIP) {
        if (returnDate) {
          return (
            <span className="flex justify-around items-center w-full">
              <span>{showDates("Deparature", deparatureDate)} </span>
              <span className="text-xl text-white">... </span>
              <span>{showDates("Return", returnDate)} </span>
            </span>
          );
        } else {
          return (
            <span className="flex justify-around items-center w-full">
              <span>{showDates("Deparature", deparatureDate)} </span>
              <span className="text-xl text-white">... </span>
              <span className="flex flex-col justify-center items-center">
                <span className="text-sm font-semibold text-white">
                  Return
                </span>
                <ion-icon
                  class="text-gray-300 text-4xl"
                  name="calendar-sharp"></ion-icon>
              </span>
            </span>
          );
        }
      }
    } else {
      return (
        <span className="flex justify-center items-center">
          <ion-icon
            class="text-gray-300 text-4xl"
            name="calendar-sharp"></ion-icon>
        </span>
      );
    }
  };

  const updateTicketClassBtn = (ticketClass) => {
    switch (ticketClass) {
      case FIRST_CLASS:
        return (
          <span className="flex flex-col">
            <span className="text-white text-base font-semibold">
              FIRST
            </span>
            <span>Class</span>
          </span>
        );
      case STANDARD_CLASS:
        return (
          <span className="flex flex-col">
            <span className="text-white text-base font-semibold">
              STANDARD
            </span>
            <span>Class</span>
          </span>
        );
      default:
        return (
          <span className="text-white text-base font-semibold">
            Single Bed
          </span>
        );
    }
  };

  return (
    <form onSubmit={submitSearch} className="px-4">
      <div
        className="flex w-full h-16 border border-gray-300 rounded"
        style={{
          boxShadow: "inset 0px 3px 3px rgb(0,0,0,0.3)",
        }}>
        <div className="px-4 pt-5">
          <ion-icon class="text-2xl" name="train-outline"></ion-icon>
        </div>

        <div className="relative">
          <input
            onChange={(e) => {
              setfromValue(e.target.value);
            }}
            value={fromValue}
            id="fromId"
            className="lift w-full h-full bg-transparent focus:outline-none fw700 text-2xl font-black"
            type="text"
            name="from"
            required
          />
          <label
            htmlFor="fromId"
            className="pointer-events-none absolute w-full h-full bottom-0 left-0">
            <span
              style={{ transition: "all 0.3s ease", bottom: "11px" }}
              className={`absolute left-0  text-xl font-black fw700 text-${styleSetting.primary_Light}`}>
              From
            </span>
          </label>
        </div>
      </div>

      {/* Switch */}
      <div className="flex justify-center items-center -my-2">
        <div
          onClick={() => {
            swapEntries();
          }}
          className={`relative h-8 w-6 bg-${styleSetting.primary} rounded-full z-10  cursor-pointer`}>
          <ion-icon
            class="transform text-2xl font-bold text-white m-0 absolute"
            style={{ bottom: "4px" }}
            name="swap-vertical"></ion-icon>
        </div>
      </div>

      {/* TO */}
      <div
        className="flex w-full h-16 border border-gray-300 rounded"
        style={{
          boxShadow: "inset 0px 3px 3px rgb(0,0,0,0.3)",
        }}>
        <div className="px-4 pt-5">
          <ion-icon class="text-2xl" name="train-sharp"></ion-icon>
        </div>
        <div className="relative">
          <input
            onChange={(e) => {
              settoValue(e.target.value);
            }}
            value={toValue}
            id="toId"
            className="lift w-full h-full bg-transparent focus:outline-none fw700 text-2xl font-black"
            type="text"
            name="To"
            required
          />
          <label
            htmlFor="toId"
            className="pointer-events-none absolute w-full h-full bottom-0 left-0">
            <span
              style={{ transition: "all 0.3s ease", bottom: "11px" }}
              className={`absolute left-0 text-xl font-black fw700 text-${styleSetting.primary_Light}`}>
              To
            </span>
          </label>
        </div>
      </div>
      <div className="flex bg-white mt-4 w-full">
        <div
          onClick={() => {
            openModal("date");
          }}
          className={`bg-${styleSetting.primary} w-1/2 h-16 flex justify-center items-center cursor-pointer mr-1 `}>
          {updateCalendarBtn()}
        </div>
        <div
          onClick={() => {
            openModal("passengers");
          }}
          className={`relative bg-${styleSetting.primary} w-1/2 h-16 flex justify-center items-center cursor-pointer ml-1`}>
          <span className="flex justify-around w-full items-center">
            <span className="flex flex-col text-sm leading-5 ">
              <span className="text-gray-400">Ticket Class</span>
              <span className="text-gray-400">
                {updateTicketClassBtn(ticketClass)}{" "}
              </span>
            </span>
            <span className="pr-4">
              {[...Array(totalPassengers)].map((passenger, i) => {
                if (i === 3) {
                  return (
                    <span
                      key={i}
                      className="font-black fw700 text-base text-gray-400">
                      +
                    </span>
                  );
                } else if (i < 3) {
                  return (
                    <ion-icon
                      key={i}
                      class={`${
                        i === 2 ? "text-gray-400 " : "text-gray-300"
                      } text-2xl -m-2`}
                      name="man-sharp"></ion-icon>
                  );
                } else {
                  return null;
                }
              })}
              <span className="absolute top-0 right-0 text-base font-black text-white w-5">
                {totalPassengers}
              </span>
            </span>
          </span>
        </div>
        <Modal ref={modalRef} />
      </div>
      <input
        className={`bg-${styleSetting.secondary} text-white text-4xl w-full h-16 my-4`}
        type="submit"
        value="Search"
      />
    </form>
  );
}
