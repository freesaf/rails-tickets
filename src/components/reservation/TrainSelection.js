import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import * as res from "../../api/prices.json";
import * as res from "../../api/pricesE.json";
import TripPrices from "./TripPrices";
import { setDirectTrip } from "../../actions";
import TrainDetails from "./TrainDetails";
import Modal from "../Modal";

export default function TrainSelection() {
  const state = useSelector((state) => {
    return state;
  });
  const directTrip = state.reservation.directTrip;
  const styleSetting = state.styleSetting;
  const [detailsDisplay, setdetailsDisplay] = useState("");
  const dispatch = useDispatch();
  const modalRef = useRef();

  const closeModal = () => {
    modalRef.current.close();
  };
  const openModal = () => {
    modalRef.current.open(
      <TrainDetails
        showPrices={() => {
          closeModal();
        }}
      />
    );
  };

  const showDetails = (i) => {
    //check if the details are already displayed then swich the display
    if (detailsDisplay === i) {
      setdetailsDisplay("");
    } else {
      setdetailsDisplay(i);
    }
  };

  const getTrainTime = (date) => {
    let hours = new Date(date).getHours();
    let minutes = new Date(date).getMinutes();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return {
      hours,
      minutes,
    };
  };

  const getTripduration = (time) => {
    const t = time.split(":");
    return {
      hours: t[0],
      minutes: t[1],
    };
  };
  const getPassengers = (passengers) => {
    let adultsText, passengerText;
    let adultsCount = 0;
    let childrenCount = 0;
    for (let i = 0; i < passengers.length; i++) {
      if (passengers[i].demographicProfile.id == 1) {
        childrenCount++;
      } else if (passengers[i].demographicProfile.id == 3) {
        adultsCount++;
      }
    }
    if (adultsCount >= 2) {
      adultsText = "adults";
    } else {
      adultsText = "adult";
    }
    if (childrenCount === 1) {
      passengerText = `${adultsCount} ${adultsText}, ${childrenCount} child`;
    } else if (childrenCount >= 2) {
      passengerText = `${adultsCount} ${adultsText}, ${childrenCount} children`;
    } else {
      passengerText = `${adultsCount} ${adultsText}`;
    }

    return (
      <span
        className={`text-xxs text-${styleSetting.primary_Light} flex flex-col`}>
        <span>
          {passengers.length}{" "}
          {passengers.length >= 2 ? "Passengers" : "Passenger"}{" "}
        </span>
        <span> {passengerText} </span>
      </span>
    );
  };

  const showResults = () => {
    return res.default.availability.departurePath.map(
      (departPath, i) => {
        return (
          <div
            key={departPath.dateTimeArrival}
            className="flex flex-col items-center md:flex-row">
            <div className="w-full lg:max-w-screen-lg flex flex-no-wrap px-4 py-2">
              <div className="w-3/4 bg-white shadow hover:shadow-lg md:flex md:justify-between p-4">
                <div className="relative md:w-10/12">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium md:text-base">
                        {`${
                          getTrainTime(departPath.dateTimeDeparture)
                            .hours
                        }:${
                          getTrainTime(departPath.dateTimeDeparture)
                            .minutes
                        }`}
                      </span>
                      <span
                        className={`font-semi-bold text-xxs2 md:text-xxs4 text-${styleSetting.primary_Light}`}>
                        {
                          departPath.departureStationId.description
                            .default
                        }
                      </span>
                    </div>
                    <span
                      style={{
                        left: "45%",
                      }}
                      className={`absolute text-${styleSetting.primary_Light} flex justify-center text-xxs font-medium`}>
                      {departPath.segmentsList.length <= 1
                        ? "Direct"
                        : departPath.segmentsList[0].arrivalStationId
                            .description.default}
                      <span
                        className={`${
                          departPath.segmentsList.length <= 1
                            ? "hidden"
                            : "inline"
                        }  absolute top-1 w-3 h-3 rounded-full border bg-white self-center z-10 border-black -mt-1 md:mt-0`}></span>
                    </span>

                    <hr className="absolute w-2/4 border-black self-center left-12"></hr>
                    <hr className="absolute w-2/4 border-black self-center right-12"></hr>
                    <div className="flex flex-col">
                      <span className="font-medium md:text-base self-end">
                        {`${
                          getTrainTime(departPath.dateTimeArrival)
                            .hours
                        }:${
                          getTrainTime(departPath.dateTimeArrival)
                            .minutes
                        }`}
                      </span>
                      <span
                        className={`font-semi-bold text-xxs2 md:text-xxs4 text-${styleSetting.primary_Light}`}>
                        {
                          departPath.arrivalStationId.description
                            .default
                        }
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex border-t md:border-t-0 justify-between items-end md:items-baseline mt-2 pt-1 md:w-2/12 md:flex-col-reverse ">
                  <span
                    onClick={() => {
                      openModal(i, departPath.segmentsList);
                    }}
                    className={`md:border-l md:border-black text-xxs2 md:w-full md:text-center font-medium text-${styleSetting.info} cursor-pointer`}>
                    Details
                  </span>
                  <Modal ref={modalRef} />
                  <span className="md:flex flex-col">
                    <span
                      className={`text-xxs text-${styleSetting.primary_Light}`}>
                      Trip Duration:
                    </span>
                    <span className="text-xxs2 md:text-center ">
                      {` ${
                        getTripduration(departPath.journeyDuration)
                          .hours
                      }h ${
                        getTripduration(departPath.journeyDuration)
                          .minutes
                      }m`}
                    </span>
                  </span>
                </div>
              </div>
              <div
                className={`w-1/4 bg-white flex justify-between items-center shadow ml-1 ${
                  detailsDisplay === i ? "-mb-2" : ""
                } `}>
                <div className="flex flex-col px-2">
                  {getPassengers(departPath.travelersList)}
                  <div className="font-semibold text-xxs4 md:text-base">
                    <span>USD </span>
                    <span>{departPath.tripPrices[2].data.price}</span>
                    <span
                      style={{ fontSize: "55%" }}
                      className="align-top font-bold">
                      .00
                    </span>
                  </div>
                </div>

                <ion-icon
                  onClick={() => {
                    showDetails(i);
                  }}
                  style={{
                    transition: "all 0.3s ease",
                  }}
                  class={`inline-block w-5 h-5 cursor-pointer transform ${
                    detailsDisplay === i ? "rotate-180" : "rotate-0"
                  } visible`}
                  name="chevron-down-outline"></ion-icon>
              </div>
            </div>
            <div
              className={
                detailsDisplay === i ? "flex p-4 pt-0" : "hidden"
              }>
              <TripPrices />
            </div>
          </div>
        );
      }
    );
  };

  return <div>{showResults()}</div>;
}
