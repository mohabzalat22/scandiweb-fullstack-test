import React from 'react'
import QuickShopIcon from '../assets/icons/QuickShopIcon'
import { Link } from 'react-router-dom'
const ProductCard = ({product}) => {

  return (
    <>
    {/* product */}
      <Link to={"/product/" + product.id} className='xl:max-w-[386px] xl:max-h-[444px] group p-4 hover:shadow-all duration-500 col-span-1'>
        <div className='xl:max-w-[354px] xl:max-h-[330px] relative overflow-hidden'>
          {/* overlay */}
          {
            product.inStock==true ? (
              <img src={product.gallery[0]} className='object-cover object-top w-full h-full'/>
            ):(
              <>
                <div className='absolute w-full h-full bg-white/70 text-center uppercase'>
                  <p className='absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-primary/50'>OUT OF STOCK</p>
                </div>
                <img src={product.gallery[0]} className='object-cover object-top w-full h-full'/>
              </>
              
            )

          }
        </div>
        {/* details */}
        {
          product.inStock==true && (
            <div className='relative hidden group-hover:block'>
              <div className='absolute top-0 right-4 -translate-y-1/2'>
                <QuickShopIcon></QuickShopIcon>
              </div>
            </div>
          )
        }
        <div className='pt-6'>
          <p className='capitalize font-[300]/29 text-primary'>{product.name}</p>
          <p className='text-lg'>{product.prices[0]?.currency.symbol}{parseFloat(product.prices[0]?.amount).toFixed(2)}</p>
        </div>
      </Link>
    </>
  )
}

export default ProductCard