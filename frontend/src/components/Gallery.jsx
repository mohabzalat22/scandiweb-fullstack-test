import React from "react";
import GalleryItem from "./GalleryItem";

const Gallery = ({ gallery, onSelectImage }) => (
  <div
    data-testid="product-gallery"
    className="flex xl:col-span-1 xl:flex-col my-2 xl:m-0 gap-4 max-h-[478px] overflow-y-scroll scrollbar-hide"
  >
    {gallery.map((src, i) => (
      <GalleryItem key={i} src={src} onClick={() => onSelectImage(src)} />
    ))}
  </div>
);

export default Gallery;
