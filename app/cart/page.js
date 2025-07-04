"use client";
import { useState } from "react";
import Link from "next/link";
import { GoCheckCircleFill } from "react-icons/go";
import Step1 from "@/components/cart/Step1";
import Step2 from "@/components/cart/Step2";
import Step3 from "@/components/cart/Step3";
import { useCart } from "@/context/cart";

export default function Cart() {
  const { cartItems } = useCart();
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const tickIcon = (stepNumber) => {
    return step === stepNumber ? (
      <GoCheckCircleFill
        size={25}
        className={step >= stepNumber ? "mb-1 text-success" : "text-muted"}
      />
    ) : null;
  };

  if (!cartItems.length) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <p className="lead">Your cart is empty</p>
          <Link className="btn btn-primary btn-raised btn-lg" href="/shop">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="col-lg-6 offset-lg-3 my-5">
        <div className="d-flex justify-content-between lead">
          <div>{tickIcon(1)} Review Cart</div>
          <div>{tickIcon(2)} Contact Details</div>
          <div>{tickIcon(3)} Payment</div>
        </div>
      </div>

      {step === 1 && <Step1 onNextStep={handleNextStep} />}
      {step === 2 && (
        <Step2
          onPreviousStep={handlePreviousStep}
          onNextStep={handleNextStep}
        />
      )}
      {step === 3 && <Step3 onPreviousStep={handlePreviousStep} />}
    </div>
  );
}
