"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cart";
import Link from "next/link";

export default function AddToCart({ product }) {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();
  const existingProduct = cartItems.find((item) => item?._id === product?._id);
  const initialQuantity = existingProduct ? existingProduct?.quantity : 1;
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(existingProduct?.quantity || 1);
  }, [existingProduct]);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(product, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(product, newQuantity);
    } else {
      removeFromCart(product._id);
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div>
      {existingProduct ? (
        <div className="input-group">
          <div className="input-group-prepend">
            <button
              onClick={handleDecrement}
              type="button"
              className="btn btn-outline-secondary"
            >
              -
            </button>
          </div>
          <input
            type="number"
            className="form-control no-spin-arrows mx-5 text-center"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          />
          <div className="input-group-append">
            <button
              onClick={handleIncrement}
              type="button"
              className="btn btn-outline-secondary"
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="btn btn-danger btn-raised btn-block"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
