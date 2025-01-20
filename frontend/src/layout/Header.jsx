import React, { useEffect, useState } from "react";
import BrandIcon from "./../assets/icons/BrandIcon";
import CartIcon from "./../assets/icons/CartIcon";
import { GET_CATEGORIES } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../rtk/slices/categorySlice";
import { setShowMenu } from "../rtk/slices/menuSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const dispatch = useDispatch();
  let categories = ["all"];
  if (data) {
    categories = [...categories, ...data.categories.map((el) => el.name)];
  }

  let category = useSelector((state) => state.category.value);
  let showCartMenu = useSelector((state) => state.menu.value);  

  // Initialize cartItems from localStorage
  let [cartItems, setCartItems] = useState(() => {
    let localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  });

  // Function to update cartItems from localStorage
  const updateCartItems = () => {
    let localStorageCart = localStorage.getItem("cart");
    setCartItems(localStorageCart ? JSON.parse(localStorageCart) : []);
  };

  useEffect(() => {
    const handleCartChange = () => {
      dispatch(setShowMenu(true));
      updateCartItems(); // Update cartItems when the custom event is triggered
    };

    // Add a custom event listener for cart changes in the same tab
    window.addEventListener("cartUpdated", handleCartChange);

    return () => {
      window.removeEventListener("cartUpdated", handleCartChange);
    };
  }, []);

  const generateUniqueId = (item) => {
    // Extract the selected attribute values
    const selectedValues = Object.values(item.selectedAttributes).map(
      (attr) => {
        // If the attribute is an object, use its `value` property
        return typeof attr === "object" ? attr.value : attr;
      }
    );

    // Combine the item ID and selected attribute values
    return `${item.id}-${selectedValues.join("-")}`;
  };

  // Function to increase the quantity of an item in the cart
  const increaseQuantity = (item) => {
    const uniqueId = generateUniqueId(item);
    const updatedCart = cartItems.map((cartItem) =>
      generateUniqueId(cartItem) === uniqueId
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("productQuantityUpdated")); // Trigger the custom event
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (item) => {
    const uniqueId = generateUniqueId(item);
    const updatedCart = cartItems
      .map((cartItem) =>
        generateUniqueId(cartItem) === uniqueId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
      .filter((cartItem) => cartItem.quantity > 0); // Remove the item if quantity is 0
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("productQuantityUpdated")); // Trigger the custom event
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + item.quantity * parseFloat(item.prices[0]?.amount || 0),
      0
    ).toFixed(2);
  };

  useEffect(() => {
    if(cartItems.length == 0){
      dispatch(setShowMenu(false));
    }
  }, [cartItems]);

  return (
    <>
      <header className="pt-6 relative z-50 bg-white">
        <div className="container mx-auto grid grid-cols-3 gap-1  xl:px-24">
          {/* categories */}
          <ul className="flex col-span-1 cursor-pointer">
            {categories.map((el) =>
              category == el ? (
                <li
                  key={el}
                  className="pt-1 pb-8 px-4 border-b-2 border-b-secondary font-[600]"
                >
                  <p className="uppercase text-base/[20px] text-secondary">
                    {el}
                  </p>
                </li>
              ) : (
                <li
                  key={el}
                  className="pt-1 pb-8 px-4"
                  onClick={() => {
                    dispatch(setCategory(el));
                  }}
                >
                  <p className="uppercase text-base/[20px] text-primary">
                    {el}
                  </p>
                </li>
              )
            )}
          </ul>
          <div className="col-span-1 flex justify-center">
            <div className="p-1">
              <Link to="/">
                <BrandIcon></BrandIcon>
              </Link>
            </div>
          </div>

          {/* cart button */}
          <div className="col-span-1 flex justify-end me-4">
            <div className="p-0.5 relative">
              <button className={`${cartItems.length>0 ? "" :"bg-gray-400 mix-blend-hard-light"}`}
                onClick={() => {
                  if(cartItems.length>0){
                    dispatch(setShowMenu(!showCartMenu));
                  }
                }}
              >
                <CartIcon></CartIcon>
              </button>
              {cartItems.length > 0 && (
                <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary w-6 h-6 rounded-full flex justify-center items-start">
                  <p className="text-white g-0 text-sm">{cartItems.length}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart menu */}
        {
           showCartMenu &&
           <div className="container mx-auto xl:px-24 relative z-50">
            <div className="w-[350px] px-4 py-6 absolute xl:end-24 end-0 bg-white">
              {cartItems.length > 0 && (
                <>     
                <div className="mb-8">
                  <span className="capitalize font-[600]">my bag,</span>
                  {cartItems.length > 1 ? (
                    <span>
                      <span className="mx-0.5"> {cartItems.length} </span>items
                    </span>
                  ) : (
                    <span>
                      <span className="mx-0.5"> {cartItems.length} </span>item
                    </span>
                  )}
                </div>
                {/* Cart items */}
                <div>
                  {cartItems.map((el) => (
                    <div
                      className="grid grid-cols-12 mb-8"
                      key={generateUniqueId(el)}
                    >
                      <div className="col-span-5 flex flex-col justify-between">
                        <div className="mb-1">
                          <p className="text-lg font-[300] text-primary">
                            {el.name}
                          </p>
                          <p className="text-base text-primary font-[600] my-1">
                            {el.prices[0]?.currency.symbol}
                            {parseFloat(el.prices[0]?.amount).toFixed(2)}
                          </p>
                        </div>
                        {/* attributes */}
                        {el.attributes.map((attr) =>
                          attr.type == "text" ? (
                            <div className="mt-2">
                              <p className="text-sm capitalize">{attr.name}:</p>
                              <div className="mt-1 flex flex-wrap">
                                {attr.items?.map((item) => (
                                  el.selectedAttributes.some(
                                    (obj) => obj.name === attr.name && obj.value === item.value // Check key and value
                                  ) ? <div className="m-1 border-2 border-primary bg-primary flex justify-center items-center">
                                    <p className="text-xs text-white uppercase p-1">
                                      {item.value}
                                    </p>
                                  </div>
                                  :
                                  <div className="m-1 border-2 border-primary flex justify-center items-center">
                                    <p className="text-xs uppercase p-1">
                                      {item.value}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="mt-2">
                              <p className="text-sm capitalize">{attr.name}:</p>
                              <div className="mt-1 flex flex-wrap">
                                {attr.items?.map((item) => (
                                  el.selectedAttributes.some(
                                    (obj) => obj.name === attr.name && obj.value === item.displayValue // Check key and value
                                  ) ?
                                  <div
                                    className="p-3 m-1 outline outline-2 outline-offset-2 outline-secondary"
                                    style={{ backgroundColor: item.value }}
                                  ></div>
                                  : 
                                  <div
                                  className="p-3 m-1"
                                  style={{ backgroundColor: item.value }}
                                ></div>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      {/* counter */}
                      <div className="col-span-1 flex flex-col justify-between">
                        <button
                          onClick={() => increaseQuantity(el)} // Pass the entire item object
                          className="w-8 h-8 border-2 border-primary flex justify-center items-center text-3xl g-0"
                        >
                          +
                        </button>
                        <p className="text-center font-bold">{el.quantity}</p>
                        <button
                          onClick={() => decreaseQuantity(el)} // Pass the entire item object
                          className="w-8 h-8 border-2 border-primary flex justify-center items-center text-3xl g-0"
                        >
                          -
                        </button>
                      </div>
                      {/* image */}
                      <div className="col-span-6 ps-4 h-full flex items-center">
                        <div className="xl:max-w-[122px] w-full">
                          <img
                            src={el.gallery[0]}
                            className="object-cover object-top w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </>
              )}
              {/* total */}
              <div className="py-4 mt-8 flex justify-between">
                <p className="capitalize font-[600]">Total</p>
                <p className="font-[700] me-2">{cartItems[0]?.prices[0]?.currency?.symbol}{calculateTotal()}</p>
              </div>
              {/* order button */}
              <div className="mt-8">
                <button className="bg-secondary text-center py-3 w-full font-[500] text-white">
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        }
      </header>
    </>
  );
};

export default Header;
