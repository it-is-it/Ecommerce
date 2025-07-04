"use client";

import { useState } from "react";
import { useCart } from "@/context/cart";
import OrderSummary from "@/components/cart/OrderSummary";
import toast from "react-hot-toast";

export default function Step3({ onPreviousStep }) {
  const { cartItems, validCoupon, couponCode } = useCart();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const cartData = cartItems.map((item) => ({
        _id: item._id,
        quantity: item.quantity,
      }));
      const payload = { cartItems: cartData };
      if (validCoupon) {
        payload.couponCode = couponCode;
      }
      const response = await fetch("/api/user/stripe/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        window.location.href = data.url;
      } else {
        const errorData = await response.json();
        toast.error(errorData.err);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <p className="alert alert-primary">Payment Method</p>
          <h2 className="text-center">🔒💳</h2>
          <p className="alert alert-danger">
            Flat rate $5 shipping fee will apply for all orders Australia wide!
          </p>
          <p className="lead card p-5 bg-secondary text-light">
            Clicking 'Place Order' will securely redirect you to our payment
            partner, Stripe to complete your checkout.
          </p>
          <div className="d-flex justify-content-end my-4">
            <button
              className="btn btn-outline-danger btn-raised col-6"
              onClick={onPreviousStep}
            >
              Previous
            </button>
            <button
              className="btn btn-success btn-raised col-6"
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? "Processing ..." : "Place Order"}
            </button>
          </div>
        </div>
        <div className="col-lg-4">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
