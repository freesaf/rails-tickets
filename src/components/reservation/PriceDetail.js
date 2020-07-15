import React from "react";
import { useSelector } from "react-redux";
import PriceComponent from "./PriceComponent";

export default function PriceDetail({ passengers }) {
  const currency = localStorage.getItem("currency");
  const state = useSelector((state) => state);
  const styleSetting = state.styleSetting;
  return (
    <div>
      <div
        className={`bg-${styleSetting.primary_Light} relative p-4`}>
        <span>
          <i class="ion-md-document" />
          <i class="ion-md-document" />
        </span>
        <span>Trip cost</span>
        <i
          className={`absolute top-5 right-5 ion-ios-close-circle text-${styleSetting.primary}`}
        />
      </div>
      <table className="px-4 py-6">
        <tbody>
          <tr>
            <th>
              {" "}
              {passengers.adultsCount} {passengers.adultText}{" "}
            </th>
            <td>
              <PriceComponent
                currency={currency}
                price={passengers.adultPrice}
              />
            </td>
          </tr>
          {passengers.childrenCount > 0 ? (
            <tr>
              <th>
                {" "}
                {passengers.adultsCount} {passengers.adultText}{" "}
              </th>
              <td>
                <PriceComponent
                  currency={currency}
                  price={passengers.adultPrice}
                />
              </td>
            </tr>
          ) : (
            ""
          )}
          <tr>
            <th className="italic underline">Taxes and fees</th>
            <td>
              {" "}
              <PriceComponent
                currency={currency}
                price={passengers.taxPrice}
              />{" "}
            </td>
          </tr>
          <tr>
            <th className="italic underline">Ticket service fee</th>
            <td>
              {" "}
              <PriceComponent
                currency={currency}
                price={passengers.feePrice}
              />{" "}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <th>
            Ticket price for {passengers.count}{" "}
            {passengers.count < 2 ? "passenger" : "passengers"}{" "}
          </th>
          <td>
            <PriceComponent
              currency={currency}
              price={passengers.totalprice}
            />{" "}
          </td>
        </tfoot>
      </table>
      <div className="flex">
        <button
          className={`text-white bg-${styleSetting.secondary} self-end p-4`}>
          close
        </button>
      </div>
    </div>
  );
}
