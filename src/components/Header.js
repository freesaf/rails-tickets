import React, { useState } from "react";
import { Link } from "@reach/router";
import { EUR, USD, MAD, EN, FR } from "../actions/types";
import { selectCurrency, selectLanguage } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function Header({ navlinks, styleSetting }) {
  const [navOpen, setNavOpen] = useState(false);
  const state = useSelector((state) => {
    return state;
  });
  localStorage.setItem("currency", state.localisation.currency);
  const currency = localStorage.getItem("currency");
  const language = state.localisation.lang;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "currency") {
      dispatch(selectCurrency(e.target.value));
    } else {
      dispatch(selectLanguage(e.target.value));
    }
  };

  return (
    <>
      <div className="bg-gray-700 flex ">
        <div className="ml-auto mr-8 mt-1">
          <span>
            {currency === EUR ? (
              <ion-icon
                class={`text-${styleSetting.primary_Light} align-text-top`}
                name="logo-euro"></ion-icon>
            ) : currency === USD ? (
              <ion-icon
                class={`text-${styleSetting.primary_Light} align-text-top`}
                name="logo-usd"></ion-icon>
            ) : (
              MAD
            )}{" "}
          </span>
          <select
            value={currency}
            onChange={handleChange}
            className={`bg-gray-700 text-${styleSetting.primary_Light} hover:text-white cursor-pointer`}
            name="currency"
            id="">
            <option value={EUR}>EUR</option>
            <option value={USD}>USD</option>
            <option value={MAD}>MAD</option>
          </select>
          <ion-icon
            class={`text-${styleSetting.primary_Light} align-text-top border-l border-dotted ml-2 pl-1`}
            name="earth"></ion-icon>
          <select
            value={language}
            onChange={handleChange}
            className={`bg-gray-700 text-${styleSetting.primary_Light} hover:text-white cursor-pointer`}
            name="language"
            id="">
            <option value={EN}>English</option>
            <option value={FR}>Français</option>
          </select>
        </div>
      </div>
      <nav
        onMouseLeave={() => {
          setNavOpen(false);
        }}
        className={`sm:flex sm:justify-between bg-${styleSetting.primary} sm:items-center sm:px-4 sm:py-0`}>
        <div className="flex items-center justify-between px-4 py-3 sm:p-0">
          <div className="flex items-center ">
            <svg
              className="fill-current h-12 w-12"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 841.9 595.3">
              <g fill="#61DAFB">
                <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z" />
                <circle cx="420.9" cy="296.5" r="45.7" />
                <path d="M520.5 78.1z" />
              </g>
            </svg>
            <Link
              to="/"
              className="pl-10 -ml-10 z-10 font-semibold text-xl text-white tracking-tight">
              RAILS LINES
            </Link>
          </div>
          <div className="block sm:hidden">
            <button
              onClick={() => {
                setNavOpen(!navOpen);
              }}
              className={`flex items-center px-1 py-1 rounded text-white  hover:text-gray-400`}>
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d={
                    navOpen
                      ? "M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      : "M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`${
            navOpen
              ? `block pl-2 border-t-2 border-${styleSetting.secondary}`
              : "hidden"
          } px-2 pt-2 h-auto overflow-y pb-4 sm:flex sm:p-0`}>
          {navlinks.map((item) => {
            return (
              <Link
                key={item.text}
                className={`block border-b-2 border-${styleSetting.primary_H} sm:border-none sm:hover hover:border-b-2 sm:border-${styleSetting.secondary} uppercase mt-4 lg:inline-block lg:mt-0 font-semibold sm:p-4 sm:m-0 text-white sm:full-h sm:hover:bg-${styleSetting.primary_H}  mr-4`}
                to={item.path}>
                <i className={`mr-1 ${item.icon}`} />
                {item.text}
              </Link>
            );
          })}
        </div>
        {/* <BtnLogin
        className={`${
          navOpen ? "inline-block" : "hidden"
        } mt-4 sm:flex lg:inline-block p-2 mb-2 sm:mb-0 lg:mt-0 font-semibold border border-white hover:bg-${background}-300 text-${background}-100 hover:text-white mr-4`}
      /> */}
      </nav>
    </>
  );
}
