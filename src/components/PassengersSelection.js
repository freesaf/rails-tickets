import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTicketClass,
  selectAdultsPassengerNumber,
  selectChildrenPassengerNumber,
} from "../actions";
import {
  FIRST_CLASS,
  STANDARD_CLASS,
  SINGLE_BED,
} from "../actions/types";

export default function PassengersSelection({
  closePassengerSelection,
  styleSetting,
  search,
  openAlert,
}) {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  const ticketClass = state.tickets.ticketClass;
  const numberOfAdults = state.passengers.adults;
  const numberOfChildren = state.passengers.children;
  const totalPassengers = numberOfAdults + numberOfChildren;
  const selectedDate = state.time.selectedDate;
  const [errorMsg, seterrorMsg] = useState("");

  const chooseClass = (e) => {
    dispatch(selectTicketClass(e.target.value));
  };

  const selectAdultPassengers = (e) => {
    if (e.target.id === "addAdult") {
      if (totalPassengers >= 6) {
        //show error
        seterrorMsg(
          "The maximum number of passengers,that can be selected is 6 "
        );
      } else {
        dispatch(selectAdultsPassengerNumber(numberOfAdults + 1));
        seterrorMsg("");
      }
    } else if (e.target.id === "subAdult") {
      if (numberOfAdults === 1) {
        return;
      } else {
        if (totalPassengers < 2) {
          //show error
          seterrorMsg(
            "The maximum number of passengers,that can be selected is 6 "
          );
        } else {
          dispatch(selectAdultsPassengerNumber(numberOfAdults - 1));
          seterrorMsg("");
        }
      }
    }
  };
  const selectChildrenPassengers = (e) => {
    if (e.target.id === "addChild") {
      if (totalPassengers >= 6) {
        //show error
        seterrorMsg(
          "The maximum number of passengers,that can be selected is 6 "
        );
      } else {
        dispatch(selectChildrenPassengerNumber(numberOfChildren + 1));
        seterrorMsg("");
      }
    } else if (e.target.id === "subChild") {
      if (numberOfChildren === 0) {
        return;
      } else {
        if (totalPassengers < 1) {
          //show error
          seterrorMsg(
            "The maximum number of passengers,that can be selected is 6 "
          );
        } else {
          dispatch(
            selectChildrenPassengerNumber(numberOfChildren - 1)
          );
          seterrorMsg("");
        }
      }
    }
  };
  return (
    <div className="w-full px-2">
      <div
        className={`bg-${styleSetting.primary} font-bold text-white text-2xl flex w-full h-12`}>
        <div className="flex items-center w-full ">
          <ion-icon
            onClick={closePassengerSelection}
            name="chevron-back"></ion-icon>
          <div className="flex justify-center w-full">
            <h3 className={`font-bold text-xl hidden-sm`}>
              Class and Passengers selection
            </h3>
          </div>
        </div>
      </div>
      <div className="my-2">
        <h3
          className={`fw700 font-black text-lg text-${styleSetting.primary_Light}`}>
          Class Selection
        </h3>
      </div>

      <div className="flex justify-between px-4 items-center flex-wrap">
        <label className="" htmlFor="first">
          <span
            className={`fw700 pr-1 cursor-pointer font-semibold text-sm text-${styleSetting.primary_Light}`}>
            First class
          </span>
          <input
            onChange={chooseClass}
            name="First class"
            id="first"
            type="radio"
            value={FIRST_CLASS}
            checked={FIRST_CLASS === ticketClass}
          />
        </label>

        <label className="pl-1" htmlFor="second">
          <span
            className={`fw700 pr-1 cursor-pointer font-semibold text-sm text-${styleSetting.primary_Light}`}>
            Standard class
          </span>
          <input
            onChange={chooseClass}
            name="Standard class"
            id="second"
            type="radio"
            value={STANDARD_CLASS}
            checked={STANDARD_CLASS === ticketClass}
          />
        </label>

        <label className="pl-1" htmlFor="bed">
          <span
            className={`fw700 pr-1 cursor-pointer font-semibold text-sm text-${styleSetting.primary_Light}`}>
            Single bed
          </span>
          <input
            onChange={chooseClass}
            name="Single bed"
            id="bed"
            type="radio"
            value={SINGLE_BED}
            checked={SINGLE_BED === ticketClass}
          />
        </label>
      </div>

      <div className="">
        <div className="my-2">
          <h3
            className={`fw700 font-black text-lg text-${styleSetting.primary_Light}`}>
            Passengers Selection
          </h3>
        </div>
        <div className="px-4">
          <label
            className="flex justify-between w-full "
            htmlFor="adult">
            <div className="flex flex-col w-3/5">
              <span className="font-bold">Adult</span>
              <span className="flex flex-no-wrap items-center text-xs font-medium">
                <ion-icon
                  class="text-xl"
                  name="information-circle-sharp"></ion-icon>
                <span className="px-2">over than 15 years old</span>
              </span>
            </div>
            <div className=" w-2/5 flex flex-no-wrap">
              <button
                onClick={selectAdultPassengers}
                id="subAdult"
                className={`h-10 w-10  text-xl cursor-pointer ${
                  numberOfAdults === 1
                    ? " cursor-not-allowed bg-gray-200 "
                    : "bg-gray-400"
                } `}>
                -
              </button>

              <input
                readOnly
                className="hidespinner w-1/3 text-center"
                type="number"
                name="AdultInp"
                max="6"
                value={numberOfAdults}
                id="adult"
              />
              <button
                onClick={selectAdultPassengers}
                id="addAdult"
                className="h-10 w-10 bg-gray-400 text-xl cursor-pointer">
                +
              </button>
            </div>
          </label>
          <label
            className="flex justify-between mt-4"
            htmlFor="child">
            <div className="flex flex-col w-3/5">
              <span className="font-bold">Children</span>
              <span className="flex flex-no-wrap items-center text-xs font-medium">
                <ion-icon
                  class="text-xl"
                  name="information-circle-sharp"></ion-icon>
                <span className="px-2">less than 15 years old</span>
              </span>
            </div>
            <div className="w-2/5 flex flex-no-wrap">
              <button
                onClick={selectChildrenPassengers}
                id="subChild"
                className={`h-10 w-10  text-xl cursor-pointer ${
                  numberOfChildren === 0
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-gray-400"
                } `}>
                -
              </button>

              <input
                readOnly
                className="hidespinner w-1/3 text-center"
                type="number"
                name="ChildInp"
                max="6"
                value={numberOfChildren}
                id="child"
              />
              <button
                onClick={selectChildrenPassengers}
                id="addChild"
                className="h-10 w-10 bg-gray-400 text-xl cursor-pointer">
                +
              </button>
            </div>
          </label>
        </div>
      </div>
      <div className="flex justify-around items-center mt-4">
        {errorMsg ? (
          <ion-icon
            class={`text-${styleSetting.secondary} text-2xl my-2`}
            name="warning-sharp"></ion-icon>
        ) : null}
        <p className="font-semibold fw700 text-sm">{errorMsg} </p>
      </div>

      <div className="px-2 pb-2">
        <div
          onClick={(e) => {
            if (!selectedDate) {
              openAlert(
                "Please complete date selection first",
                "date"
              );
            } else {
              search(e);
            }
          }}
          className={`bg-${styleSetting.secondary} text-white text-xl w-full mt-2 rounded-xl h-16 flex justify-center items-center text-align-center fw700`}>
          Search
        </div>
      </div>
    </div>
  );
}
