"use server";

import { connectMongoDB } from "@/lib/mongodb";
import { createSession } from "@/lib/session";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function signup(formData: { [x: string]: string }) {
  try {
    const { username, password } = formData;

    // Connect to MongoDB
    await connectMongoDB();

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: username,
      username: username,
      password: hashedPassword,
    });

    const user = await User.findOne({ username: username }).select("_id");
    console.log(user);
    const userId = user ? user._id.toString() : null;

    // Create session
    if (userId) {
      await createSession(userId);
    }

    return;
  } catch (error) {
    console.error("Error signing up:", error);
    return;
  }
}
