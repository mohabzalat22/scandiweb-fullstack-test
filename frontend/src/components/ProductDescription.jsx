import React from "react";
import parse from "html-react-parser";

const ProductDescription = ({ description }) => (
  <div data-testid="product-description" className="py-10 description">
    {parse(description)}
  </div>
);

export default ProductDescription;
