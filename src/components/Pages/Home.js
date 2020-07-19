import React, { useEffect } from "react";
import SearchForm from "../SearchForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setTicketType,
  setReturnDate,
  resetState,
} from "../../actions";
import Loader from "../Loader";

export default function Home() {
  const state = useSelector((state) => {
    return state;
  });
  const roundtrip = state.tickets.roundtrip;
  useEffect(() => {
    sessionStorage.setItem("roundtrip", roundtrip);
    console.log("ticket updated");
  }, [roundtrip]);
  const dispatch = useDispatch();
  const styleSetting = state.styleSetting;
  const isLoading = state.loader;

  const getGreetingMessage = () => {
    if (new Date().getHours() < 12 && new Date().getHours() > 5) {
      return "Good Morning";
    } else if (
      new Date().getHours() >= 12 &&
      new Date().getHours() < 18
    ) {
      return "Good Afternoon";
    } else if (
      new Date().getHours() >= 18 &&
      new Date().getHours() <= 23
    ) {
      return "Good Evenning";
    } else if (
      new Date().getHours() >= 0 &&
      new Date().getHours() <= 5
    ) {
      return "Good Night";
    }
  };
  return (
    <div
      className="bg-fixed min-h-3/4s flex justify-around"
      style={{
        backgroundImage:
          "url(https://turkishairlines.ssl.cdn.sdlmedia.com/636866809060120078CY.jpg)",
      }}>
      <div
        className={
          isLoading
            ? "block absolute z-10 bg-turkishtransp w-full h-screen"
            : "hidden"
        }>
        <Loader />{" "}
      </div>
      <div className="w-full px-4 pt-4 lg:max-w-screen-lg">
        <div className="hidden py-4 text-center text-4xl text-white md:block">
          {getGreetingMessage()}, <br></br> Where do you want to
          expolre next?
        </div>
        <div className="bg-white md:bg-turkishtransp md:text-white md:pb-4">
          <div className="p-4">
            <label
              className={`${
                roundtrip
                  ? `border-b-3 border-${styleSetting.secondary}`
                  : "border-none"
              } pb-2 mr-2 cursor-pointer`}
              htmlFor="round">
              <input
                className="hidden align-middle md:inline"
                onChange={() => {
                  dispatch(setTicketType(true));
                }}
                name="Round trip"
                id="round"
                type="radio"
                value={roundtrip}
                checked={roundtrip}
              />
              <span className="mx-2 font-medium">Round trip</span>
            </label>

            <label
              className={`${
                !roundtrip
                  ? `border-b-3 border-${styleSetting.secondary}`
                  : "border-none"
              } pb-2 cursor-pointer`}
              htmlFor="onew">
              <input
                className="hidden align-middle md:inline"
                onChange={() => {
                  dispatch(setTicketType(false));
                  dispatch(setReturnDate(null));
                }}
                name="One way"
                id="onew"
                type="radio"
                value={!roundtrip}
                checked={!roundtrip}
              />
              <span className="mx-2 font-medium">One way</span>
            </label>
          </div>
          <SearchForm />
        </div>
      </div>
    </div>
  );
}
