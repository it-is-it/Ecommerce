import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";

export async function GET() {
  await dbConnect();
  try {
    const brands = await Product.distinct("brand");
    return NextResponse.json(brands);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { err: "An error occurred. Try again" },
      { status: 500 }
    );
  }
}
