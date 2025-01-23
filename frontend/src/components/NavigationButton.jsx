import React from "react";

const NavigationButton = ({ onClick, children }) => (
  <button onClick={onClick} className="focus:outline-none">
    {children}
  </button>
);

export default NavigationButton;
