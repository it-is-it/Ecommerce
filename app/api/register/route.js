import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt";

// Handle CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin":
        "http://localhost:3000, http://nextecom-bay.vercel.app",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { name, email, password } = body;

  try {
    const user = await new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    }).save();

    return new Response(
      JSON.stringify({ success: "Registered Successfully" }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin":
            "http://localhost:3000, http://nextecom-bay.vercel.app",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }
}
