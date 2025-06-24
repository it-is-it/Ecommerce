export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { origin } = new URL(req.url);
    await dbConnect();
    const _req = await req.json();
    console.log("_req in stripe checkout session api", _req);
    const { cartItems, couponCode } = _req;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const lineItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item._id);
        const unitAmount = product.price * 100;
        return {
          price_data: {
            currency: "aud",
            product_data: {
              name: product.title,
              images: [product.images[0].secure_url],
            },
            unit_amount: unitAmount,
          },
          tax_rates: [process.env.STRIPE_TAX_RATE],
          quantity: item.quantity,
        };
      })
    );
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/dashboard/user/stripe/success`,
      cancel_url: `${origin}/cart`,
      client_reference_id: token?.user?._id,
      line_items: lineItems,
      mode: "payment",
      payment_method_types: ["card"],
      payment_intent_data: {
        metadata: {
          cartItems: JSON.stringify(cartItems),
          userId: token?.user?._id,
        },
      },
      shipping_options: [
        {
          shipping_rate: process.env.STRIPE_SHIPPING_RATE,
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["AU"],
      },
      discounts: [
        {
          coupon: couponCode,
        },
      ],
      customer_email: token.user.email,
    });
    console.log("session", session);
    return NextResponse.json(session);
  } catch (error) {
    console.error("stripe session error", error);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
