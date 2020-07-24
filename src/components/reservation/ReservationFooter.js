import React, { useRef } from "react";

import { useSelector, useDispatch } from "react-redux";

import { setReservationStepStatus, setCurrentReservationState } from "../../actions";

import PriceComponent from "../reservation/PriceComponent";
import Modal from "../Modal";
import PriceDetail from "./PriceDetail";

export default function ReservationFooter({ currentStep, nextStep }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const apiResponse = state.trainSearch.trainTimes || JSON.parse(sessionStorage.getItem("apiResponse"));
  const roundtrip = state.tickets.roundtrip;
  const departureTrain = state.reservation.departureTrain;
  const returnTrain = state.reservation.returnTrain;
  const currency = localStorage.getItem("currency");
  const departurePrice = state.reservation.departPrice;
  const returnPrice = state.reservation.returnPrice;
  const adultsCount = state.reservationData.adulte;
  const childrenCount = state.reservationData.kids;
  const styleSetting = state.styleSetting;

  const trainSelected = () => {
    if (roundtrip && departureTrain && returnTrain) {
      return true;
    } else if (!roundtrip && departureTrain) {
      return true;
    } else {
      return false;
    }
  };

  const getTotalPrice = () => {
    if (roundtrip && returnPrice && departurePrice) {
      return (
        <PriceComponent
          showtotal={true}
          currency={currency}
          price={departurePrice.price + returnPrice.price}
        />
      );
    } else {
      return (
        <PriceComponent
          showtotal={true}
          currency={currency}
          price={departurePrice ? departurePrice.price : null}
        />
      );
    }
  };

  const priceDetailsModal = useRef();
  const openModal = () => {
    const passengers = getPassengerTotal();
    priceDetailsModal.current.open(<PriceDetail closeModal={closeM} passengers={passengers} />, "w-1/2");
  };
  const closeM = () => {
    priceDetailsModal.current.close();
  };

  const getPassengerTotal = () => {
    const adtPrice = getPrice("adult");
    const childPrice = getPrice("child");
    return {
      adultsCount: adultsCount,
      adultText: adultsCount > 1 ? "adults" : "adult",
      adultPrice: adtPrice * adultsCount,
      childrenCount: childrenCount,
      childrenText: adultsCount <= 1 ? "child" : "children",
      childPrice: childPrice * childrenCount,
      count: adultsCount + childrenCount,
      taxPrice: 5,
      feePrice: 7,
      totalprice: adtPrice * adultsCount + childPrice * childrenCount,
    };
  };

  const getPrice = (person) => {
    if (person === "adult") {
      if (roundtrip) {
        let dep = departurePrice.priceList.filter((price) => price.tariffData.profilInfo._id === "3");
        let ret = returnPrice.priceList.filter((price) => price.tariffData.profilInfo._id === "3");
        return dep[0].price + ret[0].price;
      } else {
        let dep = departurePrice.priceList.filter((price) => price.tariffData.profilInfo._id === "3");
        return dep[0].price;
      }
    } else {
      if (roundtrip) {
        let dep = departurePrice.priceList.filter((price) => price.tariffData.profilInfo._id === "1");
        let ret = returnPrice.priceList.filter((price) => price.tariffData.profilInfo._id === "1");
        return dep[0].price + ret[0].price;
      } else {
        let dep = departurePrice.priceList.filter((price) => price.tariffData.profilInfo._id === "1");
        return dep[0].price;
      }
    }
  };

  return (
    <div
      className={`${
        trainSelected() ? "flex" : "hidden"
      } fixed flex justify-evenly px-2 items-center bottom-0 text-white min-h-1/4s w-full bg-${
        styleSetting.primary
      }`}>
      <div className="flex flex-col">
        <span className="text-xxs4">
          Total price for {apiResponse.departurePath[0].travelersList.length}{" "}
          {apiResponse.departurePath[0].travelersList.length > 1 ? "passengers" : "passenger"}:{" "}
        </span>
        <span className="flex mx-2">{getTotalPrice()}</span>
        <span
          className="cursor-pointer underline text-xxs3 text-right text-teal-500"
          onClick={() => {
            openModal();
          }}>
          Price details
        </span>
      </div>
      <Modal ref={priceDetailsModal} />
      <button
        onClick={() => {
          dispatch(
            setReservationStepStatus({
              stepName: currentStep,
              status: true,
            })
          );
          //Go to the next step
          dispatch(setCurrentReservationState(nextStep));
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
  );
}
