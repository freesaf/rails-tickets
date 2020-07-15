import React from "react";
// import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
// import Loader from "../Loader";
import {
  // capitalizeFirstLetter,
  setReservationStepStatus,
  setCurrentReservationState,
} from "../../actions";
// import { useNavigate } from "@reach/router";

export default function PassengerDetails() {
  const state = useSelector((state) => state);
  const styleSetting = state.styleSetting;
  const dispatch = useDispatch();
  // const { register, handleSubmit, errors } = useForm();
  // const onSubmit = (data) => console.log(data);

  return (
    <div>
      <div className="flex justify-center">
        <form
        // onSubmit={handleSubmit(onSubmit)} className="w-1/2"
        >
          <select
            name="Title"
            // ref={register({ required: true })}
          >
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
          </select>
          <div
            className={`relative flex w-full md:text-black bg-white h-12 border border-gray-300 rounded focus-within:border-${styleSetting.primary}`}
            style={{
              boxShadow: "inset 0px 3px 3px rgb(0,0,0,0.3)",
            }}>
            <input
              id="fromId"
              className="lift w-full h-full bg-transparent focus:outline-none text-2xl font-medium"
              type="text"
              name="first name"
              // ref={register({ required: true, maxLength: 100 })}
            />

            <label
              htmlFor="fromId"
              className="pointer-events-none absolute w-5/6 h-full bottom-0">
              <span
                style={{
                  transition: "all 0.3s ease",
                  bottom: "24px",
                }}
                className={`fromLift absolute text-xl font-medium text-${styleSetting.primary_Light}`}>
                First name
              </span>
            </label>
          </div>
          <input
            type="text"
            placeholder="Last name"
            name="Last name"
            // ref={register({ required: true, maxLength: 100 })}
          />
          <input
            type="text"
            placeholder="Email"
            name="Email"
            // ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
          <input
            type="tel"
            placeholder="Mobile number"
            name="Mobile number"
            // ref={register({
            //   required: true,
            //   minLength: 6,
            //   maxLength: 12,
            // })}
          />

          <input type="submit" />
        </form>
      </div>
      <div
        className={`fixed flex justify-evenly items-center bottom-0 text-white min-h-1/4s w-full bg-${styleSetting.primary}`}>
        <button
          onClick={() => {
            dispatch(
              setReservationStepStatus({
                stepName: "passengerInfosCompleted",
                status: true,
              })
            );
            dispatch(setCurrentReservationState("confirmation"));
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
