import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { ProductInfo } from "./ProductInfo";
import { ItemControls } from "./ItemControl";

export const CartItemCard = ({ items, onRemove, onQuantityChange }) => {
  const { productId, quantity } = items;

  return (
    <div className="flex items-center justify-between w-full p-4 border-b">
      <ProductInfo items={items} />
      <ItemControls
        quantity={quantity}
        onQuantityChange={onQuantityChange}
        onRemove={onRemove}
        productId={productId}
      />
    </div>
  );
};

export default CartItemCard;
