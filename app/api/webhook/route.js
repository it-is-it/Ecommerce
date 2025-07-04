import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";
import Product from "@/models/product";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await dbConnect();
  const _raw = await req.text();
  const sig = req.headers.get("stripe-signature");
  try {
    const event = stripe.webhooks.constructEvent(
      _raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    switch (event.type) {
      case "charge.succeeded":
        const chargeSucceeded = event.data.object;
        const { id, ...rest } = chargeSucceeded;
        const cartItems = JSON.parse(chargeSucceeded.metadata.cartItems);
        const productIds = cartItems.map((cartItem) => cartItem._id);
        const products = await Product.find({ _id: { $in: productIds } });
        const productMap = {};
        products.forEach((product) => {
          productMap[product._id.toString()] = {
            _id: product._id,
            title: product.title,
            slug: product.slug,
            price: product.price,
            image: product.images[0]?.secure_url || "",
          };
        });

        const cartItemsWithProductDetails = cartItems.map((cartItem) => ({
          ...productMap[cartItem._id],
          quantity: cartItem.quantity,
        }));
        const orderData = {
          ...rest,
          chargeId: id,
          userId: chargeSucceeded.metadata.userId,
          cartItems: cartItemsWithProductDetails,
        };
        await Order.create(orderData);

        for (const cartItem of cartItems) {
          const product = await Product.findById(cartItem._id);
          if (product) {
            product.stock -= cartItem.quantity;
            await product.save();
          }
        }
        return NextResponse.json({ ok: true });
      default:
        return NextResponse.json({ received: true });
    }
  } catch (err) {
    console.log("====================================> ", err);
    return NextResponse.json(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
