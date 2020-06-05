import React from "react";
import SearchForm from "../SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { setTicketType, setReturnDate } from "../../actions";
import { ROUND_TRIP, ONE_WAY } from "../../actions/types";

export default function Home() {
  // const Request = {
  //   origin: "190",
  //   destination: "200",
  //   originDate: "2020-07-16T11:28:15+00:00",
  //   intervalTime: "",
  //   adulte: 1,
  //   kids: 0,
  //   comfort: 2,
  //   intervalTime_originDate: {
  //     end: "12:00",
  //     start: "06:01",
  //     title: "Matinée",
  //     value: 1,
  //     disabled: true,
  //   },
  //   intervalTime_destinationDate: {
  //     end: "12:00",
  //     start: "06:01",
  //     title: "Matinée",
  //     value: 1,
  //     disabled: false,
  //   },
  //   destinationDate: null,
  //   _csrf: null,
  //   roundtrip: false,
  // };

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const styleSetting = state.styleSetting;
  const ticketType = state.tickets.ticketType;

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
      <div className="w-full px-4 pt-4 lg:max-w-screen-lg">
        <div className="hidden py-4 text-center text-4xl text-white md:block">
          {getGreetingMessage()}, <br></br> Where do you want to
          expolre next?
        </div>
        <div className="bg-white md:bg-turkishtransp md:text-white md:pb-4">
          <div className="p-4">
            <label
              className={`${
                ticketType === ROUND_TRIP
                  ? `border-b-3 border-${styleSetting.secondary}`
                  : "border-none"
              } pb-2 mr-2 cursor-pointer`}
              htmlFor="round">
              <input
                className="hidden align-middle md:inline"
                onChange={() => {
                  dispatch(setTicketType(ROUND_TRIP));
                }}
                name="Round trip"
                id="round"
                type="radio"
                value={ROUND_TRIP}
                checked={ticketType === ROUND_TRIP}
              />
              <span className="mx-2 font-medium">Round trip</span>
            </label>

            <label
              className={`${
                ticketType === ONE_WAY
                  ? `border-b-3 border-${styleSetting.secondary}`
                  : "border-none"
              } pb-2 cursor-pointer`}
              htmlFor="onew">
              <input
                className="hidden align-middle md:inline"
                onChange={() => {
                  dispatch(setTicketType(ONE_WAY));
                  dispatch(setReturnDate(null));
                }}
                name="One way"
                id="onew"
                type="radio"
                value={ONE_WAY}
                checked={ticketType === ONE_WAY}
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
