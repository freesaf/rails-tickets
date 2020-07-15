import React from "react";
import { Link } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentReservationState } from "../actions";

export default function ReservationProgressBar() {
  const state = useSelector((state) => {
    return state;
  });
  const currentReservationState =
    state.reservation.currentReservationState;
  const styleSetting = state.styleSetting;
  const trainSelectionCompleted =
    state.reservation.trainSelectionCompleted;
  const passengerInfosCompleted =
    state.reservation.passengerInfosCompleted;
  const confirmationCompleted =
    state.reservation.confirmationCompleted;
  const paymentCompleted = state.reservation.paymentCompleted;
  const dispatch = useDispatch();
  return (
    <div
      className={`hidden md:flex justify-center w-full align-middle bg-${styleSetting.primary}`}>
      <Link
        to="/"
        className={`bg-${styleSetting.primary} block self-center px-2 lg:px-8 text-2xl font-semibold text-${styleSetting.secondary}`}>
        LOGO
      </Link>{" "}
      <div className="arrow-steps clearFIXX max-w-screen-lg w-full">
        <Link
          onClick={() => {
            dispatch(setCurrentReservationState("train"));
          }}
          to="#"
          className={`${
            trainSelectionCompleted
              ? "cursor-pointer"
              : "cursor-not-allowed pointer-events-none"
          } ${
            currentReservationState === "train" ? "active" : ""
          } step min-w-1/5 font-semibold px-5 py-5 mx-px text-base text-center text-white float-left relative bg-${
            styleSetting.primary
          } select-none `}>
          <div className="span">
            <ion-icon
              class="pr-2 align-text-bottom text-xl"
              name="train-sharp"></ion-icon>
            <span className="whitespace-no-wrap">Select Train</span>
          </div>
        </Link>
        <Link
          onClick={() => {
            dispatch(setCurrentReservationState("passenger"));
          }}
          to="#"
          className={`${
            passengerInfosCompleted
              ? "cursor-pointer"
              : "cursor-not-allowed pointer-events-none"
          } ${
            currentReservationState === "passenger" ? "active" : ""
          } ${
            currentReservationState === "train" ? "pl-8" : ""
          } step min-w-1/5 font-semibold px-5 py-5 mx-px text-base text-center text-white float-left relative bg-${
            styleSetting.primary
          } select-none `}>
          {" "}
          <div className="span">
            <ion-icon
              class="pr-2 align-text-bottom text-xl"
              name="person-sharp"></ion-icon>
            <span className="whitespace-no-wrap">
              Passenger Details
            </span>
          </div>
        </Link>
        <Link
          onClick={() => {
            dispatch(setCurrentReservationState("confirmation"));
          }}
          to="#"
          className={` ${
            confirmationCompleted
              ? "cursor-pointer"
              : "cursor-not-allowed pointer-events-none"
          } ${
            currentReservationState === "confirmation" ? "active" : ""
          } ${
            currentReservationState === "passenger" ? "pl-8" : ""
          } step min-w-1/5 font-semibold px-5 py-5 mx-px text-base text-center text-white float-left relative bg-${
            styleSetting.primary
          } select-none `}>
          <div className="span">
            <ion-icon
              class="pr-2 align-text-bottom text-xl"
              name="train-sharp"></ion-icon>
            <span className="whitespace-no-wrap">Select Train</span>
          </div>
        </Link>
        <Link
          onClick={() => {
            dispatch(setCurrentReservationState("payment"));
          }}
          to="#"
          className={` ${
            paymentCompleted
              ? "cursor-pointer"
              : "cursor-not-allowed pointer-events-none"
          } ${
            currentReservationState === "payment" ? "active" : ""
          } ${
            currentReservationState === "confirmation" ? "pl-8" : ""
          } step min-w-1/5 font-semibold px-5 py-5 mx-px text-base text-center text-white float-left relative bg-${
            styleSetting.primary
          } select-none `}>
          <div className="span">
            <ion-icon
              class="pr-2 align-text-bottom text-xl"
              name="card"></ion-icon>
            <span className="whitespace-no-wrap">Payment</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
