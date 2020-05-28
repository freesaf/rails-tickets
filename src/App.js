import React from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Home from "./components/Pages/Home";
import { Router } from "@reach/router";

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
      icon: "ion-ios-person",
    },
  ];

  return (
    <div>
      <Header styleSetting={styleSetting} navlinks={navlinks} />
      <Router>
        <Home path="/" styleSetting={styleSetting} />
        <Modal path="/modal" />
      </Router>
    </div>
  );
}

export default App;
