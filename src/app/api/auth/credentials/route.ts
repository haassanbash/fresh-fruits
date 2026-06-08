import { NextRequest, NextResponse } from "next/server";
import { getCredentials, updateCredentials, validateSession } from "@/lib/auth";

// GET /api/auth/credentials - get current admin email (requires auth)
export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token || !validateSession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const creds = await getCredentials();
  return NextResponse.json(creds);
}

// PUT /api/auth/credentials - update email/password (requires auth)
export async function PUT(request: NextRequest) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token || !validateSession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email, password } = await request.json();
    const result = await updateCredentials(email, password);
    return NextResponse.json(result);
  } catch (error) {
    console.error("PUT /api/auth/credentials error:", error);
    return NextResponse.json({ error: "Failed to update credentials" }, { status: 500 });
  }
}
