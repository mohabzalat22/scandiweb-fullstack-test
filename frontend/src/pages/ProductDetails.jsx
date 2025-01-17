import React from "react";
import PrevIcon from "./../assets/icons/PrevIcon";
import NextIcon from "./../assets/icons/NextIcon";

const ProductDetails = () => {
  return (
    <>
      <div className="container mx-auto xl:px-24 mt-20">
        <div className="xl:grid xl:grid-cols-12">
          {/* GALLERY */}
          <div className="xl:col-span-1 xl:flex-col my-2 xl:m-0 flex gap-4 max-h-[478px] overflow-y-scroll scrollbar-hide">
            <div className="w-20 h-20 overflow-hidden">
              <img
                src="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg"
                alt=""
                className="object-cover w-full h-full"
              />
            </div>

            <div className="w-20 h-20 overflow-hidden">
              <img
                src="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg"
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            
          </div>
          <div className="xl:col-span-11">
            <div className="flex w-full">
              <div className="xl:grid xl:grid-cols-12">
                <div className="xl:col-span-6">
                  <div className="w-[575px] h-[478px] overflow-hidden relative">
                    <img
                      src="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg"
                      alt=""
                      className="object-cover object-center w-full h-full absolute z-20"
                    />
                    <div className="absolute z-30 top-1/2 -translate-y-1/2 w-full">
                      <div className="flex justify-between w-full px-4">
                        <button>
                          <PrevIcon></PrevIcon>
                        </button>
                        <button>
                          <NextIcon></NextIcon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xl:col-span-4">
                  {/* details */}
                  <div className="xl:ms-20 mt-4 xl:mt-0">
                    <p className="text-3xl font-[600]">Running Shorts</p>
                    {/* attributes */}
                    <div className="mt-8">
                      <p className="uppercase font-[800]"> Size:</p>
                      <div className="mt-2 flex">
                        <div className="border-2 border-primary w-16 h-10 flex justify-center items-center">
                          <p className="uppercase text-sm">xl</p>
                        </div>
                        <div className="bg-primary ms-2 border-2 border-primary w-16 h-10 flex justify-center items-center">
                          <p className="text-white uppercase text-sm">xl</p>
                        </div>
                      </div>
                    </div>

                    {/* size */}

                    <div className="mt-8">
                      <p className="uppercase font-[800]"> color:</p>
                      <div className="mt-2 flex">
                        <div className="bg-secondary w-9 h-9 me-2"></div>
                        <div className="bg-primary w-9 h-9 me-2"></div>
                        <div className="bg-red-700 w-9 h-9 me-2"></div>
                      </div>
                    </div>

                    {/* price */}

                    <div className="py-6">
                      <p className="uppercase font-[700]">price:</p>
                      <p className="text-2xl font-[700] my-2">$50.00</p>
                    </div>

                    <button className="w-full py-4 text-center bg-secondary text-white">
                      ADD TO CART
                    </button>

                    {/* description */}
                    <div className="py-10">
                      <p>
                        Find stunning women's cocktail dresses and party
                        dresses. Stand out in lace and metallic cocktail dresses
                        and party dresses from all your favorite brands.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
