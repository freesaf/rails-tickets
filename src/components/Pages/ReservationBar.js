import React from "react";
import { Link } from "@reach/router";
import PassengerDetails from "../reservation/PassengerDetails";
import TrainSelection from "../reservation/TrainSelection";
import { useSelector } from "react-redux";

export default function ReservationBar() {
  const state = useSelector((state) => {
    return state;
  });
  const selectedTrain = state.reservation.selectedTrain;
  const passengerInfos = state.reservation.passengerInfos;
  const otherServices = state.reservation.otherServices;
  const payments = state.reservation.payments;
  return (
    <div>
      <div className="flex flex-row flex-no-wrap justify-between items-center bg-gray-700 text-white overflow-x-auto w-auto h-10">
        <Link to="/" className="pl-2">
          <ion-icon name="home"></ion-icon>
        </Link>
        <hr className="min-w-4 mx-1 self-center"></hr>
        <Link
          to="/"
          className={`${
            selectedTrain ? "text-white" : ""
          } whitespace-no-wrap `}>
          Select Train
        </Link>
        <hr className="min-w-4 mx-1 self-center"></hr>
        <Link
          to="/"
          className={`${
            passengerInfos ? "text-white" : ""
          } whitespace-no-wrap `}>
          Passenger Details
        </Link>
        <hr className="min-w-4 mx-1 self-center"></hr>
        <Link
          to="/"
          className={`${
            otherServices ? "text-white" : ""
          } whitespace-no-wrap `}>
          Additional Services
        </Link>
        <hr className="min-w-4 mx-1 self-center"></hr>
        <Link
          to="/"
          className={`${payments ? "text-white" : ""} pr-2 `}>
          Payment
        </Link>
      </div>
      <div className="bg-gray-100">
        <TrainSelection />
      </div>
    </div>
  );
}
