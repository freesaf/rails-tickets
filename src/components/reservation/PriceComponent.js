import React from "react";
import { getConvertedPrice } from "../../actions";

export default function PriceComponent({ currency, price }) {
  const convertedPrice = getConvertedPrice(currency, price);

  return (
    <>
      <span className="text-xxs align-top">{currency} </span>
      <span className="text-lg">{convertedPrice.split(".")[0]}</span>
      <span className="text-xxs align-top ">{`.${
        convertedPrice.split(".")[1]
      }`}</span>
    </>
  );
}
