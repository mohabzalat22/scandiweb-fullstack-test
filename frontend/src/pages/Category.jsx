import React from "react";
import ProductCard from "./../components/ProductCard";

const Category = () => {
  return (
    <>
      <div className="container mx-auto mb-28 xl:px-24 relative mt-20">
        <h2 className="uppercase text-cat text-primary leading-extra">women</h2>
        <div className="grid lg:grid-cols-3 mt-24 gap-x-10 gap-y-28">
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>

          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
        </div>
      </div>
    </>
  );
};

export default Category;
