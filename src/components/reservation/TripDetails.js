import React from "react";
import { useSelector } from "react-redux";
import { getLayoverTime, getTrainTime } from "../../actions";

export default function TripDetails({
  closeM,
  showPrices,
  tripPath,
  indx,
}) {
  const state = useSelector((state) => {
    return state;
  });
  const cities = state.stations.cities;
  // console.log(cities);
  const styleSetting = state.styleSetting;

  const getCityName = (id) => {
    let station = cities.find((station) => station._id === id);
    return station.city;
  };
  const getSegmentsTime = (segment) => {
    switch (segment) {
      case "segments1Departure":
        return getTrainTime(
          tripPath.segmentsList[0].dateTimeDeparture
        );
      case "segments1Arrival":
        return getTrainTime(tripPath.segmentsList[0].dateTimeArrival);
      case "segments2Departure":
        return getTrainTime(
          tripPath.segmentsList[1].dateTimeDeparture
        );
      case "segments2Arrival":
        return getTrainTime(tripPath.segmentsList[1].dateTimeArrival);

      default:
        break;
    }
  };
  return (
    <div className="h-screen md:h-auto my-4 overflow-y-auto md:w-full md:mt-0 md:shadow-lg md:z-0">
      {/* Head */}
      <div className="md:hidden">
        <div
          className={`bg-${styleSetting.lightBg} font-bold text-2xl flex w-full py-3`}>
          <div className="flex items-center w-full ">
            <ion-icon
              onClick={closeM}
              class="cursor-pointer"
              name="chevron-back"></ion-icon>
            <div className="flex justify-center w-full">
              <h3 className={`font-medium text-lg`}>Trip Details</h3>
            </div>
          </div>
        </div>
        <div className="bg-white font-normal text-xxs4 px-4 py-3 ">
          <span className="px-1">
            {getCityName(
              tripPath.segmentsList[0].departureStationId._id
            )}{" "}
          </span>
          to
          <span className="px-1">
            {tripPath.segmentsList.length >= 2
              ? getCityName(
                  tripPath.segmentsList[1].arrivalStationId._id
                )
              : getCityName(
                  tripPath.segmentsList[0].arrivalStationId._id
                )}{" "}
          </span>
          on
          <span className="pl-2">
            {tripPath.dateTimeDeparture.substring(0, 10)}{" "}
          </span>
        </div>
      </div>
      {/* Body */}
      <div className={`bg-${styleSetting.lightBg} p-4 md:bg-white`}>
        <div
          className={`bg-white py-3 text-xxs text-${styleSetting.primary_Lightplus} border border-solid border-gray-500 md:pt-0`}>
          <div className="bg-gray-800 text-white py-3 px-4 justify-between text-xxs2 font-medium hidden md:flex">
            <span>TRAIN N°</span>
            <span>FROM</span>
            <span>TO</span>
            <span>DURATION</span>
          </div>
          {/* SEGMENT */}
          <div className="md:flex float-left w-8/12">
            <div className="flex border-b border-solid md:border-0 px-4 py-3 w-150 md:min-w-1/2 justify-between">
              <div className="flex flex-col">
                <span>TRAIN NUMBER</span>
                <span
                  className={`text-${styleSetting.secondary} text-xxs4`}>
                  {tripPath.segmentsList[0].autocarTrainId}
                </span>
              </div>
            </div>
            <div className="flex border-b border-solid md:border-0 px-4 md:px-1 py-3 w-150 md:min-w-1/2 md:flex-col ">
              <div className="flex flex-col w-1/3">
                <span
                  className={`text-${styleSetting.primary_Lightplus} md:hidden `}>
                  DEPARTURE
                </span>
                <span className="text-black text-xxs2 font-light">
                  {getSegmentsTime("segments1Departure")}
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-${styleSetting.primary_Lightplus}`}>
                  {
                    tripPath.segmentsList[0].departureStationId
                      .description.default
                  }
                </span>
                <span className="text-black text-xxs4 font-light">
                  {getCityName(
                    tripPath.segmentsList[0].departureStationId._id
                  )}
                </span>
              </div>
            </div>
            <div className="flex border-b border-solid md:border-0 px-4 py-3 md:px-0 md:-ml-6 w-150 md:min-w-1/2 md:flex-col">
              <div className="flex flex-col w-1/3">
                <span
                  className={`text-${styleSetting.primary_Lightplus} md:hidden `}>
                  ARRIVAL
                </span>
                <span className="text-black text-xxs2 font-light">
                  {getSegmentsTime("segments1Arrival")}
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-${styleSetting.primary_Lightplus}`}>
                  {
                    tripPath.segmentsList[0].arrivalStationId
                      .description.default
                  }
                </span>
                <span className="text-black text-xxs4 font-light">
                  {getCityName(
                    tripPath.segmentsList[0].arrivalStationId._id
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col float-right pt-3 pr-4">
            <span>DURATION</span>
            <span className="text-black text-xxs4 font-light">
              {`${tripPath.segmentsList[0].duration.split(":")[0]}h ${
                tripPath.segmentsList[0].duration.split(":")[1]
              }m`}
            </span>
          </div>
          {/* LAYOVER */}

          {tripPath.segmentsList.length >= 2 ? (
            <div
              className={`clear-both flex justify-between items-center border border-dashed border-gray-800 border-l-0 border-r-0 bg-${styleSetting.lightBg} -mx-4 px-8 md:mx-0 md:px-4 py-3`}>
              <div className="flex flex-col">
                <span className="text-black text-base">Layover</span>
                <span
                  className={`text-${styleSetting.primary_Lightplus}`}>
                  {
                    tripPath.segmentsList[0].arrivalStationId
                      .description.default
                  }
                </span>
              </div>
              <div>
                <ion-icon
                  class="w-4 h-4 text-black align-text-bottom "
                  name="time-outline"></ion-icon>
                <span className="text-black text-xxs2 font-light pl-1">
                  {getLayoverTime(
                    tripPath.journeyDuration,
                    tripPath.segmentsList[0].duration,
                    tripPath.segmentsList[1].duration
                  )}
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* SEGMENT 2 */}
          {tripPath.segmentsList.length >= 2 ? (
            <>
              <div className="md:flex float-left w-8/12">
                <div className="flex border-b border-solid md:border-0 px-4 py-3 w-150 md:min-w-1/2 justify-between">
                  <div className="flex flex-col">
                    <span>TRAIN NUMBER</span>
                    <span
                      className={`text-${styleSetting.secondary} text-xxs4`}>
                      {tripPath.segmentsList[1].autocarTrainId}
                    </span>
                  </div>
                </div>
                <div className="flex border-b border-solid md:border-0 px-4 md:px-1 py-3 w-150 md:min-w-1/2 md:flex-col ">
                  <div className="flex flex-col w-1/3">
                    <span
                      className={`text-${styleSetting.primary_Lightplus} md:hidden `}>
                      DEPARTURE
                    </span>
                    <span className="text-black text-xxs2 font-light">
                      {getSegmentsTime("segments2Departure")}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-${styleSetting.primary_Lightplus}`}>
                      {
                        tripPath.segmentsList[1].departureStationId
                          .description.default
                      }
                    </span>
                    <span className="text-black text-xxs4 font-light">
                      {getCityName(
                        tripPath.segmentsList[1].departureStationId
                          ._id
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex border-b border-solid md:border-0 px-4 py-3 md:px-0 md:-ml-6 w-150 md:min-w-1/2 md:flex-col">
                  <div className="flex flex-col w-1/3">
                    <span
                      className={`text-${styleSetting.primary_Lightplus} md:hidden `}>
                      ARRIVAL
                    </span>
                    <span className="text-black text-xxs2 font-light">
                      {getSegmentsTime("segments2Arrival")}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-${styleSetting.primary_Lightplus}`}>
                      {
                        tripPath.segmentsList[1].arrivalStationId
                          .description.default
                      }
                    </span>
                    <span className="text-black text-xxs4 font-light">
                      {getCityName(
                        tripPath.segmentsList[1].arrivalStationId._id
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col float-right pt-3 pr-4">
                <span>DURATION</span>
                <span className="text-black text-xxs4 font-light">
                  {`${
                    tripPath.segmentsList[1].duration.split(":")[0]
                  }h ${
                    tripPath.segmentsList[1].duration.split(":")[1]
                  }m`}
                </span>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="px-4 clear-both md:border-t border-solid">
            <button
              onClick={showPrices}
              className={`bg-${styleSetting.secondary} text-white text-base w-full text-center mt-3 py-3`}>
              show prices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
