import React from "react";
import * as spinner from "../img/loader.gif";

export default function Loader() {
  return (
    <div className="min-h-3/4s w-full flex justify-center items-center">
      <img src={spinner} alt="Loading" />
    </div>
  );
}
