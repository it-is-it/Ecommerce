import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";
import Product from "@/models/product";
import { currentUser } from "@/utils/currentUser";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  let order;
  try {
    const user = await currentUser();
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    order = await Order.findById(orderId);

    if (!order || order.userId.toString() !== user._id.toString()) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    if (order.refunded) {
      return NextResponse.json({ error: "Order has already been refunded." }, { status: 400 });
    }

    if (order.delivery_status !== "Not Processed") {
      return NextResponse.json(
        { error: "Order cannot be cancelled" },
        { status: 400 }
      );
    }

    const refund = await stripe.refunds.create({
      payment_intent: order.payment_intent,
      reason: "requested_by_customer",
    });

    for (const cartItem of order.cartItems) {
      const product = await Product.findById(cartItem.product || cartItem._id);
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      product.stock += cartItem.quantity;
      await product.save();
    }

    order.status = "Refunded";
    order.refunded = true;
    order.delivery_status = "Cancelled";
    order.refundId = refund.id;

    await order.save();
    return NextResponse.json(
      { message: "Order refunded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error refunding order:", error);
    if (error.code === "charge_already_refunded") {
      // Already refunded in Stripe; update DB to reflect refund
      if (!order) {
        order = await Order.findById(orderId);
      }
      order.status = "Refunded";
      order.refunded = true;
      order.delivery_status = "Cancelled";
      await order.save();
      
      return NextResponse.json(
        { error: "Order has already been refunded." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
