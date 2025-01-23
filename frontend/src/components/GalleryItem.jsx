import React from "react";

const GalleryItem = ({ src, onClick }) => (
  <div className="w-20 h-20 aspect-square" onClick={onClick}>
    <img src={src} className="object-cover w-full h-full" alt="Gallery item" />
  </div>
);

export default GalleryItem;
