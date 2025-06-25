import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";
import queryString from "query-string";

export async function PUT(req, context) {
  await dbConnect();
  const body = await req.json();
  const { delivery_status } = body;

  try {
    const order = await Order.findByIdAndUpdate(
      context.params.orderId,
      {
        delivery_status,
      },
      { new: true }
    );
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
