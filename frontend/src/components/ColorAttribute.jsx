import React from "react";
import {
  formatToKebabCase,
  formatToKebabCaseSensitive,
} from "../utils/kebab-case-helper";

const ColorAttribute = ({ attr, selectedValue, onSelect }) => (
  <div
    data-testid={`product-attribute-${formatToKebabCase(attr.name)}`}
    className="mt-8"
  >
    <p className="uppercase font-[800]">{attr.name}:</p>
    <div className="mt-2 flex">
      {attr.items.map((item) => (
        <div
          key={item.displayValue}
          data-testid={`product-attribute-${formatToKebabCase(
            attr.name
          )}-${formatToKebabCaseSensitive(item.displayValue)}`}
          onClick={() => onSelect(attr.name, item.displayValue)}
          className={`p-4 me-2 ${
            selectedValue === item.displayValue
              ? "outline outline-offset-2 outline-4 outline-secondary"
              : ""
          }`}
          style={{ backgroundColor: item.value }}
        />
      ))}
    </div>
  </div>
);

export default ColorAttribute;
