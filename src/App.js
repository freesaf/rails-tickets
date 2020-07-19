import React from "react";
import Header from "./components/Header";
import Home from "./components/Pages/Home";
import ReservationPage from "./components/Pages/ReservationPage";
import { Router, Match } from "@reach/router";

function App() {
  const styleSetting = {
    primary: "gray-800",
    primary_Light: "gray-500",
    primary_H: "gray-900",
    secondary: "red-turkish",
    info: "blue-600",
    warning: "yellow-300",
  };

  const navlinks = [
    {
      text: "Home",
      path: "/",
      icon: "ion-ios-home",
    },
    {
      text: "Plan and Book",
      path: "/book",
      icon: "ion-ios-check",
    },
  ];

  return (
    <div>
      <Match path="/reservation">
        {(props) =>
          props.match ? null : (
            <Header styleSetting={styleSetting} navlinks={navlinks} />
          )
        }
      </Match>
      <Router>
        <Home path="/" styleSetting={styleSetting} />
        <ReservationPage path="/reservation" />
      </Router>
    </div>
  );
}

export default App;
