import React, { useEffect, useState } from "react";
import PrevIcon from "./../assets/icons/PrevIcon";
import NextIcon from "./../assets/icons/NextIcon";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../graphql/query";
import Header from "../layout/Header";
import parse from "html-react-parser";

const ProductDetails = () => {
  const { id } = useParams();

  let [product, setProduct] = useState(null);
  let [selectedAttributes, setSelectedAttributes] = useState([]);

  const addAttribute = (name, value) => {
    let updatedAttributes;

    if (selectedAttributes.some((attr) => attr.name === name)) {
      updatedAttributes = selectedAttributes.map((attr) =>
        attr.name === name ? { ...attr, value } : attr
      );
    } else {
      updatedAttributes = [...selectedAttributes, { name, value }];
    }

    setSelectedAttributes(updatedAttributes);
  };

  const keyExists = (key) =>
    selectedAttributes.some((attr) => attr.name === key);

  const getAttribute = (key) =>
    selectedAttributes.find((attr) => attr.name === key);

  let { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: id },
  });

  useEffect(() => {
    if (data && data.product) {
      setProduct(data.product);
      setGallery(data.product.gallery);
    }
  }, [data]);

  let [gallery, setGallery] = useState([]);
  let [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setSelectedImage(gallery[0]);
  }, [gallery]);

  const getImageIndex = (src) => gallery.findIndex((el) => el === src);

  // console.log(product);
  return (
    <>
      <Header></Header>
      {product != null && (
        <div className="container mx-auto xl:px-24 mt-20">
          <div className="xl:grid xl:grid-cols-12">
            {/* GALLERY */}
            <div className="xl:col-span-1 xl:flex-col my-2 xl:m-0 flex gap-4 max-h-[478px] overflow-y-scroll scrollbar-hide">
              {product.gallery.map((src, i) => (
                <div
                  key={i}
                  className="w-20 h-20 overflow-hidden"
                  onClick={() => setSelectedImage(src)}
                >
                  <img src={src} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
            <div className="xl:col-span-11">
              <div className="flex w-full">
                <div className="xl:grid xl:grid-cols-12">
                  <div className="xl:col-span-6">
                    <div className="w-[575px] h-[478px] overflow-hidden relative">
                      <img
                        src={selectedImage}
                        className="object-cover object-center w-full h-full absolute z-20"
                      />
                      <div className="absolute z-30 top-1/2 -translate-y-1/2 w-full">
                        <div className="flex justify-between w-full px-4">
                          <button
                            onClick={() =>
                              (getImageIndex(selectedImage) - 1 >= 0) && setSelectedImage(
                                gallery[getImageIndex(selectedImage) - 1] 
                              )
                            }
                          >
                            <PrevIcon></PrevIcon>
                          </button>
                          <button
                            onClick={() =>
                              (getImageIndex(selectedImage) + 1 < gallery.length) && setSelectedImage(
                                gallery[getImageIndex(selectedImage) + 1]
                              )
                            }
                          >
                            <NextIcon></NextIcon>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="xl:col-span-4">
                    {/* details */}
                    <div className="xl:ms-20 mt-4 xl:mt-0">
                      <p className="text-3xl font-[600]">{product.name}</p>
                      {/* attributes */}
                      {product.attributes?.map((attr) =>
                        attr.type == "text" ? (
                          <div className="mt-8">
                            <p className="uppercase font-[800]">{attr.name}:</p>
                            <div className="mt-2 flex">
                              {attr.items.map((item) =>
                                getAttribute(attr.name)?.value == item.value ? (
                                  <div
                                    key={item.value}
                                    onClick={() =>
                                      addAttribute(attr.name, item.value)
                                    }
                                    className="me-1 bg-primary w-16 h-10 flex justify-center items-center"
                                  >
                                    <p className="text-white uppercase text-sm">
                                      {item.value}
                                    </p>
                                  </div>
                                ) : (
                                  <div
                                    key={item.value}
                                    onClick={() =>
                                      addAttribute(attr.name, item.value)
                                    }
                                    className="border-2 me-1 border-primary w-16 h-10 flex justify-center items-center"
                                  >
                                    <p className="uppercase text-sm">
                                      {item.value}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="mt-8">
                            <p className="uppercase font-[800]">{attr.name}:</p>
                            <div className="mt-2 flex">
                              {attr.items.map((item) =>
                                getAttribute(attr.name)?.value ==
                                item.displayValue ? (
                                  <div
                                    onClick={() =>
                                      addAttribute(attr.name, item.displayValue)
                                    }
                                    className="p-4 me-2 outline outline-offset-2 outline-4 outline-secondary"
                                    style={{ backgroundColor: item.value }}
                                  ></div>
                                ) : (
                                  <div
                                    onClick={() =>
                                      addAttribute(attr.name, item.displayValue)
                                    }
                                    className="p-4 me-2"
                                    style={{ backgroundColor: item.value }}
                                  ></div>
                                )
                              )}
                            </div>
                          </div>
                        )
                      )}

                      {/* price */}

                      <div className="py-6">
                        <p className="uppercase font-[700]">price:</p>
                        <p className="text-2xl font-[700] my-2">
                          {product?.prices[0]?.currency?.symbol}
                          {product?.prices[0]?.amount}
                        </p>
                      </div>

                      <button className="w-full py-4 text-center bg-secondary text-white">
                        ADD TO CART
                      </button>

                      {/* description */}
                      <div className="py-10 description">{parse(product.description)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
