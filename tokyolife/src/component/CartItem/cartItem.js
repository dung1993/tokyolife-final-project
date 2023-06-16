import React from "react";
import products from '../../assets/data/products';

const CartItem = ({ product, removeProduct, updateQuantity }) => {

  const handleRemoveClick = () => {
    removeProduct(product.id);
  };

  const handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value);
    updateQuantity(product.id, quantity);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <div className="cart-item-name">{product.name}</div>
        <div className="cart-item-price">${product.price}</div>
      </div>
      <div className="cart-item-controls">
        <input
          type="number"
          className="cart-item-quantity"
          value={product.quantity}
          onChange={handleQuantityChange}
        />
        <button className="cart-item-remove" onClick={handleRemoveClick}>
          Xóa
        </button>
      </div>
    </div>
  )
}

export default CartItem