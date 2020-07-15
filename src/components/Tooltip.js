import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Tooltip({ content, classs }) {
  const state = useSelector((state) => {
    return state;
  });
  const styleSetting = state.styleSetting;
  const [showTip, setshowTip] = useState(false);
  return (
    <div className={`relative inline-block ${classs}`}>
      <ion-icon
        onClick={() => {
          setshowTip(!showTip);
          setTimeout(() => {
            setshowTip(false);
          }, 3000);
        }}
        class="text-xl text-black"
        name="information-circle-sharp"></ion-icon>
      <span
        className={`tooltiptext transition-all duration-300 ease-out left-12 -ml-4 bottom-0 w-40 bg-${
          styleSetting.primary
        } text-white text-center p-1 absolute z-10 rounded-lg ${
          showTip ? "visible" : "invisible"
        } `}>
        {content}{" "}
      </span>
    </div>
  );
}
