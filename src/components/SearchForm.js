import React, { useState, useRef } from "react";
import { useNavigate } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";

import Modal from "./Modal";
import DatePicker from "./DatePicker";
import PassengersSelection from "./PassengersSelection";
// import * as cities from "../api/stations.json";
import TwoOptionAlert from "./TwoOptionAlert";
import Loader from "../components/Loader";
import {
  setDepartureDate,
  setReturnDate,
  selectDate,
  getDatewithNames,
  setOriginCity,
  setDestinationCity,
  fetchStations,
  fetchTrains,
  setoriginID,
  setdestinationID,
} from "../actions";
import {
  FIRST_CLASS,
  STANDARD_CLASS,
  SINGLE_BED,
} from "../actions/types";
import { useEffect } from "react";

export default function SeartchForm() {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const styleSetting = state.styleSetting;
  const stations = state.stations.cities;
  const [originStation, setoriginStation] = useState([]);
  const [destinationStation, setdestinationStation] = useState([]);
  const [fromListdiv, setfromListdiv] = useState("hidden");
  const [toListdiv, settoListdiv] = useState("hidden");
  const dispatch = useDispatch();
  const [fromValue, setfromValue] = useState("");
  const [toValue, settoValue] = useState("");
  const departureDate = state.time.departureDate;
  const returnDate = state.time.returnDate;
  const ticketClass = state.reservationData.comfort;
  const roundtrip = state.reservationData.roundtrip;
  const numberOfAdults = state.reservationData.adulte;
  const numberOfChildren = state.reservationData.kids;
  const totalPassengers = numberOfAdults + numberOfChildren;
  const timeOftheday = state.time.timeOftheday;
  const reservationData = state.reservationData;
  const isConnected = window.navigator.onLine;

  useEffect(() => {
    if (isConnected) {
      console.log("stations updated");
      dispatch(fetchStations());
    } else {
      alertMessage(
        {
          title: "Error",
          body: (
            <div className="pt-4 px-8 text-xl flex">
              <span>
                {"Please check your internet connexion and try again"}
              </span>
            </div>
          ),
          option1text: "Ok",
        },
        "reload",
        "",
        "w-1/2"
      );
    }
  }, [isConnected]);

  const checkResponse = (resp) => {
    console.log("checking response");
    console.log(typeof resp);
    if (resp === undefined) {
      alertMessage(
        {
          title: "Error",
          body: (
            <div className="pt-4 px-8 text-xl flex">
              <span>
                {"Please check your internet connexion and try again"}
              </span>
            </div>
          ),
          option1text: "Ok",
        },
        "reload",
        "",
        "w-1/2"
      );
    } else if (Object.keys(resp).length === 0) {
      alertMessage(
        {
          title: "Error",
          body: (
            <div className="pt-4 px-8 text-xl flex">
              <span>
                {
                  "something went wrong!! this page will reload and everything will be fine :)"
                }
              </span>
            </div>
          ),
          option1text: "Ok",
        },
        "reload",
        "",
        "w-1/2"
      );
    } else {
      if (resp.status === "error" || resp.status === 500) {
        alertMessage(
          {
            title: "Error",
            body: (
              <div className="pt-4 px-8 text-xl flex">
                <span>
                  {resp.error === "Aucun train n'est disponible"
                    ? "No train was found please try again with different date or stations"
                    : "Please check your internet connexion and try again"}{" "}
                </span>
              </div>
            ),
            option1text: "Ok",
          },
          "reload",
          "",
          "w-1/2"
        );
      } else if (resp.departurePath) {
        navigate("/reservation");
      }
    }
  };

  const checkInputFields = () => {
    let errors = [];
    if (originStation.length < 1) {
      errors.push("Departure station");
    }
    if (destinationStation.length < 1) {
      errors.push("Destination station");
    }
    if (!departureDate) {
      errors.push("Departure date");
    }
    if (roundtrip && !returnDate) {
      errors.push("Return date");
    }
    if (errors.length >= 1) {
      return errors;
    } else {
      return null;
    }
  };
  const submitSearch = (e) => {
    e.preventDefault();
    if (checkInputFields() === null) {
      dispatch(fetchTrains(reservationData)).then((res) => {
        checkResponse(res);
      });
    } else {
      alertMessage(
        {
          title: "Error",
          body: (
            <div className="pt-4">
              <span>Please fill all the required fields:</span>
              {checkInputFields().map((err) => {
                return (
                  <div
                    key={err}
                    className={`${styleSetting.secondary} flex items-center font-semibold pl-8`}>
                    <ion-icon
                      class={`text-${styleSetting.secondary}`}
                      name="warning-sharp"></ion-icon>
                    <span>{err}</span>
                  </div>
                );
              })}
            </div>
          ),
          option1text: "Complete my reservation",
        },
        (() => {
          let err = checkInputFields();
          if (
            err.includes("Departure date") ||
            err.includes("Return date")
          ) {
            return "date";
          }
        })()
      );
    }
  };

  const modalRef = useRef();

  const swapStations = () => {
    setfromValue(toValue);
    setoriginStation(destinationStation);
    settoValue(fromValue);
    setdestinationStation(originStation);
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  const alertMessage = (message, goto, resetDates, classes) => {
    modalRef.current.open(
      <TwoOptionAlert
        message={message}
        //close the modal alert
        closePopup={closeModal}
        onClickOptions={{
          //Accept
          option1Click: () => {
            //close the current Modal
            //open passenger selection modal
            if (goto === "passengers") {
              document.querySelector(".passengers").click();
            } else if (goto === "date") {
              document.querySelector(".date").click();
            } else if (goto === "reload") {
              window.location.reload();
            }
          },
          //Decline
          option2Click: () => {
            // reset the dates if the user want to choose another date
            dispatch(setDepartureDate(null));
            dispatch(setReturnDate(null));
            dispatch(selectDate(null));
            document.querySelector(".date").click();
          },
        }}
      />,
      classes
    );
  };

  const openModal = (content) => {
    if (content === "date") {
      modalRef.current.open(
        <DatePicker
          openAlert={alertMessage}
          closeDatePicker={closeModal}
          openPassengerSelection={() => {
            document.querySelector(".passengers").click();
          }}
        />
      );
    } else if (content === "passengers") {
      modalRef.current.open(
        <PassengersSelection
          openAlert={alertMessage}
          closePassengerSelection={closeModal}
          search={() => {
            if (window.screen.width >= 768) {
              document.querySelector(".searchDesktop").click();
            } else {
              document.querySelector(".searchMobile").click();
            }
          }}
        />
      );
    }
  };

  const showDates = (dateType, date) => {
    const selectedDate = getDatewithNames(date);
    return (
      <>
        <span className="pt-1 leading-4 text-white text-sm">
          {dateType}
        </span>
        <span className="text-gray-300 text-xs">
          {selectedDate.dayName}{" "}
        </span>
        <span className="text-white text-xl">{date.getDate()}</span>
        <span className="pb-1 text-gray-300 text-xs">
          {selectedDate.monthName}
        </span>
      </>
    );
  };

  const updateCalendarBtn = () => {
    if (departureDate) {
      if (!roundtrip) {
        return (
          <span className="flex flex-col justify-center items-center">
            {showDates("Departure", departureDate)}{" "}
          </span>
        );
      } else {
        if (returnDate) {
          return (
            <span className="flex justify-around items-center w-full">
              <span className="flex flex-col justify-center items-center">
                {showDates("Departure", departureDate)}{" "}
              </span>
              <span className="text-xl text-white">... </span>
              <span className="flex flex-col justify-center items-center">
                {showDates("Return", returnDate)}{" "}
              </span>
            </span>
          );
        } else {
          return (
            <span className="flex justify-around items-center w-full h-full">
              <span className="flex flex-col justify-center items-center">
                {showDates("Departure", departureDate)}{" "}
              </span>
              <span className="text-xl text-white">... </span>
              <span className="flex flex-col justify-start items-center h-full">
                <span className="pt-1 leading-4 text-white text-sm">
                  Return
                </span>
                <ion-icon
                  class="text-gray-300 text-5xl"
                  name="calendar-sharp"></ion-icon>
              </span>
            </span>
          );
        }
      }
    } else {
      return (
        <span className="flex justify-center items-center md:pr-2">
          <ion-icon
            class="text-gray-300 text-5xl"
            name="calendar-sharp"></ion-icon>
        </span>
      );
    }
  };

  const updateTicketClassBtn = (ticketClass) => {
    switch (ticketClass) {
      case FIRST_CLASS:
        return (
          <span className="flex flex-col">
            <span className="text-white text-base font-medium">
              FIRST
            </span>
            <span className="text-white">Class</span>
          </span>
        );
      case STANDARD_CLASS:
        return (
          <span className="flex flex-col">
            <span className="text-white text-base font-medium">
              STANDARD
            </span>
            <span className="text-white">Class</span>
          </span>
        );
      case SINGLE_BED:
        return (
          <span className="text-white text-base font-medium">
            Single Bed
          </span>
        );
      default:
        return (
          <span className="text-white text-base font-medium">--</span>
        );
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  //check wether a station is a train or bus station
  const getStationIcon = (station) => {
    if (station.length > 0) {
      if (station[0] === "bus") {
        return (
          <span className="flex flex-row items-center w-full pb-1 flex-no-wrap">
            <ion-icon name="bus"></ion-icon>
            <span className="block truncate md:w-5/6 lg:w-full">
              {" "}
              {capitalizeFirstLetter(station[1])}
            </span>
          </span>
        );
      } else {
        return (
          <span className="flex flex-row items-center w-full pb-1 flex-no-wrap">
            <ion-icon name="train"></ion-icon>
            <span className="block truncate md:w-5/6 lg:w-full">
              {" "}
              {capitalizeFirstLetter(station[1])}
            </span>
          </span>
        );
      }
    } else {
      return null;
    }
  };
  return (
    <form onSubmit={submitSearch} className="px-4 md:flex">
      <div
        className={`relative flex w-full md:text-black bg-white h-22t border border-gray-300 rounded focus-within:border-${styleSetting.primary}`}
        style={{
          boxShadow: "inset 0px 3px 3px rgb(0,0,0,0.3)",
        }}>
        <div className="px-6 md:px-2 lg:px-4 xl:px-6 pt-6">
          <ion-icon class="text-3xl" name="train-outline"></ion-icon>
        </div>

        <div className="w-full">
          <input
            onChange={(e) => {
              setfromValue(e.target.value);
            }}
            onFocus={() => {
              setfromListdiv("flex");
              setoriginStation([]);
            }}
            style={{
              paddingLeft: "2px",
            }}
            value={capitalizeFirstLetter(fromValue)}
            id="fromId"
            className="lift w-full h-full block truncate md:w-5/6 lg:w-full bg-transparent focus:outline-none text-2xl font-medium"
            type="text"
            name="from"
            required
          />

          <label
            htmlFor="fromId"
            className="pointer-events-none left-20 md:left-12 lg:left-16 xl:left-20 absolute w-5/6 h-full bottom-0">
            <span
              style={{
                transition: "all 0.3s ease",
                bottom: "24px",
              }}
              className={`fromLift absolute text-xl font-medium text-${styleSetting.primary_Light}`}>
              From
            </span>
            <p
              className={`absolute bottom-0 w-full  text-sm font-medium text-${styleSetting.primary_Light}`}>
              {getStationIcon(originStation)}
            </p>
          </label>
          <div
            style={{
              boxShadow: "0 0 3px grey inset",
              transition: "all .15s ease",
              left: "-1px",
            }}
            className={`${fromListdiv} absolute box-content bg-white overflow-hidden overflow-y-auto border border-t-0 border-gray-300 z-20 w-full md:w-153 outline-none max-h-1/4s`}>
            <div className="px-4 w-full">
              <ul className="w-full">
                {stations
                  .filter(
                    (s) =>
                      s.label.toLowerCase() !== destinationStation[1]
                  )
                  .filter((station) =>
                    station.city
                      .toLowerCase()
                      .includes(fromValue.toLowerCase())
                  )
                  .map((station, i) => {
                    if (fromValue.length === 0) {
                      return null;
                    } else {
                      return (
                        <li
                          className="cursor-pointer hover:bg-blue-turkish z-20"
                          onClick={(e) => {
                            //check if the city have a train station

                            if (
                              station.label
                                .toLowerCase()
                                .includes("supra")
                            ) {
                              setoriginStation([
                                "bus",
                                station.label.toLowerCase(),
                              ]);
                            } else {
                              setoriginStation([
                                "train",
                                station.label.toLowerCase(),
                              ]);
                            }
                            dispatch(setoriginID(station._id));
                            setfromValue(station.city.toLowerCase());
                            sessionStorage.setItem(
                              "originCity",
                              station.city.toLowerCase()
                            );
                            setfromListdiv("hidden");
                          }}
                          key={station.lat + i}>
                          <span>{station.city}</span>
                          <br></br>
                          <ion-icon
                            class="pointer-events-none"
                            name="location-outline"></ion-icon>
                          <span className="pointer-events-none">
                            {station.label}
                          </span>
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Switch */}
      <div className="flex justify-center items-center -my-2 md:-mx-2 md:my-0">
        <div
          onClick={() => {
            swapStations();
          }}
          className={`relative h-8 w-8 bg-${styleSetting.primary} transform rotate-90 md:rotate-0 rounded-full z-20 cursor-pointer`}>
          <ion-icon
            class="transform text-white text-2xl m-0 absolute bottom-1 left-1"
            name="repeat"></ion-icon>
        </div>
      </div>

      {/* TO */}
      <div
        className={`relative flex w-full md:text-black bg-white h-22t border border-gray-300 rounded focus-within:border-${styleSetting.primary}`}
        style={{
          boxShadow: "inset 0px 3px 3px rgb(0,0,0,0.3)",
        }}>
        <div className="px-6 md:px-2 lg:px-4 xl:px-6 pt-6">
          <ion-icon class="text-3xl" name="train-sharp"></ion-icon>
        </div>
        <div className="w-full">
          <input
            onChange={(e) => {
              settoValue(e.target.value);
            }}
            onFocus={() => {
              settoListdiv("flex");
              setdestinationStation([]);
            }}
            value={capitalizeFirstLetter(toValue)}
            id="toId"
            style={{
              paddingLeft: "2px",
            }}
            className="tolift w-full h-full block truncate md:w-5/6 lg:w-full bg-transparent focus:outline-none text-2xl font-medium"
            type="text"
            name="To"
            required
          />

          <label
            htmlFor="toId"
            className="pointer-events-none left-20 md:left-12 lg:left-16 xl:left-20  absolute w-5/6 h-full bottom-0">
            <span
              style={{
                transition: "all 0.3s ease",
                bottom: "24px",
              }}
              className={`toLift absolute text-xl font-medium text-${styleSetting.primary_Light} `}>
              To
            </span>
            <p
              className={`absolute bottom-0 w-full text-sm font-medium text-${styleSetting.primary_Light}`}>
              {getStationIcon(destinationStation)}
            </p>
          </label>
          <div
            style={{
              boxShadow: "0 0 3px grey inset",
              transition: "all .15s ease",
              left: "-1px",
            }}
            className={`${toListdiv} absolute box-content bg-white overflow-hidden border border-t-0 border-gray-300 z-10 w-full md:w-153 max-h-1/4s`}>
            <div className="px-4 w-full overflow-y-auto">
              <ul className="w-full">
                {stations
                  .filter(
                    (s) => s.label.toLowerCase() !== originStation[1]
                  )
                  .filter((station) =>
                    station.city
                      .toLowerCase()
                      .includes(toValue.toLowerCase())
                  )
                  .map((station, i) => {
                    if (toValue.length === 0) {
                      return null;
                    } else {
                      return (
                        <li
                          className="cursor-pointer hover:bg-blue-turkish z-20"
                          onClick={() => {
                            //check if the city have a train station
                            if (
                              station.label
                                .toLowerCase()
                                .includes("supra")
                            ) {
                              setdestinationStation([
                                "bus",
                                station.label.toLowerCase(),
                              ]);
                            } else {
                              setdestinationStation([
                                "train",
                                station.label.toLowerCase(),
                              ]);
                            }
                            settoValue(station.city.toLowerCase());
                            dispatch(setdestinationID(station._id));
                            sessionStorage.setItem(
                              "destinationCity",
                              station.city.toLowerCase()
                            );
                            settoListdiv("hidden");
                          }}
                          key={station.lat + i}>
                          <span>{station.city}</span>
                          <br></br>
                          <ion-icon
                            class="pointer-events-none"
                            name="location-outline"></ion-icon>
                          <span className="pointer-events-none">
                            {station.label}
                          </span>
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar and Passenger */}
      <div className="flex mt-4 w-full md:mt-0 md:ml-4 ">
        <div
          onClick={() => {
            openModal("date");
          }}
          className={`date bg-${styleSetting.primary} z-0 min-w-32 w-1/2 h-22t flex justify-center items-center cursor-pointer mr-2 `}>
          <span
            className={`hidden text-base font-normal md:inline ${
              departureDate ? "" : "px-2"
            } `}>
            {departureDate ? "" : " Dates"}
          </span>
          {updateCalendarBtn()}
        </div>
        <div
          onClick={() => {
            openModal("passengers");
          }}
          className={`passengers relative bg-${styleSetting.primary} min-w-32 w-1/2 h-22t p-2 flex justify-center items-center cursor-pointer ml-2`}>
          <span className="flex justify-around w-full items-center">
            <span className="flex flex-col text-sm md:text-xs leading-5 ">
              <span className="text-gray-400">Ticket Class</span>
              <>{updateTicketClassBtn(ticketClass)}</>
            </span>
            <span className="flex flex-no-wrap items-center">
              {[...Array(totalPassengers)].map((passenger, i) => {
                if (i === 3) {
                  return (
                    <span
                      key={i}
                      className="font-black ml-px md:text-sm text-gray-400">
                      +
                    </span>
                  );
                } else if (i < 3) {
                  return (
                    <ion-icon
                      key={i}
                      class={`${
                        i === 2 ? "text-gray-400 " : "text-gray-300"
                      } text-2xl md:text-1xl -m-2`}
                      name="man-sharp"></ion-icon>
                  );
                } else {
                  return null;
                }
              })}
              <span className="absolute top-0 right-0 text-base font-bold text-white w-5">
                {totalPassengers}
              </span>
            </span>
          </span>
        </div>
        <Modal ref={modalRef} />
      </div>
      <input
        className={`bg-${styleSetting.secondary} searchMobile cursor-pointer md:hidden text-white text-4xl w-full h-22t my-4 md:ml-4 md:my-0`}
        type="submit"
        value="Search"
      />
      <input
        className={`bg-${styleSetting.secondary} searchDesktop cursor-pointer hidden md:inline text-white text-4xl w-40 h-22t my-4 md:ml-4 md:my-0`}
        type="submit"
        value=">"
      />
    </form>
  );
}
