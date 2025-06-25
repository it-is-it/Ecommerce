import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/order";


export async function GET(req) {
  await dbConnect();
  const urlObj = new URL(req.url);
  const pageParam = urlObj.searchParams.get("page");
  const currentPage = parseInt(pageParam, 10) || 1;
  const pageSize = 3;

  try {
    const skip = (currentPage - 1) * pageSize;
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find({})
      .populate("userId", "name")
      .skip(skip)
      .limit(pageSize)
      .sort({
        createdAt: -1,
        _id: -1,
      });
    return NextResponse.json({
      orders,
      currentPage,
      totalPages: Math.ceil(totalOrders / pageSize),
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
