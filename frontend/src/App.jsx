import { useState } from "react";
import "./App.css";
import Header from "./layout/Header";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Error from "./pages/Error";




function App() {
  return (
    <>
    <Header> </Header>
    <Category></Category>
    <ProductDetails></ProductDetails>
    <Error></Error>
    </>
  );
}

export default App;
