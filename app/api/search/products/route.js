import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import queryString from "query-string";
import Tag from "@/models/tag";
import Category from "@/models/category";

export async function GET(request) {
  await dbConnect();
  const searchParams = queryString.parseUrl(request.url).query;
  const { productSearchQuery } = searchParams;

  try {
    if (!productSearchQuery) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    const [categories, tags] = await Promise.all([
      Category.find({ name: { $regex: productSearchQuery, $options: "i" } }),
      Tag.find({ name: { $regex: productSearchQuery, $options: "i" } }),
    ]);
    const categoryIds = categories.map((category) => category._id);
    const tagIds = tags.map((tag) => tag._id);

    const products = await Product.find({
      $or: [
        { title: { $regex: productSearchQuery, $options: "i" } },
        { description: { $regex: productSearchQuery, $options: "i" } },
        { category: { $in: categoryIds } },
        { brand: { $regex: productSearchQuery, $options: "i" } },
        { tag: { $in: tagIds } },
      ],
    })
      .populate("category", "name slug")
      .populate("tags", "name slug")
      .sort({ createdAt: -1 });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
