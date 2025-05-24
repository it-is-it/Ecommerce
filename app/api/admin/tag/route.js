import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Tag from "@/models/tag";
import slugify from "slugify";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { name, parentCategory } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const tag = await new Tag({
      name,
      parentCategory,
      slug: slugify(name),
    }).save();

    return NextResponse.json(tag, { status: 201 });
  } catch (err) {
    console.error("Tag creation error:", err);
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
    const tags = await Tag.find({}).sort({ createdAt: -1 });
    return NextResponse.json(tags);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
