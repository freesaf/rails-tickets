import React from "react";
import { useSelector } from "react-redux";

export default function TwoOptionAlert({
  onClickOptions,
  message,
  closePopup,
}) {
  const state = useSelector((state) => {
    return state;
  });
  const styleSetting = state.styleSetting;

  return (
    <div className="pb-4">
      <div>
        <h3
          className={`bg-${styleSetting.secondary} text-center py-3 text-white font-bold`}>
          {message.title}
        </h3>
      </div>
      <div className="flex flex-col items-center">
        <div className="h-auto">{message.body}</div>
      </div>
      <div className="flex justify-around items-center pt-3">
        {/* Accept
      open passenger selection modal */}
        <button
          onClick={() => {
            closePopup();
            onClickOptions.option1Click();
          }}
          className={`bg-${styleSetting.primary} ${
            message.option1text ? "" : "hidden"
          } px-3 py-2 text-white font-black`}>
          {message.option1text}
        </button>

        {/*Decline
        open dates selection modal */}
        <button
          onClick={() => {
            closePopup();
            onClickOptions.option2Click();
          }}
          className={`bg-${styleSetting.secondary} ${
            message.option2text ? "" : "hidden"
          } px-3 py-2 text-white font-black`}>
          {message.option2text}
        </button>
      </div>
    </div>
  );
}
