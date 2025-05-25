import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
// pages/api/upload.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const { image } = await req.json();

  try {
    const result = await cloudinary.uploader.upload(image);
    return NextResponse.json({
      public_id: result.public_id,
      secure_url: result.secure_url,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function PUT(req) {
  const { public_id } = await req.json();

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
}
