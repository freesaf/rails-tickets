import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";

import { useDispatch, useSelector } from "react-redux";
import {
  setDepartureDate,
  setReturnDate,
  selectDate,
  selectTimeofTheDay,
  getDatewithNames,
} from "../actions";
import {
  NIGHT,
  MORNING,
  AFTER_NOON,
  EVENING,
} from "../actions/types";

export default function DatePicker({
  closeDatePicker,
  openPassengerSelection,
  openAlert,
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const styleSetting = state.styleSetting;
  const roundtrip = state.tickets.roundtrip;
  const departureDate = state.time.departureDate;
  const returnDate = state.time.returnDate;
  const selectedDate = state.time.selectedDate;
  const timeOftheday = state.time.timeOftheday;
  const [alertColor, setalertColor] = useState("");

  useEffect(() => {
    if (departureDate && roundtrip) {
      if (returnDate) {
        setdateselectionTitle("Date selection is completed");
        setalertColor("");
      } else {
        setdateselectionTitle("Choose your return date");
      }
    } else if (departureDate && !roundtrip) {
      setdateselectionTitle("Date selection is completed");
      setalertColor("");
    }
  }, [roundtrip, departureDate, returnDate]);
  const [dateselectionTitle, setdateselectionTitle] = useState(
    "Choose your departure date"
  );

  const chooseDate = (date) => {
    dispatch(selectDate(date));
  };

  const choosetime = (e) => {
    dispatch(selectTimeofTheDay(e.target.value));
  };

  const addMonths = (date, months) => {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() !== d) {
      date.setDate(0);
    }
    return date;
  };

  const dayClicked = (date) => {
    if (
      selectedDate &&
      dateselectionTitle === "Date selection is completed"
    ) {
      if (roundtrip) {
        const selectedDeparture = getDatewithNames(departureDate);
        const selectedReturn = getDatewithNames(returnDate);
        openAlert(
          {
            title: "Confirmation",
            body: (
              <div className="px-4">
                <span>Departure date:</span>
                <p>{`${selectedDeparture.dayName} ${selectedDeparture.currentDate} ${selectedDeparture.monthName} ${selectedDeparture.year}`}</p>
                <span>Return Date:</span>
                <p>{`${selectedReturn.dayName} ${selectedReturn.currentDate} ${selectedReturn.monthName} ${selectedReturn.year}`}</p>
                <span>
                  Would you like to complete your reservation or
                  choose other dates ?
                </span>
              </div>
            ),
            option1text: "Complete my reservation",
            option2text: "Choose other dates",
          },
          "passengers",
          "date"
        );
      } else {
        const selectedDeparture = getDatewithNames(departureDate);
        openAlert(
          {
            title: "Confirmation",
            body: (
              <div className="px-4">
                <span>Departure date:</span>
                <p>{`${selectedDeparture.dayName} ${selectedDeparture.currentDate} ${selectedDeparture.monthName} ${selectedDeparture.year}`}</p>
                <span>
                  Would you like to complete your reservation or
                  choose another date ?
                </span>
              </div>
            ),
            option1text: "Complete my reservation",
            option2text: "Choose another date",
          },
          "passengers",
          "date"
        );
      }
    } else {
      // if there is no departure date choose one
      if (!departureDate) {
        dispatch(setDepartureDate(date));
      }
      // if the departure date exist but there's no return date (if the user want a roundtrip ticket)
      else if (!returnDate && roundtrip) {
        // switch the dates if the returnDate is less than the departureDate
        if (departureDate > date) {
          dispatch(setReturnDate(departureDate));
          dispatch(setDepartureDate(date));
        } else {
          dispatch(setReturnDate(date));
        }
      } else {
        dispatch(setDepartureDate(date));
      }
    }
  };

  return (
    <div className="popup-wrapper w-full">
      <div
        className={`bg-${styleSetting.primary_Light} font-bold text-2xl flex w-full h-12 ${alertColor}`}>
        <div className="flex items-center w-full ">
          <ion-icon
            onClick={closeDatePicker}
            class="cursor-pointer"
            name="chevron-back"></ion-icon>
          <div className="flex justify-center w-full">
            <h3 className={`font-medium text-lg`}>
              {dateselectionTitle}
            </h3>
          </div>
        </div>
      </div>

      <Calendar
        maxDate={addMonths(new Date(), 3)}
        minDate={new Date()}
        className="px-2"
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        nextLabel={<ion-icon name="chevron-forward"></ion-icon>}
        prevLabel={<ion-icon name="chevron-back"></ion-icon>}
        selectRange={roundtrip ? true : false}
        onChange={chooseDate}
        onClickDay={dayClicked}
        //Add text inside selected dates

        tileContent={({ date }) => {
          if (departureDate) {
            if (
              date.toDateString() === departureDate.toDateString()
            ) {
              return "Depart";
            }
          }
          if (returnDate) {
            if (date.toDateString() === returnDate.toDateString()) {
              return "Return";
            }
          }
        }}
        // center the the text inside the selected dates

        tileClassName={({ date }) => {
          if (departureDate) {
            if (
              date.toDateString() === departureDate.toDateString()
            ) {
              return "flex flex-col justify-center items-center text-xs react-calendar__tile--rangeStart";
            }
          }
          if (returnDate) {
            if (date.toDateString() === returnDate.toDateString()) {
              return "flex flex-col justify-center items-center text-xs react-calendar__tile--rangeEnd";
            }
          }
        }}
      />
      <div className="p-2">
        <div className="flex justify-center w-full">
          <h3 className={`font-medium text-lg`}>Time preference</h3>
        </div>
        <div className="timeoftheday flex justify-between w-full text-sm ">
          <label
            className="flex items-center pl-1 w-1/4 cursor-pointer "
            htmlFor="night">
            <input
              className="mr-2"
              onChange={choosetime}
              name="Nighttime"
              id="night"
              type="radio"
              value={NIGHT}
              checked={NIGHT === timeOftheday}
            />
            <span className="flex flex-col">
              <span className="font-medium">Night</span>
              <span
                className={`text-sm text-${styleSetting.primary_Light}`}>
                00h-06h
              </span>
            </span>
          </label>
          <label
            className="flex items-center pl-1 w-1/4 cursor-pointer "
            htmlFor="morning">
            <input
              className="mr-2"
              onChange={choosetime}
              name="MorningTime"
              id="morning"
              type="radio"
              value={MORNING}
              checked={MORNING === timeOftheday}
            />
            <span className="flex flex-col">
              <span className="font-medium">Morning</span>
              <span
                className={`text-sm text-${styleSetting.primary_Light}`}>
                06h-12h
              </span>
            </span>
          </label>
          <label
            className="flex items-center pl-1 w-1/4 cursor-pointer "
            htmlFor="after-noon">
            <input
              className="mr-2"
              onChange={choosetime}
              name="AfterNoon"
              id="after-noon"
              type="radio"
              value={AFTER_NOON}
              checked={AFTER_NOON === timeOftheday}
            />
            <span className="flex flex-col">
              <span className="font-medium">Afternoon</span>
              <span
                className={`text-sm text-${styleSetting.primary_Light}`}>
                12h-18h
              </span>
            </span>
          </label>
          <label
            className="flex items-center pl-1 w-1/4 cursor-pointer "
            htmlFor="evening">
            <input
              className="mr-2"
              onChange={choosetime}
              name="EveningTime"
              id="evening"
              type="radio"
              value={EVENING}
              checked={EVENING === timeOftheday}
            />
            <span className="flex flex-col">
              <span className="font-medium">Evening</span>
              <span
                className={`text-sm text-${styleSetting.primary_Light}`}>
                18h-00h
              </span>
            </span>
          </label>
        </div>
      </div>
      <div className="px-2 pb-2">
        <div
          onClick={() => {
            if (
              dateselectionTitle === "Date selection is completed"
            ) {
              closeDatePicker();
              openPassengerSelection();
            } else {
              setdateselectionTitle("Please complete Date selection");
              setalertColor("bg-red-700 text-white");
            }
          }}
          className={`${
            dateselectionTitle === "Date selection is completed"
              ? "cursor-pointer"
              : "cursor-not-allowed"
          } bg-${
            styleSetting.secondary
          } text-white text-xl w-full mt-2 rounded-xl h-16 flex justify-center items-center text-align-center`}>
          {dateselectionTitle === "Date selection is completed"
            ? "Confirm Date"
            : "please complete date selection"}
        </div>
      </div>
    </div>
  );
}
