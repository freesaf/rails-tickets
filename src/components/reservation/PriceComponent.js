import React from "react";
import { getConvertedPrice } from "../../actions";

export default function PriceComponent({ currency, price, showtotal = false }) {
  const convertedPrice = getConvertedPrice(currency, price);

  if (showtotal) {
    return (
      <>
        <span className="text-3xl">{currency} </span>
        <span className="text-3xl pl-2">{convertedPrice.split(".")[0]}</span>
        <span className="text-3xl">{`,${convertedPrice.split(".")[1]}`}</span>
      </>
    );
  } else {
    return (
      <>
        <span className={`text-xxs align-top`}>{currency} </span>
        <span className="text-lg">{convertedPrice.split(".")[0]}</span>
        <span className="text-xxs align-top ">{`.${convertedPrice.split(".")[1]}`}</span>
      </>
    );
  }
}
