import React from "react";
import PriceComponent from "./PriceComponent";
import Tooltip from "../Tooltip";
import { useSelector } from "react-redux";

export default function TripPrices({ tripPath, currency, selectTrain, i }) {
  const prices = tripPath.tripPrices;
  const state = useSelector((state) => state);
  const styleSetting = state.styleSetting;
  return (
    <div className="shadow-lg bg-white text-xxs2 w-full flex ">
      <div
        style={{
          minWidth: "1.5rem",
        }}
        className="category-title relative md:hidden">
        <span
          style={{
            msWritingMode: "vertical-rl",
            writingMode: "vertical-rl",
            WebkitWritingMode: "vertical-rl",
          }}
          className=" uppercase bg-gray-400 inline-block h-full text-center absolute transform rotate-180 text-base font-medium leading-7">
          Standard class
        </span>
      </div>
      <div className=" bg-gray-300 md:bg-white w-full md:flex justify-around ">
        <div className="w-full md:max-w-screen-lg md:px-6 md:flex justify-around md:py-3">
          {/* NON FLEX */}
          <div className="  md:w-1/3 p-3 md:p-0 flex-1 border-l-8 border-solid border-orange-400 md:border md:border-gray-200 relative">
            <div className="details-part md:w-full md:min-h-81">
              <Tooltip
                classs={"md:hidden mx-auto"}
                content={"click on the desired price to select your train"}
              />
              <div className="text-orange-400 text-xxs4 font-medium md:border-l-4 border-solid border-orange-400 md:py-4 md:px-2 md:bg-gray-300 md:h-16">
                Non Flex{" "}
              </div>

              <ul className="text-xxs2 xs:w-40 sm:w-56 md:w-full font-light md:font-normal">
                <li className="inline md:block md:border-b w-full md:px-3 md:py-2">
                  <ion-icon
                    class="hidden md:inline-block text-red-600 text-xxs4 pr-1 align-text-bottom"
                    name="close-circle-sharp"></ion-icon>
                  Non changeable
                </li>
                <span className="md:hidden">, </span>
                <li className="inline md:block md:border-b w-full md:px-3 md:py-2">
                  <ion-icon
                    class="hidden md:inline-block text-red-600 text-xxs4 pr-1 align-text-bottom"
                    name="close-circle-sharp"></ion-icon>
                  Non refundable
                </li>
              </ul>
            </div>
            <div
              onClick={() => {
                const price = prices.filter((price) => price._id === 3)[0].data;
                selectTrain(tripPath, price);
              }}
              className={`hidden md:block px-2 py-3 text-white bg-red-800 text-center ${
                prices.filter((price) => price._id === 3)[0].data
                  ? `pointer-events-auto hover:bg-${styleSetting.secondary} cursor-pointer`
                  : "pointer-events-none bg-gray-300 cursor-not-allowed"
              }`}>
              {" "}
              Select this Train
            </div>
            <div
              onClick={() => {
                const price = prices.filter((price) => price._id === 3)[0].data;
                selectTrain(tripPath, price);
              }}
              className={`text-orange-400 border-2 border-solid rounded-full border-orange-400 pt-1 px-2 mr-2 font-bold whitespace-no-wrap absolute top-41 md:top-1 right-1 md:mt-3 ${
                prices.filter((price) => price._id === 3)[0].data
                  ? "pointer-events-auto cursor-pointer md:cursor-default md:pointer-events-none"
                  : "pointer-events-none"
              }`}>
              {prices.filter((price) => price._id === 3)[0].data ? (
                <PriceComponent
                  price={prices.filter((price) => price._id === 3)[0].data.price}
                  currency={currency}
                />
              ) : (
                "Not availbale"
              )}
            </div>
          </div>
          <hr className="w-full border border-gray-400 md:hidden" />
          {/* Semi FLEX */}
          <div className="md:mx-4 md:w-1/3 p-3 md:p-0 flex-1 border-l-8 border-solid border-teal-400 md:border md:border-gray-200 relative">
            <div className="details-part md:w-full md:min-h-81">
              <div className="text-teal-400 text-xxs4 font-medium md:border-l-4 border-solid border-teal-400 md:py-4 md:px-2 md:bg-gray-300 md:h-16 md:flex flex-col">
                <span>Semi Flex</span>

                <span
                  style={{
                    width: "fit-content",
                  }}
                  className="rounded-lg text-white bg-teal-400 p-1 text-xxs font-medium ml-3 md:block  md:ml-0">
                  Recommended
                </span>
              </div>
              <ul className="text-xxs2 xs:w-40 sm:w-56 md:w-full font-light md:font-normal">
                <li className="inline md:block md:border-b w-full md:px-3 md:py-2">
                  <ion-icon
                    class="hidden md:inline-block text-green-600 text-xxs4 pr-1 align-text-bottom"
                    name="checkmark-circle-sharp"></ion-icon>
                  1 Free change{" "}
                </li>
                <span className="md:hidden">, </span>
                <li className="inline md:block md:border-b w-full md:px-3 md:py-2">
                  <ion-icon
                    class="hidden md:inline-block text-green-600 text-xxs4 pr-1 align-text-bottom"
                    name="checkmark-circle-sharp"></ion-icon>
                  50% refund (up to 24 hours)
                </li>
              </ul>
            </div>
            <div
              onClick={() => {
                const price = prices.filter((price) => price._id === 2)[0].data;
                selectTrain(tripPath, price);
              }}
              className={`hidden md:block px-2 py-3 text-white bg-red-800 text-center hover:bg-${styleSetting.secondary} cursor-pointer`}>
              Select this Train
            </div>
            <div
              onClick={() => {
                const price = prices.filter((price) => price._id === 2)[0].data;
                selectTrain(tripPath, price);
              }}
              className="text-teal-400 border-2 border-solid rounded-full border-teal-400 pt-1 px-2 mr-2 pointer-events-auto cursor-pointer md:cursor-default md:pointer-events-none font-bold whitespace-no-wrap absolute top-1 right-1">
              {prices[1].data ? (
                <PriceComponent
                  price={prices.filter((price) => price._id === 2)[0].data.price}
                  currency={currency}
                />
              ) : (
                "Not availbale"
              )}
            </div>
          </div>
          <hr className="w-full border border-gray-400 md:hidden" />

          {/* FLEX */}
          <div className="  md:w-1/3 p-3 md:p-0 flex-1 justify-between border-l-8 border-solid border-indigo-400 md:border md:border-gray-300 relative">
            <div className="details-part md:w-full md:min-h-81">
              <div className="text-indigo-400 text-xxs4 font-medium md:border-l-4 border-solid border-indigo-400 md:py-4 md:px-2 md:bg-gray-300 md:h-16">
                Flex
              </div>
              <ul className="text-xxs2 xs:w-40 sm:w-56 md:w-full font-light md:font-normal">
                <li className="inline md:block md:border-b w-full md:px-3 md:py-2">
                  <ion-icon
                    class="hidden md:inline-block text-green-600 text-xxs4 pr-1 align-text-bottom"
                    name="checkmark-circle-sharp"></ion-icon>
                  Unlimited changes{" "}
                </li>
                <span className="md:hidden">, </span>
                <li className="inline md:block md:border-b w-full md:px-3 md:py-2">
                  <ion-icon
                    class="hidden md:inline-block text-green-600 text-xxs4 pr-1 align-text-bottom"
                    name="checkmark-circle-sharp"></ion-icon>
                  Full refund (up to 24 hours)
                </li>
                <span className="md:hidden">, </span>
                <li className="inline md:block md:border-b w-full md:px-3 md:py-2">
                  <ion-icon
                    class="hidden md:inline-block text-green-600 text-xxs4 pr-1 align-text-bottom"
                    name="checkmark-circle-sharp"></ion-icon>
                  80% refund (up to 6 hours)
                </li>
              </ul>
            </div>
            <div
              onClick={() => {
                const price = prices.filter((price) => price._id === 1)[0].data;
                selectTrain(tripPath, price);
              }}
              className={`hidden md:block px-2 py-3 text-white bg-red-800 text-center hover:bg-${styleSetting.secondary} cursor-pointer`}>
              Select this Train
            </div>
            <div
              onClick={() => {
                const price = prices.filter((price) => price._id === 1)[0].data;
                selectTrain(tripPath, price);
              }}
              className="text-indigo-400 border-2 border-solid rounded-full border-indigo-400 pt-1 px-2 mr-2 pointer-events-auto cursor-pointer md:cursor-default md:pointer-events-none font-bold whitespace-no-wrap absolute top-1 right-1">
              {prices[2].data ? (
                <PriceComponent
                  price={prices.filter((price) => price._id === 1)[0].data.price}
                  currency={currency}
                />
              ) : (
                "Not availbale"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
