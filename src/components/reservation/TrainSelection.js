import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Modal";
// import * as res from "../../api/prices.json";
// import * as res from "../../api/pricesE.json";
import Loader from "../Loader";
import TrainsList from "./TrainsList";
import PriceDetail from "./PriceDetail";
import {
  selectDepartureTrain,
  getDatewithNames,
  capitalizeFirstLetter,
  setReservationStepStatus,
  setCurrentReservationState,
  selectReturnTrain,
  getPassengersCount,
  fetchStations,
} from "../../actions";
import Train from "./Train";
import { useNavigate } from "@reach/router";
import SelectedTrainDetails from "./SelectedTrainDetails";
import PriceComponent from "./PriceComponent";

export default function TrainSelection() {
  if (
    sessionStorage.getItem("originCity") === null ||
    sessionStorage.getItem("destinationCity") === null ||
    sessionStorage.getItem("roundtrip") === null
  ) {
    window.location.replace("/");
  }
  const state = useSelector((state) => state);
  const [tripDetailsDisplay, settripDetailsDisplay] = useState(false);
  const styleSetting = state.styleSetting;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roundtrip = state.tickets.roundtrip;
  const [selectedPriceIndx, setselectedPriceIndx] = useState([]);
  const departureTrain = state.reservation.departureTrain;
  const returnTrain = state.reservation.returnTrain;
  // const apiResponse = res.default;
  const apiResponse = state.trainSearch.trainsTimes;
  const isLoading = state.loader;
  const originCity = capitalizeFirstLetter(
    sessionStorage.getItem("originCity")
  );
  const destinationCity = capitalizeFirstLetter(
    sessionStorage.getItem("destinationCity")
  );

  const deDate = state.time.departureDate;
  const reDate = state.time.returnDate;
  const priceDetailsModal = useRef();
  const openModal = (passengers) => {
    // priceDetailsModal.current.open(
    //   <PriceDetail passsengers={passengers} />,
    //   "w-1/2"
    // );
  };

  const trainSelected = () => {
    if (roundtrip && departureTrain && returnTrain) {
      return true;
    } else if (!roundtrip && departureTrain) {
      return true;
    } else {
      return false;
    }
  };

  const getDestinationAndDates = (direction) => {
    let departureDate, returnDate;
    if (roundtrip) {
      departureDate = getDatewithNames(deDate);
      returnDate = getDatewithNames(reDate);
    } else {
      departureDate = getDatewithNames(deDate);
    }
    if (direction === "departure") {
      return `${originCity} to ${destinationCity} on ${departureDate.dayName}, ${departureDate.monthName} ${departureDate.currentDate}`;
    } else {
      return `${destinationCity} to ${originCity} on ${returnDate.dayName}, ${returnDate.monthName} ${returnDate.currentDate}`;
    }
  };

  const getPassengerTotal = () => {
    console.log("passenger Total");
  };

  const checkTicketType = () => {
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
                direction === "departure"
                  ? styleSetting.secondary
                  : styleSetting.info
              }`}>
              {direction === "departure"
                ? "Outbound trip"
                : "Inbound trip"}
            </span>
            <div
              onClick={() => {
                //remove the selected train and price
                if (direction === "departure") {
                  selectedPriceIndx.shift();
                  dispatch(selectDepartureTrain(null));
                } else {
                  selectedPriceIndx.pop();
                  dispatch(selectReturnTrain(null));
                }
              }}
              className={`${
                (
                  direction === "departure"
                    ? departureTrain
                    : returnTrain
                )
                  ? "inline-block"
                  : "hidden"
              } ml-6 border-l border-solid border-black pl-6 text-${
                styleSetting.info
              } cursor-pointer`}>
              <ion-icon
                class={`text-${styleSetting.info} text-xl align-text-bottom pr-3`}
                name="create-outline"></ion-icon>
              <span>Change Train</span>
            </div>
            <div className="mt-1 text-2xl font-thin">
              {getDestinationAndDates(direction)}
            </div>
          </div>
        </div>
        {(
          direction === "departure" ? departureTrain : returnTrain
        ) ? (
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
                {direction === "departure" ? (
                  <Train train={departureTrain} />
                ) : (
                  <Train train={returnTrain} />
                )}
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
                className={`${
                  tripDetailsDisplay ? "block" : "hidden"
                } bg-${styleSetting.lightBg} p-4 md:bg-white`}>
                <SelectedTrainDetails
                  selectedTrain={
                    direction === "departure"
                      ? departureTrain
                      : returnTrain
                  }
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
                    setselectedPriceIndx([l, ...selectedPriceIndx]);
                  }}
                />
                <span
                  className={`${
                    apiResponse.nextCta.next ? "block" : "hidden"
                  }`}>
                  Load more
                </span>
              </>
            ) : (
              <TrainsList
                directionPath={apiResponse.arrivalPath}
                selectTrain={(t, l) => {
                  dispatch(selectReturnTrain(t));
                  setselectedPriceIndx([...selectedPriceIndx, l]);
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
      <div>
        <div className="w-full flex flex-col justify-around">
          {checkTicketType()}
        </div>
        <div
          className={`${
            trainSelected() ? "block" : "hidden"
          } fixed flex justify-evenly items-center bottom-0 text-white min-h-1/4s w-full bg-${
            styleSetting.primary
          }`}>
          <span>
            Total price for{" "}
            {apiResponse.departurePath[0].travelersList.length}{" "}
            passenger(s)
          </span>
          <span
            className="cursor-pointer underline"
            onClick={() => {
              openModal(getPassengerTotal());
            }}>
            Price details
          </span>
          <Modal ref={priceDetailsModal} />
          <button
            onClick={() => {
              dispatch(
                setReservationStepStatus({
                  stepName: "trainSelectionCompleted",
                  status: true,
                })
              );
              //Go to the next step
              dispatch(setCurrentReservationState("passenger"));
            }}
            style={{
              height: "fit-content",
            }}
            className={`rounded flex justify-evenly bg-${styleSetting.secondary} font-xxs4 font-medium py-3 px-8 leading-10`}>
            <span>Continue</span>
            <span className="flex flex-no-wrap text-white pt-px pl-3">
              <i className="ion-ios-arrow-forward" />
              <i className="ion-ios-arrow-forward" />
            </span>
          </button>
        </div>
      </div>
    );
  }
}
