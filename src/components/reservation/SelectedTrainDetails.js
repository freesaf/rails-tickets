import React from "react";
import { getLayoverTime, getTrainTime } from "../../actions";
import { useSelector } from "react-redux";

export default function SelectedTrainDetails({ selectedTrain }) {
  const state = useSelector((state) => state);
  const styleSetting = state.styleSetting;
  const cities = state.stations.cities;

  const getCityName = (id) => {
    let station = cities.find((station) => station._id === id);
    return station.city;
  };
  const getSegmentsTime = (segment) => {
    switch (segment) {
      case "segments1Departure":
        return getTrainTime(
          selectedTrain.segmentsList[0].dateTimeDeparture
        );
      case "segments1Arrival":
        return getTrainTime(
          selectedTrain.segmentsList[0].dateTimeArrival
        );
      case "segments2Departure":
        return getTrainTime(
          selectedTrain.segmentsList[1].dateTimeDeparture
        );
      case "segments2Arrival":
        return getTrainTime(
          selectedTrain.segmentsList[0].dateTimeArrival
        );

      default:
        break;
    }
  };

  return (
    <>
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
                {selectedTrain.segmentsList[0].autocarTrainId}
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
                  selectedTrain.segmentsList[0].departureStationId
                    .description.default
                }
              </span>
              <span className="text-black text-xxs4 font-light">
                {getCityName(
                  selectedTrain.segmentsList[0].departureStationId._id
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
                  selectedTrain.segmentsList[0].arrivalStationId
                    .description.default
                }
              </span>
              <span className="text-black text-xxs4 font-light">
                {getCityName(
                  selectedTrain.segmentsList[0].arrivalStationId._id
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col float-right pt-3 pr-4">
          <span>DURATION</span>
          <span className="text-black text-xxs4 font-light">
            {`${
              selectedTrain.segmentsList[0].duration.split(":")[0]
            }h ${
              selectedTrain.segmentsList[0].duration.split(":")[1]
            }m`}
          </span>
        </div>
        {/* LAYOVER */}

        {selectedTrain.segmentsList.length >= 2 ? (
          <div
            className={`clear-both flex justify-between items-center border border-dashed border-gray-800 border-l-0 border-r-0 bg-${styleSetting.lightBg} -mx-4 px-8 md:mx-0 md:px-4 py-3`}>
            <div className="flex flex-col">
              <span className="text-black text-base">Layover</span>
              <span
                className={`text-${styleSetting.primary_Lightplus}`}>
                {
                  selectedTrain.segmentsList[0].arrivalStationId
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
                  selectedTrain.journeyDuration,
                  selectedTrain.segmentsList[0].duration,
                  selectedTrain.segmentsList[1].duration
                )}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* SEGMENT 2 */}
        {selectedTrain.segmentsList.length >= 2 ? (
          <>
            <div className="md:flex float-left w-8/12">
              <div className="flex border-b border-solid md:border-0 px-4 py-3 w-150 md:min-w-1/2 justify-between">
                <div className="flex flex-col">
                  <span>TRAIN NUMBER</span>
                  <span
                    className={`text-${styleSetting.secondary} text-xxs4`}>
                    {selectedTrain.segmentsList[1].autocarTrainId}
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
                      selectedTrain.segmentsList[1].departureStationId
                        .description.default
                    }
                  </span>
                  <span className="text-black text-xxs4 font-light">
                    {getCityName(
                      selectedTrain.segmentsList[1].departureStationId
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
                      selectedTrain.segmentsList[1].arrivalStationId
                        .description.default
                    }
                  </span>
                  <span className="text-black text-xxs4 font-light">
                    {getCityName(
                      selectedTrain.segmentsList[1].arrivalStationId
                        ._id
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col float-right pt-3 pr-4">
              <span>DURATION</span>
              <span className="text-black text-xxs4 font-light">
                {`${
                  selectedTrain.segmentsList[1].duration.split(":")[0]
                }h ${
                  selectedTrain.segmentsList[1].duration.split(":")[1]
                }m`}
              </span>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="clear-both"></div>
      </div>
    </>
  );
}
