import React from "react";
import ProductCard from "./../components/ProductCard";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/query";
import { useSelector } from "react-redux"; // Import useSelector
import Header from "../layout/Header";
import Overlay from "../components/Overlay";
import Loading from '../pages/Loading';

const Category = () => {
  const category = useSelector((state) => state.category.value);
  const showCartMenu = useSelector((state) => state.menu.value);
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { category }, // Pass the category as a variable to the query
  });

  const products = data?.products || [];

  if(loading){
    return <Loading/>
  }

  return (
    <>
      <Header />
      {showCartMenu && <Overlay />}
      <div className="container mx-auto mb-28 xl:px-24 relative mt-20">
        <h2 className="uppercase text-cat text-primary leading-extra">
          {category}
        </h2>
        <div className="grid lg:grid-cols-3 mt-24 gap-x-10 gap-y-28">
          {products.map((el) => (
            <ProductCard key={el.id} product={el} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
