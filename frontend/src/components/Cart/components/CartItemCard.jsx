import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ProductInfo } from './ProductInfo';
import { ItemControls } from './ItemControl';

export const CartItemCard = ({ item, onRemove, onQuantityChange }) => {
  const { productId, quantity } = item;
  console.log('CartItemCard item:', item);
  return (
    <div className="flex items-center justify-between w-full p-4 border-b">
      <ProductInfo item={item} />
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
