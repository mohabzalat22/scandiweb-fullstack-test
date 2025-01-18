import React, { useState } from "react";
import BrandIcon from "./../assets/icons/BrandIcon";
import CartIcon from "./../assets/icons/CartIcon";
import { GET_CATEGORIES } from "../graphql/query";
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../rtk/slices/categorySlice';

const Header = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const dispatch = useDispatch();
  let categories = ['all'];
  if (data) {
    categories = [...categories, ...data.categories.map((el)=>el.name)];
  }
  let product = {
    id: "huarache-x-stussy-le",
    name: "Nike Air Huarache Le",
    inStock: true,
    gallery: [
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087",
    ],
    description: "<p>Great sneakers for everyday use!</p>",
    category: "clothes",
    attributes: [
      {
        id: "Size",
        items: [
          {
            displayValue: "40",
            value: "40",
            id: "40",
            __typename: "Attribute",
          },
          {
            displayValue: "41",
            value: "41",
            id: "41",
            __typename: "Attribute",
          },
          {
            displayValue: "42",
            value: "42",
            id: "42",
            __typename: "Attribute",
          },
          {
            displayValue: "43",
            value: "43",
            id: "43",
            __typename: "Attribute",
          },
        ],
        name: "Size",
        type: "text",
        __typename: "AttributeSet",
      },
      {
        id: "Color",
        items: [
          {
            displayValue: "Green",
            value: "#44FF03",
            id: "Green",
            __typename: "Attribute",
          },
          {
            displayValue: "Cyan",
            value: "#03FFF7",
            id: "Cyan",
            __typename: "Attribute",
          },
        ],
        name: "Color",
        type: "swatch",
        __typename: "AttributeSet",
      },
    ],
    prices: [
      {
        amount: 144.69,
        currency: {
          label: "USD",
          symbol: "$",
          __typename: "Currency",
        },
        __typename: "Price",
      },
    ],
    brand: "Nike x Stussy",
    __typename: "Product",
  };

  let category = useSelector((state) => state.category.value)

  let [cartItems, setCartItems] = useState([product, product]);
  let [showCartMenu, setShowCartMenu] = useState(false);

  return (
    <>
      <header className="pt-6 relative z-50 bg-white">
        <div className="container mx-auto grid grid-cols-3 gap-1  xl:px-24">
          {/* categories */}
          <ul className="flex col-span-1 cursor-pointer">
            {categories.map((el) =>
              category == el ? (
                <li key={el} className="pt-1 pb-8 px-4 border-b-2 border-b-secondary font-[600]">
                  <p className="uppercase text-base/[20px] text-secondary">
                    {el}
                  </p>
                </li>
              ) : (
                <li key={el}
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
              <BrandIcon></BrandIcon>
            </div>
          </div>

          {/* cart button */}

          <div className="col-span-1 flex justify-end me-4">
            <div className="p-0.5 relative">
              <button
                onClick={() => {
                  setShowCartMenu(!showCartMenu);
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
        {/* menu */}
        {
        showCartMenu == true && cartItems.length > 0 && (
          <div className="container mx-auto xl:px-24 relative z-50">
            <div className="w-[350px] px-4 py-6 absolute xl:end-24 end-0 bg-white">
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
              {/* main */}
              <div>
                {cartItems.map((el) => (
                  // cart item
                  <div className="grid grid-cols-12 mb-8" key={el.id}>
                    <div className="col-span-5 flex flex-col justify-between">
                      <div className="mb-1">
                        <p className="text-lg font-[300] text-primary">
                          {el.name}
                        </p>
                        <p className="text-base text-primary font-[600] my-1">
                          {el.prices[0]?.currency.symbol}
                          {el.prices[0]?.amount.toFixed(2)}
                        </p>
                      </div>
                      {/* attributes */}
                      {el.attributes.map((attr) =>
                        attr.type == "text" ? (
                          <div className="mt-2">
                            <p className="text-sm capitalize">{attr.name}:</p>
                            <div className="mt-1 flex">
                              {/* iters */}
                              {attr.items?.map((item) => (
                                <div className="w-6 h-6 mx-1 border-2 border-primary flex justify-center items-center">
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
                            <div className="mt-1 flex">
                              {/* iters */}
                              {attr.items?.map((item) => (
                                <div
                                  className="p-3 mx-1"
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
                      <button className="w-8 h-8 border-2 border-primary flex justify-center items-center text-3xl g-0">
                        +
                      </button>
                      <p className="text-center font-bold">1</p>
                      <button className="w-8 h-8 border-2 border-primary flex justify-center items-center text-3xl g-0">
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
              {/* total */}
              <div className="py-4 mt-8 flex justify-between">
                <p className="capitalize font-[600]">Total</p>
                <p className="font-[700] me-2">$200</p>
              </div>

              {/* order */}

              <div className="mt-8">
                <button className="bg-secondary text-center py-3 w-full font-[500] text-white">
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        )
        }
      </header>
    </>
  );
};

export default Header;
