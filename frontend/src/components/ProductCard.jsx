import React from 'react'
import QuickShopIcon from '../assets/icons/QuickShopIcon'
const ProductCard = () => {
  return (
    <>
    {/* product */}
      <div className='xl:max-w-[386px] xl:max-h-[444px] group p-4 hover:shadow-all duration-500 col-span-1'>
        <div className='xl:max-w-[354px] xl:max-h-[330px] relative overflow-hidden'>
          {/* overlay */}
          {/* <div className='absolute w-full h-full bg-white/25 text-center uppercase'>
            <p className='absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-primary/50'>OUT OF STOCK</p>
          </div> */}
          <img src="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg" alt="" className='object-cover object-top w-full h-full'/>
        </div>
        {/* details */}
        <div className='relative hidden group-hover:block'>
          <div className='absolute top-0 right-4 -translate-y-1/2'>
            <QuickShopIcon></QuickShopIcon>
          </div>
        </div>
        <div className='pt-6'>
          <p className='capitalize font-[300]/29 text-primary'>running short</p>
          <p className='text-lg'>$50</p>
        </div>
      </div>
    </>
  )
}

export default ProductCard