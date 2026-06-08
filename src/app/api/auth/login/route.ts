import { NextRequest, NextResponse } from "next/server";
import { login, createSession } from "@/lib/auth";

// POST /api/auth/login
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const result = await login(email, password);

    if (!result.success || !result.token) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    createSession(result.token);

    return NextResponse.json({ success: true, token: result.token });
  } catch (error) {
    console.error("POST /api/auth/login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
