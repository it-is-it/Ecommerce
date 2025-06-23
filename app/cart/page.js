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
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div>
      {step === 1 && (
        <Step1 onNextStep={handleNextStep} cartItems={cartItems} />
      )}
      {step === 2 && (
        <Step2
          onPreviousStep={handlePreviousStep}
          onNextStep={handleNextStep}
          cartItems={cartItems}
        />
      )}
      {step === 3 && (
        <Step3 onPreviousStep={handlePreviousStep} cartItems={cartItems} />
      )}
    </div>
  );
}
