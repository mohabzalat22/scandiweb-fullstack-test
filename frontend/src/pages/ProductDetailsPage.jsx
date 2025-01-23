import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Overlay from "../components/Overlay";
import { GET_PRODUCT_BY_ID } from "../graphql/query";
import Header from "../layout/Header";
import Gallery from "../components/Gallery";
import MainImage from "../components/MainImage";
import ProductDetails from "../components/ProductDetails"; //comp

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const showCartMenu = useSelector((state) => state.menu.value);
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
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
  const getAttribute = (key) =>
    selectedAttributes.find((attr) => attr.name === key);
  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id: id },
  });
  const getImageIndex = (src) => gallery.findIndex((el) => el === src);
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cartItems with data from localStorage if available
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const addToCart = () => {
    if (product.attributes.length === selectedAttributes.length) {
      // Check if the product is already in the cart
      const existingItemIndex = cartItems.findIndex(
        (item) =>
          JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(selectedAttributes)
      );

      if (existingItemIndex >= 0) {
        // Update quantity if already in cart
        cartItems[existingItemIndex].quantity += 1;
      } else {
        // Add new product to cart
        cartItems.push({
          id: product.id,
          name: product.name,
          prices: product?.prices,
          gallery: product?.gallery,
          attributes: product?.attributes,
          selectedAttributes: selectedAttributes,
          quantity: 1,
        });
      }

      // Save updated cart in LocalStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };
  const handlePrev = () => {
    const prevIndex = getImageIndex(selectedImage) - 1;
    if (prevIndex >= 0) {
      setSelectedImage(product.gallery[prevIndex]);
    }
  };

  const handleNext = () => {
    const nextIndex = getImageIndex(selectedImage) + 1;
    if (nextIndex < product.gallery.length) {
      setSelectedImage(product.gallery[nextIndex]);
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
    window.addEventListener(
      "productQuantityUpdated",
      handleProductQuantityUpdated
    );

    // Cleanup event listener when the component unmounts
    return () => {
      window.removeEventListener(
        "productQuantityUpdated",
        handleProductQuantityUpdated
      );
    };
  }, []);

  useEffect(() => {
    if (data && data.product) {
      setProduct(data.product);
      setGallery(data.product.gallery);
    }
  }, [data]);

  useEffect(() => {
    setSelectedImage(gallery[0]);
  }, [gallery]);

  return (
    <>
      <Header />
      {showCartMenu && <Overlay />}
      {product != null && (
        <div className="container mx-auto xl:px-24 mt-20">
          <div className="xl:grid xl:grid-cols-12">
            {/* GALLERY */}
            <Gallery
              gallery={product.gallery}
              onSelectImage={setSelectedImage}
            />
            {/* MAIN PRODUCT */}
            <div className="xl:col-span-11">
              <div className="flex w-full">
                <div className="xl:grid xl:grid-cols-12">
                  <div className="xl:col-span-6">
                    {/* MAIN IMAGE */}
                    <div>
                      <MainImage
                        selectedImage={selectedImage}
                        gallery={product.gallery}
                        onPrev={handlePrev}
                        onNext={handleNext}
                      />
                    </div>
                  </div>
                  <ProductDetails
                    product={product}
                    selectedAttributes={selectedAttributes}
                    addAttribute={addAttribute}
                    addToCart={addToCart}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsPage;
