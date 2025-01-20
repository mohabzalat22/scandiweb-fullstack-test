import React, { useState, useEffect } from "react";
import QuickShopIcon from "../assets/icons/QuickShopIcon";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Initialize cartItems with data from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Initialize selectedAttributes with the first value of each attribute
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  useEffect(() => {
    if (product.attributes) {
      // Set the first value of each attribute as the default selected attribute
      const defaultAttributes = product.attributes.map((attr) => ({
        name: attr.name,
        value: attr.type === "text" ? attr.items[0].value : attr.items[0].displayValue, // Select the first value of each attribute
      }));
      setSelectedAttributes(defaultAttributes);
    }
  }, [product.attributes]);

  const handleQuickShopClick = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the ProductCard
    e.preventDefault(); // Prevent the Link from navigating

    if (product.attributes) {
      // Use the functional form of setCartItems to ensure we work with the latest state
      setCartItems((prevCartItems) => {
        // Check if the product is already in the cart with the same selected attributes
        const existingItemIndex = prevCartItems.findIndex(
          (item) =>
            item.id === product.id &&
            JSON.stringify(item.selectedAttributes) ===
              JSON.stringify(selectedAttributes)
        );

        let updatedCartItems;

        if (existingItemIndex >= 0) {
          // Update quantity if already in cart
          updatedCartItems = [...prevCartItems];
          updatedCartItems[existingItemIndex].quantity += 1;
        } else {
          // Add new product to cart with the first attribute of each type
          const newCartItem = {
            id: product.id,
            name: product.name,
            prices: product.prices,
            gallery: product.gallery,
            attributes: product.attributes,
            selectedAttributes: selectedAttributes, // Use the pre-selected attributes
            quantity: 1,
          };
          updatedCartItems = [...prevCartItems, newCartItem];
          console.log("ci: ", prevCartItems, "up: ", newCartItem);
        }

        // Save updated cart in LocalStorage
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
        window.dispatchEvent(new Event("cartUpdated"));
        window.dispatchEvent(new Event("productQuantityUpdated"));
        return updatedCartItems;
      });
    }
  };

  useEffect(() => {
    const handleProductQuantityUpdated = (event) => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };

    // Listen for the custom event 'productQuantityUpdated'
    window.addEventListener("productQuantityUpdated", handleProductQuantityUpdated);

    // Cleanup event listener when the component unmounts
    return () => {
      window.removeEventListener("productQuantityUpdated", handleProductQuantityUpdated);
    };
  }, []);

  const handleProductCardClick = () => {
    navigate(`/product/${product.id}`); // Navigate to the product details page
  };

  return (
    <div
      onClick={handleProductCardClick} // Handle click on the entire ProductCard
      className="xl:max-w-[386px] xl:max-h-[444px] group p-4 hover:shadow-all duration-500 col-span-1 cursor-pointer"
    >
      <div className="xl:max-w-[354px] xl:max-h-[330px] relative overflow-hidden">
        {/* overlay */}
        {product.inStock ? (
          <img
            src={product.gallery[0]}
            className="object-cover object-top w-full h-full"
            alt={product.name}
          />
        ) : (
          <>
            <div className="absolute w-full h-full bg-white/70 text-center uppercase">
              <p className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-primary/50">
                OUT OF STOCK
              </p>
            </div>
            <img
              src={product.gallery[0]}
              className="object-cover object-top w-full h-full"
              alt={product.name}
            />
          </>
        )}
      </div>
      {/* details */}
      {product.inStock && (
        <div className="relative hidden group-hover:block">
          <div
            onClick={handleQuickShopClick} // Handle click on the QuickShop button
            className="absolute top-0 right-4 -translate-y-1/2"
          >
            <QuickShopIcon />
          </div>
        </div>
      )}
      <div className="pt-6">
        <p className="capitalize font-[300]/29 text-primary">{product.name}</p>
        <p className="text-lg">
          {product.prices[0]?.currency.symbol}
          {parseFloat(product.prices[0]?.amount).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;