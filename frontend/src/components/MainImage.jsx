import React from "react";
import PrevIcon from "./../assets/icons/PrevIcon";
import NextIcon from "./../assets/icons/NextIcon";
import NavigationButton from "./NavigationButton";

const MainImage = ({ selectedImage, gallery, onPrev, onNext }) => (
  <div className="w-[575px] h-[478px] overflow-hidden relative">
    <img
      src={selectedImage}
      className="object-contain object-center w-full h-full absolute"
      alt="Selected product"
    />
    <div className="absolute z-30 top-1/2 -translate-y-1/2 w-full">
      <div className="flex justify-between w-full px-4">
        <NavigationButton onClick={onPrev}>
          <PrevIcon />
        </NavigationButton>
        <NavigationButton onClick={onNext}>
          <NextIcon />
        </NavigationButton>
      </div>
    </div>
  </div>
);

export default MainImage;
