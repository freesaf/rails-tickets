import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../Loader";
import TrainsList from "./TrainsList";
import ReservationFooter from "../reservation/ReservationFooter";
import {
  selectDepartureTrain,
  getDatewithNames,
  capitalizeFirstLetter,
  selectReturnTrain,
  selectReturnPrice,
  selectDepartPrice,
} from "../../actions";
import Train from "./Train";
import SelectedTrainDetails from "./SelectedTrainDetails";

export default function TrainSelection({ apiResponse }) {
  const state = useSelector((state) => state);

  if (
    sessionStorage.getItem("originCity") === null ||
    sessionStorage.getItem("destinationCity") === null ||
    sessionStorage.getItem("roundtrip") === null ||
    sessionStorage.getItem("apiResponse") === null
  ) {
    window.location.replace("/");
  }
  const [tripDetailsDisplay, settripDetailsDisplay] = useState(false);
  const styleSetting = state.styleSetting;
  const dispatch = useDispatch();
  const roundtrip = state.tickets.roundtrip;

  const departureTrain = state.reservation.departureTrain;
  const returnTrain = state.reservation.returnTrain;
  const isLoading = state.loader;

  const originCity = capitalizeFirstLetter(sessionStorage.getItem("originCity"));
  const destinationCity = capitalizeFirstLetter(sessionStorage.getItem("destinationCity"));

  const getDestinationAndDates = (direction) => {
    let departureDate, returnDate;
    if (roundtrip) {
      departureDate = getDatewithNames(new Date(apiResponse.departurePath[0].dateTimeDeparture));
      returnDate = getDatewithNames(new Date(apiResponse.arrivalPath[0].dateTimeDeparture));
    } else {
      departureDate = getDatewithNames(new Date(apiResponse.departurePath[0].dateTimeDeparture));
    }
    if (direction === "departure") {
      return `${originCity} to ${destinationCity} on ${departureDate.dayName}, ${departureDate.monthName} ${departureDate.currentDate}`;
    } else {
      return `${destinationCity} to ${originCity} on ${returnDate.dayName}, ${returnDate.monthName} ${returnDate.currentDate}`;
    }
  };

  const renderTrains = () => {
    if (roundtrip) {
      return (
        <>
          {showTrainsList("departure")}
          {showTrainsList()}{" "}
        </>
      );
    } else {
      return <> {showTrainsList("departure")} </>;
    }
  };

  const showTrainsList = (direction) => {
    return (
      <>
        <div className="flex justify-center">
          <div className={`p-4 w-screen lg:max-w-screen-lg `}>
            <span
              className={`text-white text-xxs2 md:text-xxs4 uppercase font-medium px-3 py-1 bg-${
                direction === "departure" ? styleSetting.secondary : styleSetting.info
              }`}>
              {direction === "departure" ? "Outbound trip" : "Inbound trip"}
            </span>
            <div
              onClick={() => {
                //remove the selected train and price
                if (direction === "departure") {
                  dispatch(selectDepartureTrain(null));
                  dispatch(selectDepartPrice(null));
                } else {
                  dispatch(selectReturnTrain(null));
                  dispatch(selectReturnPrice(null));
                }
              }}
              className={`${
                (direction === "departure" ? departureTrain : returnTrain) ? "inline-block" : "hidden"
              } ml-6 border-l border-solid border-black pl-6 text-${styleSetting.info} cursor-pointer`}>
              <ion-icon
                class={`text-${styleSetting.info} text-xl align-text-bottom pr-3`}
                name="create-outline"></ion-icon>
              <span>Change Train</span>
            </div>
            <div className="mt-1 text-2xl font-thin">{getDestinationAndDates(direction)}</div>
          </div>
        </div>
        {(direction === "departure" ? departureTrain : returnTrain) ? (
          <div className="flex justify-center">
            <div className="w-screen lg:max-w-screen-lg p-4">
              <div
                onClick={() => {
                  settripDetailsDisplay(!tripDetailsDisplay);
                }}
                className="relative bg-white shadow md:flex md:items-center p-4 mx-2 cursor-pointer">
                <i
                  style={{
                    top: "30%",
                    left: "-2%",
                  }}
                  className="absolute ml-2 inline-block text-green-600 text-2xl align-text-bottom ion-ios-checkmark-circle"
                />
                {direction === "departure" ? <Train train={departureTrain} /> : <Train train={returnTrain} />}
                <span
                  className={`hidden md:flex flex-col items-center text-${styleSetting.primary_Light} border-l-2 px-6`}>
                  <span>Trip details</span>
                  <ion-icon
                    style={{
                      transition: "all 0.15s ease",
                    }}
                    class={`inline-block w-5 h-5 transform ${
                      tripDetailsDisplay ? "rotate-180" : "rotate-0"
                    } visible`}
                    name="chevron-down-outline"></ion-icon>
                </span>
              </div>
              <div
                className={`${tripDetailsDisplay ? "block" : "hidden"} bg-${
                  styleSetting.lightBg
                } p-4 md:bg-white`}>
                <SelectedTrainDetails
                  selectedTrain={direction === "departure" ? departureTrain : returnTrain}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {direction === "departure" ? (
              <>
                <TrainsList
                  directionPath={apiResponse.departurePath}
                  selectTrain={(t, l) => {
                    dispatch(selectDepartureTrain(t));
                    dispatch(selectDepartPrice(l));
                  }}
                />
                <span className={`${apiResponse.nextCta.next ? "block" : "hidden"}`}>Load more</span>
              </>
            ) : (
              <TrainsList
                directionPath={apiResponse.arrivalPath}
                selectTrain={(t, l) => {
                  dispatch(selectReturnTrain(t));
                  dispatch(selectReturnPrice(l));
                }}
              />
            )}
          </div>
        )}
      </>
    );
  };
  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="w-full flex flex-col justify-around">{renderTrains()}</div>
        <ReservationFooter currentStep={"trainSelectionCompleted"} nextStep={"passenger"} />
      </>
    );
  }
}
