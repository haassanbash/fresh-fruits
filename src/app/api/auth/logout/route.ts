import { NextRequest, NextResponse } from "next/server";
import { validateSession, destroySession } from "@/lib/auth";

// POST /api/auth/logout
export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (token) {
    destroySession(token);
  }
  return NextResponse.json({ success: true });
}

// GET /api/auth/check - verify if session is valid
export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (token && validateSession(token)) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
