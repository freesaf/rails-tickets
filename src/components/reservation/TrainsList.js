import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getPassengersCount } from "../../actions";
import TripPrices from "./TripPrices";
import TripDetails from "./TripDetails";
import PriceComponent from "./PriceComponent";
import Train from "./Train";
import Modal from "../Modal";

export default function TrainList({ directionPath, selectTrain }) {
  const state = useSelector((state) => {
    return state;
  });
  const currency = localStorage.getItem("currency");
  const styleSetting = state.styleSetting;
  const [priceDetailsDisplay, setpriceDetailsDisplay] = useState("");
  const [tripDetailsDisplay, settripDetailsDisplay] = useState("");
  const modalRef = useRef();

  const closeModal = () => {
    modalRef.current.close();
  };
  const openModal = (content) => {
    modalRef.current.open(content);
  };

  const showPriceDetails = (i) => {
    // close any open trip details div
    settripDetailsDisplay("");
    //check if the prices are already displayed then switch the display
    if (priceDetailsDisplay === i) {
      setpriceDetailsDisplay("");
    } else {
      setpriceDetailsDisplay(i);
    }
  };

  const showTripDetails = (i) => {
    // close any open trip prices div
    setpriceDetailsDisplay("");
    //check if the details are already displayed then switch the display
    if (tripDetailsDisplay === i) {
      settripDetailsDisplay("");
    } else {
      settripDetailsDisplay(i);
    }
  };

  const getPassengers = (passengers) => {
    let passengerText;
    const totalPassengers = getPassengersCount(passengers);
    const adultsCount = totalPassengers.adultsCount;
    const childrenCount = totalPassengers.childrenCount;
    const adultsText = totalPassengers.adultsText;
    if (childrenCount === 1) {
      passengerText = `${adultsCount} ${adultsText}, ${childrenCount} child`;
    } else if (childrenCount >= 2) {
      passengerText = `${adultsCount} ${adultsText}, ${childrenCount} children`;
    } else {
      if (adultsCount > 1) {
        passengerText = `${adultsCount} ${adultsText}`;
      } else {
        passengerText = "";
      }
    }

    return (
      <span
        className={`text-xxs text-${styleSetting.primary_Light} flex flex-col sm:leading-4`}>
        <span className="sm:text-xxs2">
          {passengers.length}{" "}
          {passengers.length >= 2 ? "Passengers" : "Passenger"}{" "}
        </span>
        <span> {passengerText} </span>
      </span>
    );
  };

  const ShowTrainsList = () => {
    return directionPath.map((train, i) => {
      return (
        <div key={i} className="flex flex-col items-center">
          <div className="w-full lg:max-w-screen-lg flex flex-no-wrap px-4 py-2">
            <div
              onClick={() => {
                showTripDetails(i);
              }}
              className={`relative w-3/4 bg-white shadow hover:shadow-hv md:flex md:items-center p-4 cursor-pointer ${
                tripDetailsDisplay === i ? "-mb-2" : ""
              }`}>
              <Train train={train} />

              {/* Trip details */}
              <span className={`text-xxs2 font-medium  `}>
                <span
                  className={`hidden md:flex flex-col items-center text-${styleSetting.primary_Light} border-l-2 px-6`}>
                  <span>Trip details</span>
                  <ion-icon
                    style={{
                      transition: "all 0.15s ease",
                    }}
                    class={`inline-block w-5 h-5 transform ${
                      tripDetailsDisplay === i
                        ? "rotate-180"
                        : "rotate-0"
                    } visible`}
                    name="chevron-down-outline"></ion-icon>
                </span>
                <span
                  onClick={() => {
                    openModal(
                      <TripDetails
                        closeM={closeModal}
                        showPrices={() => {
                          closeModal();
                          showPriceDetails(i);
                        }}
                        tripPath={train}
                        indx={i}
                      />
                    );
                  }}
                  className={`md:hidden cursor-pointer text-${styleSetting.info}`}>
                  Details
                </span>
              </span>

              <Modal ref={modalRef} />
            </div>
            {/* Passengers */}
            <div
              onClick={() => {
                showPriceDetails(i);
              }}
              className={`w-1/4 bg-white flex justify-between items-center xs:flex-col xs:justify-center hover:shadow-hv shadow ml-1 sm:pr-2 cursor-pointer ${
                priceDetailsDisplay === i ? "-mb-2" : ""
              } `}>
              <div className="flex flex-col pl-2">
                {getPassengers(train.travelersList)}
                <div className="font-semibold whitespace-no-wrap text-xxs4 md:text-base">
                  <PriceComponent
                    currency={currency}
                    price={train.tripPrices[2].data.price}
                  />
                </div>
              </div>
              <div className="sm:pt-5">
                <ion-icon
                  style={{
                    transition: "all 0.15s ease",
                  }}
                  class={`inline-block w-5 h-5 md:text-${
                    styleSetting.primary_Light
                  } transform ${
                    priceDetailsDisplay === i
                      ? "rotate-180 "
                      : "rotate-0"
                  } visible`}
                  name="chevron-down-outline"></ion-icon>
              </div>
            </div>
          </div>
          <div
            className={`${
              tripDetailsDisplay === i
                ? "w-full flex p-4 pt-0 lg:max-w-screen-lg"
                : "hidden"
            }`}>
            <TripDetails
              showPrices={() => {
                closeModal();
                showPriceDetails(i);
              }}
              tripPath={train}
              indx={i}
            />
          </div>
          <div
            className={
              priceDetailsDisplay === i
                ? "w-full flex p-4 pt-0 lg:max-w-screen-lg "
                : "hidden"
            }>
            <TripPrices
              tripPath={train}
              currency={currency}
              i={i}
              selectTrain={(selectedTrain, priceIndx) => {
                selectTrain(selectedTrain, priceIndx);
              }}
            />
          </div>
        </div>
      );
    });
  };

  return <div className="w-full">{ShowTrainsList()} </div>;
}
