import React from "react";
import { useNavigate } from "@reach/router";
import PassengerDetails from "../reservation/PassengerDetails";
import TrainSelection from "../reservation/TrainSelection";
import { useSelector } from "react-redux";
import ReservationProgressBar from "../ReservationProgressBar";

import Loader from "../Loader";

export default function ReservationPage() {
  const state = useSelector((state) => {
    return state;
  });
  const navigate = useNavigate();
  const currentReservationState =
    state.reservation.currentReservationState;
  const updateReservation = (currentReservationState) => {
    switch (currentReservationState) {
      case "train":
        return <TrainSelection />;
      case "passenger":
        return <PassengerDetails />;

      default:
        return null;
    }
  };

  if (localStorage.getItem("currency") === null) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
    return <Loader />;
  } else {
    return (
      <div>
        <ReservationProgressBar />
        <div className="bg-gray-100 clear-both">
          {updateReservation(currentReservationState)}
        </div>
      </div>
    );
  }
}
