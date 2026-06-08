import { NextRequest, NextResponse } from "next/server";
import { getProductById, updateProduct, deleteProduct } from "@/lib/db";
import { validateSession } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

// GET /api/products/:id
export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const product = await getProductById(Number(id));
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("GET /api/products/:id error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT /api/products/:id (requires auth)
export async function PUT(request: NextRequest, { params }: Params) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token || !validateSession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const product = await updateProduct(Number(id), {
      name: body.name,
      price: body.price !== undefined ? Number(body.price) : undefined,
      unit: body.unit,
      image: body.image,
      rating: body.rating !== undefined ? Number(body.rating) : undefined,
      category: body.category,
      type: body.type,
      origin: body.origin,
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("PUT /api/products/:id error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/products/:id (requires auth)
export async function DELETE(request: NextRequest, { params }: Params) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token || !validateSession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteProduct(Number(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/products/:id error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
