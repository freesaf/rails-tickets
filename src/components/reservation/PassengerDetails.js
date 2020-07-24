import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ReservationFooter from "./ReservationFooter";
import { capitalizeFirstLetter } from "../../actions";

export default function PassengerDetails({ passengersList }) {
  const state = useSelector((state) => state);
  const styleSetting = state.styleSetting;

  const createFormObj = (passengersList) => {
    const newPassengers = [];
    for (let i = 0; i < passengersList.length; i++) {
      let person = {};
      person[`titleselect${i}`] = "";
      person[`firstName${i}`] = "";
      person[`lastName${i}`] = "";
      person[`age${i}`] = "";
      newPassengers.push(person);
    }
    return newPassengers;
  };

  const [passengers, setpassengers] = useState(createFormObj(passengersList));

  const handleChange = (e, i, passenger) => {
    let newPassengers = [...passengers];
    let age = passenger.demographicProfile.id === "3" ? "adult" : "child";

    newPassengers[i][`age${i}`] = age;
    newPassengers[i][e.target.id] = e.target.value;
    setpassengers(newPassengers);
  };

  console.log(passengers);

  const [email, setEmail] = useState("");

  const handleSelect = (e, i) => {
    let newPassengers = [...passengers];
    newPassengers[i][`title${e.target.id}`] = e.target.value;
    setpassengers(newPassengers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div className="w-full flex flex-col justify-around">
      <div className="flex justify-center pb-48 pt-10">
        <form onSubmit={handleSubmit} className="w-3/4 p-4">
          {passengersList.map((passenger, i) => {
            return (
              <div key={i} className="shadow-lg lg:max-w-screen-lg bg-white mt-6">
                <div className="shadow-lg p-4 text-gray-500 text-xl">
                  <ion-icon class="px-4" name="person-sharp"></ion-icon>
                  {passenger.demographicProfile.id === "3" ? "Adult" : "Child"} passenger details
                </div>
                <div className="mt-4 p-4 shadow-lg">
                  <div
                    className={`relative flex w-full my-3 md:text-black h-12 border border-gray-300 rounded focus-within:border-${styleSetting.primary}`}>
                    {passenger.demographicProfile.id === "3" ? (
                      <select
                        required
                        onChange={(e) => {
                          handleSelect(e, i);
                        }}
                        id={`select${i}`}
                        className="passlift w-full h-full bg-transparent focus:outline-none pt-4"
                        name="Title">
                        <option>Select</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                      </select>
                    ) : (
                      <select
                        required
                        onChange={(e) => {
                          handleSelect(e, i);
                        }}
                        id={`select${i}`}
                        className="passlift w-full h-full bg-transparent focus:outline-none pt-4"
                        name="Title">
                        <option>Select</option>
                        <option value="Mr">Mr</option>
                        <option value="Girl">Miss</option>
                      </select>
                    )}
                    <label
                      htmlFor={`select${i}`}
                      className="pointer-events-none absolute w-5/6 h-full bottom-0">
                      <span
                        style={{
                          transform: "translateY(-130%)",
                          color: "#2073e3",
                          fontSize: "14px",
                        }}
                        className={`passengerForm absolute text-base pl-1 bottom-0 text-${styleSetting.primary_Light}`}>
                        Title
                      </span>
                    </label>
                  </div>

                  <div
                    className={`relative flex w-full my-3 md:text-black h-12 border border-gray-300 rounded focus-within:border-${styleSetting.primary}`}>
                    <input
                      onChange={(e) => {
                        handleChange(e, i, passenger);
                      }}
                      id={`firstName${i}`}
                      className="passlift w-full h-full bg-transparent focus:outline-none pt-6 text-2xl"
                      type="text"
                      name="first name"
                      value={capitalizeFirstLetter(passengers[i][`firstName${i}`])}
                      required
                    />

                    <label
                      htmlFor={`firstName${i}`}
                      className="pointer-events-none absolute w-5/6 h-full bottom-0">
                      <span
                        style={{
                          transition: "all 0.3s ease",
                        }}
                        className={`passengerForm absolute text-base bottom-0 text-${styleSetting.primary_Light}`}>
                        First name
                      </span>
                    </label>
                  </div>
                  <div
                    className={`relative flex w-full my-3 md:text-black h-12 border border-gray-300 rounded focus-within:border-${styleSetting.primary}`}>
                    <input
                      onChange={(e) => {
                        handleChange(e, i, passenger);
                      }}
                      id={`lastName${i}`}
                      className="passlift w-full h-full bg-transparent focus:outline-none pt-6 text-2xl"
                      type="text"
                      name="last name"
                      value={capitalizeFirstLetter(passengers[i][`lastName${i}`])}
                      required
                    />

                    <label
                      htmlFor={`lastName${i}`}
                      className="pointer-events-none absolute w-5/6 h-full bottom-0">
                      <span
                        style={{
                          transition: "all 0.3s ease",
                        }}
                        className={`passengerForm absolute text-base bottom-0 text-${styleSetting.primary_Light}`}>
                        Last name
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="bg-white mt-6">
            <div className="shadow-lg p-4 text-gray-500 text-xl">Contact details</div>
            <div className="p-4 mt-4">
              <div
                className={`relative flex w-full my-3 md:text-black h-12 border border-gray-300 rounded focus-within:border-${styleSetting.primary}`}>
                <select className="w-full text-xl pt-5" name="mainContact" id="mainContactId" required>
                  <option value="">select a passenger</option>
                  {passengers
                    .filter((passenger) => Object.values(passenger).includes("adult"))
                    .map((adult, i) => {
                      return (
                        <option key={i} value="">
                          {Object.values(adult)[0]} {Object.values(adult)[1]} {Object.values(adult)[2]}
                        </option>
                      );
                    })}
                </select>
                <label htmlFor="mainContactId" className="pointer-events-none absolute w-5/6 h-full bottom-0">
                  <span
                    style={{
                      transform: "translateY(-130%)",
                      color: "#2073e3",
                      fontSize: "14px",
                    }}
                    className={`passengerForm w-full pl-1 absolute bottom-0 text-${styleSetting.primary_Light}`}>
                    Main Contact for this trip
                  </span>
                </label>
              </div>
              <div
                className={`relative flex w-full my-3 md:text-black h-12 border border-gray-300 rounded focus-within:border-${styleSetting.primary}`}>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="emailId"
                  className="passlift w-full h-full bg-transparent focus:outline-none pt-6 text-2xl"
                  type="email"
                  name="email"
                  value={email}
                  required
                />

                <label htmlFor="emailId" className="pointer-events-none absolute w-5/6 h-full bottom-0">
                  <span
                    style={{
                      transition: "all 0.3s ease",
                    }}
                    className={`passengerForm absolute text-base bottom-0 text-${styleSetting.primary_Light}`}>
                    Email <i className="text-red-turkish">*</i>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ReservationFooter currentStep="passengerInfosCompleted" nextStep="confirmation" />
    </div>
  );
}
