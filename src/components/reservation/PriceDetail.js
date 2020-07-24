import React from "react";
import { useSelector } from "react-redux";
import PriceComponent from "./PriceComponent";

export default function PriceDetail({ passengers, closeModal }) {
  const currency = localStorage.getItem("currency");
  const state = useSelector((state) => state);
  const styleSetting = state.styleSetting;
  return (
    <div>
      <div className={`bg-${styleSetting.primary_Light} relative p-4 text-xl`}>
        <span>
          <i className="ion-md-document" />
        </span>
        <span className="pl-2">Trip cost</span>
        <i
          onClick={closeModal}
          className={`absolute top-5 right-5 cursor-pointer ion-ios-close-circle text-${styleSetting.primary}`}
        />
      </div>
      <div className="px-4">
        <table className="text-left w-full">
          <tbody>
            <tr>
              <th>{`${passengers.adultsCount} ${passengers.adultText}`}</th>
              <td>
                <PriceComponent currency={currency} price={passengers.adultPrice} />
              </td>
            </tr>
            {passengers.childrenCount > 0 ? (
              <tr>
                <th>
                  {" "}
                  {passengers.childrenCount} {passengers.childrenText}{" "}
                </th>
                <td>
                  <PriceComponent currency={currency} price={passengers.childPrice} />
                </td>
              </tr>
            ) : (
              <tr></tr>
            )}
            <tr>
              <th className="italic underline">Taxes and fees</th>
              <td>
                {" "}
                <PriceComponent currency={currency} price={passengers.taxPrice} />{" "}
              </td>
            </tr>
            <tr>
              <th className="italic underline">Ticket service fee</th>
              <td>
                {" "}
                <PriceComponent currency={currency} price={passengers.feePrice} />{" "}
              </td>
            </tr>
          </tbody>
          <tfoot className="border-t-2">
            <tr>
              <th>
                Ticket price for {passengers.count} {passengers.count < 2 ? "passenger" : "passengers"}{" "}
              </th>
              <td>
                <PriceComponent showtotal={true} currency={currency} price={passengers.totalprice} />{" "}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex justify-center">
        <button
          onClick={closeModal}
          className={`text-white bg-${styleSetting.secondary} my-2 py-2 text-xl w-1/3`}>
          close
        </button>
      </div>
    </div>
  );
}
