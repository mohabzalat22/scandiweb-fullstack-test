import React from "react";
import {
  formatToKebabCase,
  formatToKebabCaseSensitive,
} from "../utils/kebab-case-helper";

const TextAttribute = ({ attr, selectedValue, onSelect }) => (
  <div
    data-testid={`product-attribute-${formatToKebabCase(attr.name)}`}
    className="mt-8"
  >
    <p className="uppercase font-[800]">{attr.name}:</p>
    <div className="mt-2 flex">
      {attr.items.map((item) => (
        <div
          key={item.value}
          data-testid={`product-attribute-${formatToKebabCase(
            attr.name
          )}-${formatToKebabCaseSensitive(item.value)}`}
          onClick={() => onSelect(attr.name, item.value)}
          className={`me-1 w-16 h-10 flex justify-center items-center ${
            selectedValue === item.value
              ? "bg-primary"
              : "border-2 border-primary"
          }`}
        >
          <p
            className={`uppercase text-sm ${
              selectedValue === item.value ? "text-white" : "text-primary"
            }`}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default TextAttribute;
