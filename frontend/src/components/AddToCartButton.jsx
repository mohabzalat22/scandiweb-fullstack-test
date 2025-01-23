import React from "react";

const AddToCartButton = ({ isDisabled, onClick }) => (
  <button
    data-testid="add-to-cart"
    disabled={isDisabled}
    onClick={onClick}
    className={`w-full py-4 text-center ${
      isDisabled ? "bg-green-300" : "bg-secondary"
    } text-white`}
  >
    ADD TO CART
  </button>
);

export default AddToCartButton;
