import React from "react";
import { useSelector } from "react-redux";

export default function TrainDetails({ showPrices }) {
  const state = useSelector((state) => {
    return state;
  });
  const styleSetting = state.styleSetting;
  return (
    <div>
      <div
        className={`bg-${styleSetting.lightBg} font-bold text-2xl flex w-full py-3`}>
        <div className="flex items-center w-full ">
          <ion-icon
            // onClick={closeDatePicker}
            class="cursor-pointer"
            name="chevron-back"></ion-icon>
          <div className="flex justify-center w-full">
            <h3 className={`font-medium text-lg`}>Select Train</h3>
          </div>
        </div>
      </div>
      <div className="bg-white font-normal text-xxs4 px-4 py-3 ">
        <span>Casa</span>
        to
        <span>Ouarzazte</span>
        on
        <span>{new Date().toString()} </span>
      </div>
      <div className={`bg-${styleSetting.lightBg} p-4`}>
        <div
          className={`bg-white shadow px-4 py-2 text-xxs text-${styleSetting.primary_Lightplus} border border-solid border-gray-500`}>
          <div className="flex border-b border-solid py-3 justify-between">
            <div className="flex flex-col">
              <span>TRAIN NUMBER</span>
              <span
                className={`text-${styleSetting.secondary} text-xxs4`}>
                5432
              </span>
            </div>
            <div className="flex flex-col">
              <span>DURATION</span>
              <span className="text-black text-xxs4 font-light">
                1h 45m
              </span>
            </div>
          </div>
          <div className="flex border-b border-solid py-3 ">
            <div className="flex flex-col w-40">
              <span
                className={`text-${styleSetting.primary_Lightplus}`}>
                DEPARTURE
              </span>
              <span className="text-black text-xxs4 font-light">
                05:00
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-${styleSetting.primary_Lightplus}`}>
                CASA VOYAGEURS STATION
              </span>
              <span className="text-black text-xxs4 font-light">
                Casablanca
              </span>
            </div>
          </div>
          <div className="flex border-b border-solid py-3 ">
            <div className="flex flex-col w-40">
              <span
                className={`text-${styleSetting.primary_Lightplus}`}>
                ARRIVAL
              </span>
              <span className="text-black text-xxs2 font-light">
                10:45
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-${styleSetting.primary_Lightplus}`}>
                MARRAKECH STATION
              </span>
              <span className="text-black text-xxs4 font-light">
                Marrakech
              </span>
            </div>
          </div>
          <div
            className={`flex justify-between items-center border border-dashed border-gray-800 border-l-0 border-r-0 bg-${styleSetting.lightBg} -mx-4 px-4 py-3`}>
            <div className="flex flex-col">
              <span className="text-black text-base">Layover</span>
              <span
                className={`text-${styleSetting.primary_Lightplus}`}>
                MARRAKECH STATION
              </span>
            </div>
            <div>
              <ion-icon>watch</ion-icon>
              <span className="text-black text-xxs2 font-light">
                1h 15m
              </span>
            </div>
          </div>
          <div className="flex border-b border-solid py-3 ">
            <div className="flex flex-col w-40">
              <span
                className={`text-${styleSetting.primary_Lightplus}`}>
                DEPARTURE
              </span>
              <span className="text-black text-xxs2 font-light">
                12:00
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-${styleSetting.primary_Lightplus}`}>
                MARRAKECH STATION
              </span>
              <span className="text-black text-xxs4 font-light">
                Marrakech
              </span>
            </div>
          </div>
          <div className="flex border-b border-solid py-3 ">
            <div className="flex flex-col w-40">
              <span
                className={`text-${styleSetting.primary_Lightplus}`}>
                ARRIVAL
              </span>
              <span className="text-black text-xxs2 font-light">
                16:00
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-${styleSetting.primary_Lightplus}`}>
                OUARZAZATE STATION
              </span>
              <span className="text-black text-xxs4 font-light">
                Ouarzazte
              </span>
            </div>
          </div>
          <button
            onClick={showPrices}
            className={`bg-${styleSetting.secondary} text-white text-base w-full text-center py-3`}>
            show prices
          </button>
        </div>
      </div>
    </div>
  );
}
