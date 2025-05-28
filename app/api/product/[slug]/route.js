import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export async function GET(req, context) {
  const { slug } = await context.params;
  await dbConnect();
  try {
    const product = await Product.findOne({ slug })
      .populate("category", "name slug")
      .populate("tags", "name slug");
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
