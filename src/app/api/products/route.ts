import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, createProduct } from "@/lib/db";
import { validateSession } from "@/lib/auth";

// GET /api/products - list all products (optional filters: ?category=, ?search=)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let products = await getAllProducts();

    if (category && category !== "All") {
      products = products.filter((p) => p.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter((p) => p.name.toLowerCase().includes(q));
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/products - create a new product (requires auth)
export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token || !validateSession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, price, unit, image, rating, category, type, origin } = body;

    if (!name || price === undefined) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    const product = await createProduct({
      name,
      price: Number(price),
      unit: unit || "bottle",
      image: image || "",
      rating: Number(rating) || 5,
      category: category || "",
      type: type || "",
      origin: origin || "",
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
