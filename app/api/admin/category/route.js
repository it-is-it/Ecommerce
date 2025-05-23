import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";
import slugify from "slugify";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const category = await new Category({
      name,
      slug: slugify(name),
    }).save();

    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    console.error("Category creation error:", err);
    // Handle validation and duplicate-key errors as client errors
    if (
      err.name === "ValidationError" ||
      err.name === "ValidatorError" ||
      err.code === 11000 ||
      err.message.toLowerCase().includes("unique")
    ) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
