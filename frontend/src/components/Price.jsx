import React from "react";

const Price = ({ price }) => (
  <div className="py-6">
    <p className="uppercase font-[700]">price:</p>
    <p className="text-2xl font-[700] my-2">
      {price?.currency?.symbol}
      {price?.amount}
    </p>
  </div>
);

export default Price;
