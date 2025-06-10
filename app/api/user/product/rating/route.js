import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
// import Order from '@/models/order'
import { currentUser } from "@/utils/currentUser";
// toast is client-side only; removed import

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  console.log("Rating API called with body:", body);
  const { productId, rating, comment } = body;
  const user = await currentUser();
  console.log("Authenticated user:", user);
  if (!user) {
    console.error("Unauthenticated rating attempt");
    return NextResponse.json({ err: "Authentication required" }, { status: 401 });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ err: "Product not found" }, { status: 404 });
    }
    const existingRating = product.ratings.find(
      (rate) => rate.postedBy.toString() === user._id.toString()
    );

    //check if user have purchased the product

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.comment = comment;
      await product.save();

      return NextResponse.json(product);
    }

    product.ratings.push({ rating, comment, postedBy: user._id });
    const updated = await product.save();

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Rating submission error:", err);
    return NextResponse.json(
      { err: "Server error. Please try again" },
      { status: 500 }
    );
  }
}
