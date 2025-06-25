import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import OrderSummary from "./OrderSummary";
import { useCart } from "@/context/cart";

export default function Step2({ onNextStep, onPreviousStep }) {
  const { data, status, update } = useSession();
  const [deliveryAddress, setDeliveryAddress] = useState(
    data?.user?.deliveryAddress || ""
  );
  const { couponCode, setCouponCode, handleCoupon } = useCart();

  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "/cart";

  const handleAddressThenNext = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deliveryAddress }),
        }
      );
      if (!response.ok) {
        let errorMsg = "An error occurred. Please try again.";
        try {
          const errorData = await response.json();
          errorMsg = errorData.err || errorData.error || errorMsg;
        } catch (parseErr) {
          console.error("Error parsing JSON error response", parseErr);
        }
        toast.error(errorMsg);
        return;
      }
      // success: parse JSON and proceed
      const data = await response.json();
      update({ user: { ...data.user, deliveryAddress: data } });
      onNextStep();
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Please try again.");
    }
  };
  if (status !== "authenticated") {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="d-flex justify-content-end my-4">
              <button
                className="btn btn-outline-danger btn-raised col-6"
                onClick={onPreviousStep}
              >
                Previous
              </button>
              <Link
                className="btn btn-primary btn-raised col-6"
                href={`/login?callbackUrl=${currentUrl}`}
              >
                Login to Continue
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <p className="alert alert-primary">Contact Details / Login</p>
          <div>
            <input
              type="text"
              value={data?.user?.name}
              className="form-control mb-2 px-2"
              placeholder="Your name"
              disabled
            />

            <input
              type="email"
              value={data?.user?.email}
              className="form-control mb-2 px-2"
              placeholder="Your email"
              disabled
            />

            {/* <textarea
              maxLength="320"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="form-control mb-2 px-2 mt-4"
              placeholder="Enter your delivery address"
              rows="5"
            /> */}
          </div>
          <div>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="form-control mb-2 px-2 mt-4"
              placeholder="Enter your coupon code here"
            />
            <button
              className="btn btn-success btn-raised"
              onClick={() => handleCoupon(couponCode)}
              disabled={!couponCode.trim()}
            >
              Apply Coupon
            </button>
          </div>
          <div className="d-flex justify-content-end my-4">
            <button
              className="btn btn-outline-danger btn-raised col-6"
              onClick={onPreviousStep}
            >
              Previous
            </button>
            <button
              className="btn btn-danger btn-raised col-6"
              onClick={onNextStep}
              // disabled={!deliveryAddress.trim()}
            >
              Next
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
