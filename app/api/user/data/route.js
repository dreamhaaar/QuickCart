import connectDB from "@/config/db";
import User from "@/models/User";

import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function GET(request) {
  try {
    await connectDB(); // ✅ Must complete BEFORE any query
  console.log("🔍 Request headers:", Object.fromEntries(request.headers.entries()))
    const { userId } = getAuth(request);
      console.log("🧪 userId:", userId);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(userId); // ✅ Now safe
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

