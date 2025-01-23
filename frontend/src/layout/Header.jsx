import React, { useEffect, useState } from "react";
import BrandIcon from "./../assets/icons/BrandIcon";
import CartIcon from "./../assets/icons/CartIcon";
import { GET_CATEGORIES } from "../graphql/query";
import { CREATE_NEW_ORDER } from "../graphql/query";
import { useQuery, useMutation, from } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../rtk/slices/categorySlice";
import { setShowMenu } from "../rtk/slices/menuSlice";
import { Link, useNavigate } from "react-router-dom";
import { formatToKebabCase } from "../utils/kebab-case-helper";
import Loading from "../pages/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const dispatch = useDispatch();
  const updateCartItems = () => {
    let localStorageCart = localStorage.getItem("cart");
    setCartItems(localStorageCart ? JSON.parse(localStorageCart) : []);
  };
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
    return cartItems
      .reduce(
        (total, item) =>
          total + item.quantity * parseFloat(item.prices[0]?.amount || 0),
        0
      )
      .toFixed(2);
  };
  const [createOrder] = useMutation(CREATE_NEW_ORDER);
  const createNewOrder = async () => {
    if (cartItems.length > 0) {
      let orderItems = cartItems.map((el) => {
        return {
          product_id: el.id,
          quantity: el.quantity,
          price: +el.prices[0].amount,
          attributes: JSON.stringify(el.selectedAttributes),
        };
      });
      const orderData = {
        total_amount: +calculateTotal(),
        currency_id: cartItems[0].prices[0].currency.id,
        items: orderItems,
      };
      try {
        const result = await createOrder({ variables: { order: orderData } });
        localStorage.setItem("cart", "[]");
        setCartItems([]);
        window.dispatchEvent(new Event("productQuantityUpdated"));
        console.log("Order created:", result.data.createOrder);
        navigate(`/success?orderId=${result.data.createOrder}`);
      } catch (err) {
        console.error("Error creating order:", err);
        toast.error("Error: Please Reload page");
      }
    }
  };
  let categories = ["all"];
  let category = useSelector((state) => state.category.value);
  let showCartMenu = useSelector((state) => state.menu.value);
  let [cartItems, setCartItems] = useState(() => {
    let localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  });

  if (data) {
    categories = [...categories, ...data.categories.map((el) => el.name)];
  }

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

  useEffect(() => {
    if (cartItems.length == 0) {
      dispatch(setShowMenu(false));
    }
  }, [cartItems]);

  // mutation

  if (loading) {
    return <Loading />;
  }
  if (error) {
    toast.error("Error: Please Reload page");
  }

  return (
    <>
      <ToastContainer />
      <header className="pt-6 relative z-50 bg-white">
        <div className="container mx-auto grid grid-cols-3 gap-1  xl:px-24">
          {/* categories */}
          <div className="flex col-span-1 cursor-pointer">
            {categories.map((el) =>
              category == el ? (
                <a
                  href={`/${el}`}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  data-testid="active-category-link"
                  key={el}
                  className="pt-1 pb-8 px-4 border-b-2 border-b-secondary font-[600]"
                >
                  <p className="uppercase text-base/[20px] text-secondary">
                    {el}
                  </p>
                </a>
              ) : (
                <a
                  href={`/${el}`}
                  data-testid="category-link"
                  key={el}
                  className="pt-1 pb-8 px-4"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setCategory(el));
                  }}
                >
                  <p className="uppercase text-base/[20px] text-primary">
                    {el}
                  </p>
                </a>
              )
            )}
          </div>
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
              <button
                data-testid="cart-btn"
                className={`${
                  cartItems.length > 0 ? "" : "bg-gray-400 mix-blend-hard-light"
                }`}
                onClick={() => {
                  dispatch(setShowMenu(!showCartMenu));
                  if (cartItems.length > 0) {
                  }
                }}
              >
                <CartIcon></CartIcon>
              </button>
              {cartItems.length > 0 && (
                <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary w-6 h-6 rounded-full flex justify-center items-start">
                  <p
                    data-testid="cart-item-amount"
                    className="text-white g-0 text-sm"
                  >
                    {cartItems.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart menu */}
        {showCartMenu && (
          <div className="container mx-auto xl:px-24 relative z-50">
            <div
              data-testid="cart-overlay"
              className="w-[350px] px-4 py-6 absolute xl:end-24 end-0 bg-white"
            >
              {cartItems.length > 0 && (
                <>
                  <div className="mb-8">
                    <span className="capitalize font-[600]">my bag,</span>
                    {cartItems.length > 1 ? (
                      <span>
                        <span className="mx-0.5"> {cartItems.length} </span>
                        items
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
                              <div
                                className="mt-2"
                                data-testid={`cart-item-attribute-${formatToKebabCase(
                                  el.name
                                )}`}
                              >
                                <p className="text-sm capitalize">
                                  {attr.name}:
                                </p>
                                <div className="mt-1 flex flex-wrap">
                                  {attr.items?.map((item) =>
                                    el.selectedAttributes.some(
                                      (obj) =>
                                        obj.name === attr.name &&
                                        obj.value === item.value // Check key and value
                                    ) ? (
                                      <div className="m-1 border-2 border-primary bg-primary flex justify-center items-center">
                                        <p className="text-xs text-white uppercase p-1">
                                          {item.value}
                                        </p>
                                      </div>
                                    ) : (
                                      <div className="m-1 border-2 border-primary flex justify-center items-center">
                                        <p className="text-xs uppercase p-1">
                                          {item.value}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div
                                className="mt-2"
                                data-testid={`cart-item-attribute-${formatToKebabCase(
                                  el.name
                                )}`}
                              >
                                <p className="text-sm capitalize">
                                  {attr.name}:
                                </p>
                                <div className="mt-1 flex flex-wrap">
                                  {attr.items?.map((item) =>
                                    el.selectedAttributes.some(
                                      (obj) =>
                                        obj.name === attr.name &&
                                        obj.value === item.displayValue // Check key and value
                                    ) ? (
                                      <div
                                        data-testid={`cart-item-attribute-${formatToKebabCase(
                                          el.name
                                        )}-selected`}
                                        className="p-3 m-1 outline outline-2 outline-offset-2 outline-secondary"
                                        style={{ backgroundColor: item.value }}
                                      ></div>
                                    ) : (
                                      <div
                                        data-testid={`cart-item-attribute-${formatToKebabCase(
                                          el.name
                                        )}`}
                                        className="p-3 m-1"
                                        style={{ backgroundColor: item.value }}
                                      ></div>
                                    )
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                        {/* counter */}
                        <div className="col-span-1 flex flex-col justify-between">
                          <button
                            data-testid="cart-item-amount-increase"
                            onClick={() => increaseQuantity(el)} // Pass the entire item object
                            className="w-8 h-8 border-2 border-primary flex justify-center items-center text-3xl g-0"
                          >
                            +
                          </button>
                          <p className="text-center font-bold">{el.quantity}</p>
                          <button
                            data-testid="cart-item-amount-decrease"
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
                <p data-testid="cart-total" className="font-[700] me-2">
                  {cartItems[0]?.prices[0]?.currency?.symbol}
                  {calculateTotal()}
                </p>
              </div>
              {/* order button */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    createNewOrder();
                  }}
                  className="bg-secondary text-center py-3 w-full font-[500] text-white"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
