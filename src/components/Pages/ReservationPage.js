import React, { useEffect } from "react";
import { useNavigate } from "@reach/router";
import PassengerDetails from "../reservation/PassengerDetails";
import TrainSelection from "../reservation/TrainSelection";
import { useSelector, useDispatch } from "react-redux";
import ReservationProgressBar from "../ReservationProgressBar";

import { FETCH_TRAINS, FETCH_STATIONS, SELECT_ADULT, UPDATE_PASSENGERS } from "../../actions/types";
import { setTicketType } from "../../actions";

import Loader from "../Loader";

export default function ReservationPage() {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  const apiResponse = state.trainSearch.trainTimes || JSON.parse(sessionStorage.getItem("apiResponse"));
  const passengerList = apiResponse.departurePath[0].travelersList;

  useEffect(() => {
    updateStateVar();
  }, []);
  const updateStateVar = () => {
    let sessionRoundtrip = JSON.parse(sessionStorage.getItem("roundtrip"));
    let sessionApiResp = JSON.parse(sessionStorage.getItem("apiResponse"));
    let sessioniStations = JSON.parse(sessionStorage.getItem("stations"));
    const childrenCount = sessionApiResp.departurePath[0].travelersList.filter(
      (passengers) => passengers.demographicProfile.id === "1"
    ).length;
    const adultCount = sessionApiResp.departurePath[0].travelersList.filter(
      (passengers) => passengers.demographicProfile.id === "3"
    ).length;
    dispatch(setTicketType(sessionRoundtrip));
    dispatch({
      type: UPDATE_PASSENGERS,
      payload: [childrenCount, adultCount],
    });
    dispatch({
      type: FETCH_TRAINS,
      payload: sessionApiResp,
    });
    dispatch({
      type: FETCH_STATIONS,
      payload: sessioniStations,
    });
  };

  const navigate = useNavigate();
  const currentReservationState = state.reservation.currentReservationState;
  const updateReservation = (currentReservationState) => {
    switch (currentReservationState) {
      case "train":
        return <TrainSelection apiResponse={apiResponse} />;
      case "passenger":
        return <PassengerDetails passengersList={passengerList} />;

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
        <div className="bg-gray-100 clear-both">{updateReservation(currentReservationState)}</div>
      </div>
    );
  }
}
