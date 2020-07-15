import React from "react";
import { getLayoverTime, getTrainTime } from "../../actions";
import { useSelector } from "react-redux";

export default function Train({ train }) {
  const state = useSelector((state) => state);
  const styleSetting = state.styleSetting;
  return (
    <>
      <div className="flex flex-col border-b border-solid pb-4 md:pb-0 flex-1 md:border-0">
        {/* departure and arrival time */}
        <div className="flex justify-between">
          <span className="font-medium md:text-base">
            {getTrainTime(train.dateTimeDeparture)}
          </span>
          <span className="font-medium md:text-base self-end">
            {getTrainTime(train.dateTimeArrival)}
          </span>
        </div>
        {/* layover */}
        <span
          className={`absolute w-3/4 self-center text-${styleSetting.primary_Light} flex flex-col items-center text-xxs font-medium`}>
          {train.segmentsList.length <= 1
            ? "Direct"
            : train.segmentsList[0].arrivalStationId.description
                .default}
          <span
            className={`${
              train.segmentsList.length <= 1 ? "hidden" : "inline"
            }  w-3 h-3 rounded-full border bg-white z-10 border-black md:mt-px`}></span>
          <span
            className={`${
              train.segmentsList.length <= 1 ? "hidden" : "inline"
            }`}>
            {train.segmentsList.length <= 1
              ? ""
              : getLayoverTime(
                  train.journeyDuration,
                  train.segmentsList[0].duration,
                  train.segmentsList[1].duration
                )}
          </span>
        </span>

        <hr className="w-3/4 border-black self-center"></hr>

        {/* departure and arrival stations */}
        <div className="flex justify-between w-full">
          <span
            className={`block truncate w-1/3 font-semi-bold text-xxs2 md:text-xxs4 text-${styleSetting.primary_Light}`}>
            {train.departureStationId.description.default}
          </span>
          <span
            className={`block truncate w-1/3 font-semi-bold text-xxs2 text-right md:text-xxs4 text-${styleSetting.primary_Light}`}>
            {train.arrivalStationId.description.default}
          </span>
        </div>
      </div>
      {/* Trip duration */}
      <div className="md:items-baseline float-right md:clear-both md:mx-6">
        <span className="md:flex flex-col self-end">
          <span
            className={`text-xxs text-${styleSetting.primary_Light}`}>
            Trip Duration:
          </span>
          <span className="text-xxs2 md:text-center ">
            {` ${train.journeyDuration.split(":")[0]}h ${
              train.journeyDuration.split(":")[1]
            }m`}
          </span>
        </span>
      </div>
    </>
  );
}
