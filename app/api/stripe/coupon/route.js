import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await dbConnect();
  const _req = await req.json();
  try {
    const coupon = await stripe.coupons.retrieve(_req.couponCode);
    console.log("coupon", coupon);
    return NextResponse.json(coupon, { status: 200 });
  } catch (err) {
    console.error("Stripe coupon error:", err);
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: err.statusCode || 500,
      }
    );
  }
}
