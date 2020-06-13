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
          className={`bg-${styleSetting.secondary} text-center h-10 text-white font-bold`}>
          {message.title}
        </h3>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="h-48">{message.body}</div>
      </div>
      <div className="flex justify-around items-center">
        {/* Accept
      open passenger selection modal */}
        <button
          onClick={() => {
            closePopup();
            onClickOptions.option1Click();
          }}
          className={`bg-${styleSetting.primary} px-2 text-white font-black`}>
          {message.option1text}
        </button>

        {/*Decline
        open dates selection modal */}
        <button
          onClick={() => {
            closePopup();
            onClickOptions.option2Click();
          }}
          className={`bg-${styleSetting.secondary} px-2 text-white font-black`}>
          {message.option2text}
        </button>
      </div>
    </div>
  );
}
