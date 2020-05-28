import React, { useEffect } from "react";
import SearchForm from "../SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { setTicketType, setReturnDate } from "../../actions";
import { ROUND_TRIP, ONE_WAY } from "../../actions/types";

export default function Home({ styleSetting }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const ticketType = state.tickets.ticketType;

  return (
    <div
      className="bg-fixed min-h-3/4s"
      style={{
        backgroundImage:
          "url(https://turkishairlines.ssl.cdn.sdlmedia.com/636866809060120078CY.jpg)",
      }}>
      <div className="px-4">
        <div className="bg-white">
          <div className="p-4">
            <span
              onClick={() => {
                dispatch(setTicketType(ROUND_TRIP));
              }}
              role="button"
              className={`${
                ticketType === ROUND_TRIP
                  ? `border-b-4 border-${styleSetting.secondary}`
                  : "border-none"
              } mx-4 font-semibold`}
              type="checkbox">
              Round trip
            </span>
            <span
              onClick={() => {
                dispatch(setTicketType(ONE_WAY));
                dispatch(setReturnDate(null));
              }}
              role="button"
              className={`${
                ticketType === ONE_WAY
                  ? `border-b-4 border-${styleSetting.secondary}`
                  : "border-none"
              } mx-4 font-semibold`}
              type="checkbox">
              One way
            </span>
          </div>
          <SearchForm styleSetting={styleSetting} />
        </div>
      </div>
    </div>
  );
}
