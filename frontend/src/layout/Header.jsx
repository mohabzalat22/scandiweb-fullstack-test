import React from "react";
import BrandIcon from "./../assets/icons/BrandIcon";
import CartIcon from "./../assets/icons/CartIcon";

const Header = () => {
  return (
    <>
      <header className="pt-6 relative z-50 bg-white">
        <div className="container mx-auto grid grid-cols-3 gap-1  xl:px-24">
          <ul className="flex col-span-1">
            {/* active */}
            <li className="pt-1 pb-8 px-4 border-b-2 border-b-secondary font-[600]">
              <p className="uppercase text-base/[20px] text-secondary">women</p>
            </li>
            {/* in-active */}
            <li className="pt-1 pb-8 px-4">
              <p className="uppercase text-base/[20px] text-primary">men</p>
            </li>

            <li className="pt-1 pb-8 px-4">
              <p className="uppercase text-base/[20px] text-primary">kids</p>
            </li>
          </ul>
          <div className="col-span-1 flex justify-center">
            <div className="p-1">
              <BrandIcon></BrandIcon>
            </div>
          </div>

          <div className="col-span-1 flex justify-end me-4">
            <div className="p-0.5 relative">
              <CartIcon></CartIcon>
              <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-primary w-6 h-6 rounded-full flex justify-center items-start">
                <p className="text-white g-0 text-sm">3</p>
              </div>
            </div>
          </div>
        </div>
        {/* menu */}
        <div className="hidden container mx-auto xl:px-24 relative z-50">
          <div className="w-[350px] px-4 py-6 absolute xl:end-24 end-0 bg-white">
            <div className="mb-8">
              <span className="capitalize font-[600]">my bag,</span>
              <span>
                <span className="mx-0.5"> 3 </span>items
              </span>
            </div>
            {/* main */}
            <div>
              <div className="grid grid-cols-12">

                <div className="col-span-5 flex flex-col justify-between">
                  <div className="mb-1">
                    <p className="text-lg font-[300] text-primary">
                      Running Short
                    </p>
                    <p className="text-base text-primary font-[600] my-1">
                      $50.00
                    </p>
                  </div>
                  {/* attributes */}
                  <div className="">
                    <div className="mt-2">
                      <p className="text-sm capitalize">Size:</p>
                      <div className="mt-1 flex">
                        {/* iters */}
                        <div className="w-6 h-6 mx-1 border-2 border-primary flex justify-center items-center">
                          <p className="text-xs uppercase p-1">xl</p>
                        </div>

                        <div className="w-6 h-6 mx-1 border-2 border-primary flex justify-center items-center">
                          <p className="text-xs uppercase p-1">xl</p>
                        </div>
                      </div>
                    </div>

                    {/* t */}
                    <div className="mt-2">
                      <p className="text-sm capitalize">Color:</p>
                      <div className="mt-1 flex">
                        {/* iters */}
                        <div className="w-6 h-6 mx-1 bg-primary"></div>
                        <div className="w-6 h-6 mx-1 bg-primary"></div>
                        <div className="w-6 h-6 mx-1 bg-primary"></div>
                        <div className="w-6 h-6 mx-1 bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 flex flex-col justify-between">
                  <button className="w-8 h-8 border-2 border-primary flex justify-center items-center text-3xl g-0">+</button>
                  <button className="w-8 h-8 border-2 border-primary flex justify-center items-center text-3xl g-0">-</button>
                </div>
                <div className="col-span-6 ps-4 h-full flex items-center">
                  <div className="xl:max-w-[122px] w-full">
                    <img src="https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png" alt="" className="object-cover object-top w-full h-full"/>
                  </div>
                </div>

              </div>
              {/* total */}
              <div className="py-4 mt-8 flex justify-between">
                <p className="capitalize font-[600]">Total</p>
                <p className="font-[700] me-2">$200</p>
              </div>

              {/* order */}

              <div className="mt-8">
                <button className="bg-secondary text-center py-3 w-full font-[500] text-white">PLACE ORDER</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
