import React from "react";
import TextAttribute from "./TextAttribute";
import ColorAttribute from "./ColorAttribute";
import Price from "./Price";
import AddToCartButton from "./AddToCartButton";
import ProductDescription from "./ProductDescription";

const ProductDetails = ({
  product,
  selectedAttributes,
  addAttribute,
  addToCart,
}) => {
  const getAttribute = (key) =>
    selectedAttributes.find((attr) => attr.name === key);

  return (
    <div className="xl:col-span-4">
      <div className="xl:ms-20 mt-4 xl:mt-0">
        <p className="text-3xl font-[600]">{product.name}</p>

        {/* Render Attributes */}
        {product.attributes?.map((attr) =>
          attr.type === "text" ? (
            <TextAttribute
              key={attr.name}
              attr={attr}
              selectedValue={getAttribute(attr.name)?.value}
              onSelect={addAttribute}
            />
          ) : (
            <ColorAttribute
              key={attr.name}
              attr={attr}
              selectedValue={getAttribute(attr.name)?.value}
              onSelect={addAttribute}
            />
          )
        )}

        {/* Price */}
        <Price price={product?.prices[0]} />

        {/* Add to Cart Button */}
        <AddToCartButton
          isDisabled={
            !product.inStock ||
            product.attributes.length !== selectedAttributes.length
          }
          onClick={addToCart}
        />

        {/* Product Description */}
        <ProductDescription description={product.description} />
      </div>
    </div>
  );
};

export default ProductDetails;
