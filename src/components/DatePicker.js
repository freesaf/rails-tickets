import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeparatureDate,
  setReturnDate,
  selectDate,
  selectTimeofTheDay,
  getDatewithNames,
} from "../actions";
import {
  ROUND_TRIP,
  ONE_WAY,
  NIGHT,
  MORNING,
  AFTER_NOON,
  EVENING,
} from "../actions/types";

export default function DatePicker({
  closeDatePicker,
  openPassengerSelection,
  styleSetting,
  openAlert,
}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const ticketType = state.tickets.ticketType;
  const deparatureDate = state.time.deparatureDate;
  const returnDate = state.time.returnDate;
  const selectedDate = state.time.selectedDate;
  const timeOftheday = state.time.timeOftheday;
  const [alertColor, setalertColor] = useState("");

  useEffect(() => {
    if (deparatureDate && ticketType === ROUND_TRIP) {
      if (returnDate) {
        setdateselectionTitle("Date selection is completed");
        setalertColor("");
      } else {
        setdateselectionTitle("Choose your return date");
      }
    } else if (deparatureDate && ticketType === ONE_WAY) {
      setdateselectionTitle("Date selection is completed");
      setalertColor("");
    }
  }, [ticketType, deparatureDate, returnDate]);
  const [dateselectionTitle, setdateselectionTitle] = useState(
    "Choose your deparature date"
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
      if (ticketType === ROUND_TRIP) {
        const selectedDeparature = getDatewithNames(deparatureDate);
        const selectedReturn = getDatewithNames(returnDate);
        openAlert(
          {
            title: "Confirmation",
            body: (
              <div className="px-4">
                <span>Deparature date:</span>
                <p>{`${selectedDeparature.dayName} ${selectedDeparature.currentDate} ${selectedDeparature.monthName} ${selectedDeparature.year}`}</p>
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
        const selectedDeparature = getDatewithNames(deparatureDate);
        openAlert(
          {
            title: "Confirmation",
            body: (
              <div className="px-4">
                <span>Deparature date:</span>
                <p>{`${selectedDeparature.dayName} ${selectedDeparature.currentDate} ${selectedDeparature.monthName} ${selectedDeparature.year}`}</p>
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
      // if there is no deparature date choose one
      if (!deparatureDate) {
        dispatch(setDeparatureDate(date));
      }
      // if the deparature date exist but there's no return date (if the use want a roundtrip ticket)
      else if (!returnDate && ticketType === ROUND_TRIP) {
        // switch the dates if the returnDate is less than the deparatureDate
        if (deparatureDate > date) {
          dispatch(setReturnDate(deparatureDate));
          dispatch(setDeparatureDate(date));
        } else {
          dispatch(setReturnDate(date));
        }
      } else {
        dispatch(setDeparatureDate(date));
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
            name="chevron-back"></ion-icon>
          <div className="flex justify-center w-full">
            <h3 className={`fw700 font-bold text-lg hidden-sm`}>
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
        selectRange={ticketType === ROUND_TRIP ? true : false}
        onChange={chooseDate}
        onClickDay={dayClicked}
        //Add text inside selected dates

        tileContent={({ date }) => {
          if (deparatureDate) {
            if (
              date.toDateString() === deparatureDate.toDateString()
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
          if (deparatureDate) {
            if (
              date.toDateString() === deparatureDate.toDateString()
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
          <h3 className={`fw700 font-bold text-lg hidden-sm`}>
            Time preference
          </h3>
        </div>
        <div className="timeoftheday flex justify-between w-full text-sm ">
          <label className="pl-1 w-1/4" htmlFor="night">
            <span className="flex justify-evenly items-center font-extrabold ">
              <span>Night</span>
              <input
                onChange={choosetime}
                name="Nighttime"
                id="night"
                type="radio"
                value={NIGHT}
                checked={NIGHT === timeOftheday}
              />
            </span>
            <span
              className={`w-full fw700 pr-1 cursor-pointer font-semibold text-xs text-${styleSetting.primary_Light}`}>
              00h00-06h00
            </span>
          </label>
          <label className="pl-1 w-1/4" htmlFor="morning">
            <span className="flex justify-evenly items-center font-extrabold ">
              <span>Morning</span>
              <input
                onChange={choosetime}
                name="MorningTime"
                id="morning"
                type="radio"
                value={MORNING}
                checked={MORNING === timeOftheday}
              />
            </span>

            <span
              className={`w-full fw700 pr-1 cursor-pointer font-semibold text-xs text-${styleSetting.primary_Light}`}>
              06h00-12h00
            </span>
          </label>
          <label className="pl-1 w-1/4" htmlFor="after-noon">
            <span className="flex justify-evenly items-center font-extrabold ">
              <span>After-noon</span>
              <input
                onChange={choosetime}
                name="AfterNoon"
                id="after-noon"
                type="radio"
                value={AFTER_NOON}
                checked={AFTER_NOON === timeOftheday}
              />
            </span>

            <span
              className={`w-full fw700 pr-1 cursor-pointer font-semibold text-xs text-${styleSetting.primary_Light}`}>
              12h00-18h00
            </span>
          </label>
          <label className="pl-1 w-1/4" htmlFor="evening">
            <span className="flex justify-evenly items-center font-extrabold ">
              <span>Evening</span>
              <input
                onChange={choosetime}
                name="EveningTime"
                id="evening"
                type="radio"
                value={EVENING}
                checked={EVENING === timeOftheday}
              />
            </span>

            <span
              className={`w-full fw700 pr-1 cursor-pointer font-semibold text-xs text-${styleSetting.primary_Light}`}>
              18h00-00h00
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
          } text-white text-xl w-full mt-2 rounded-xl h-16 flex justify-center items-center text-align-center fw700`}>
          {dateselectionTitle === "Date selection is completed"
            ? "Confirm Date"
            : "please complete date selection"}
        </div>
      </div>
    </div>
  );
}
