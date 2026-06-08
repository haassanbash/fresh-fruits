import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "products.json");

// ---- Public interface ----

export interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  rating: number;
  category: string;
  type: string;
  origin: string;
}

// ---- Internal helpers ----

function readDb(): Product[] {
  if (!fs.existsSync(DB_PATH)) {
    seedData();
  }
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw) as Product[];
}

function writeDb(products: Product[]) {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(products, null, 2), "utf-8");
}

function seedData() {
  const products: Product[] = [
    { id: 1, name: "Strawberry Juice", price: 6.59, unit: "bottle", image: "/images/strawberry-juice.jpg", rating: 5, category: "Berry Blends", type: "Cold-Pressed", origin: "Brazil" },
    { id: 2, name: "Mango Smoothie", price: 8.99, unit: "bottle", image: "/images/mango-juice.jpg", rating: 5, category: "Tropical", type: "Blended", origin: "Trence" },
    { id: 3, name: "Green Detox Juice", price: 7.99, unit: "bottle", image: "/images/green-juice.jpg", rating: 5, category: "Green Juices", type: "Cold-Pressed", origin: "Germany" },
    { id: 4, name: "Orange Squeeze", price: 4.99, unit: "bottle", image: "/images/orange-juice.jpg", rating: 5, category: "Citrus", type: "Hand-Squeezed", origin: "Brazil" },
    { id: 5, name: "Berry Blast Smoothie", price: 8.49, unit: "bottle", image: "/images/berry-smoothie.jpg", rating: 5, category: "Berry Blends", type: "Blended", origin: "Germany" },
    { id: 6, name: "Peach Nectar", price: 7.99, unit: "bottle", image: "/images/peach-juice.jpg", rating: 5, category: "Stone Fruit", type: "Cold-Pressed", origin: "Organic" },
    { id: 7, name: "Tropical Paradise", price: 9.99, unit: "bottle", image: "/images/tropical-juice.jpg", rating: 5, category: "Tropical", type: "Blended", origin: "Trence" },
    { id: 8, name: "Pineapple Crush", price: 5.49, unit: "bottle", image: "/images/pineapple-juice.jpg", rating: 5, category: "Tropical", type: "Cold-Pressed", origin: "Brazil" },
    { id: 9, name: "Classic Lemonade", price: 4.49, unit: "bottle", image: "/images/classic-lemonade.jpg", rating: 5, category: "Limon", type: "Hand-Squeezed", origin: "Brazil" },
    { id: 10, name: "Lemon Mint Cooler", price: 5.99, unit: "bottle", image: "/images/lemon-mint.jpg", rating: 5, category: "Limon", type: "Blended", origin: "Germany" },
    { id: 11, name: "Lemon Ginger Zing", price: 6.49, unit: "bottle", image: "/images/lemon-ginger.jpg", rating: 5, category: "Limon", type: "Cold-Pressed", origin: "Trence" },
    { id: 12, name: "Pink Lemonade", price: 5.49, unit: "bottle", image: "/images/pink-lemonade.jpg", rating: 5, category: "Limon", type: "Hand-Squeezed", origin: "Brazil" },
    { id: 13, name: "Sparkling Lemon", price: 5.99, unit: "bottle", image: "/images/sparkling-lemon.jpg", rating: 5, category: "Limon", type: "Cold-Pressed", origin: "Germany" },
    { id: 14, name: "Lemon Honey Refresher", price: 6.99, unit: "bottle", image: "/images/lemon-honey.jpg", rating: 5, category: "Limon", type: "Blended", origin: "Organic" },
    { id: 15, name: "Hassan's Special Drink", price: 7.99, unit: "bottle", image: "/images/hassan-special.jpg", rating: 5, category: "Special Drinks", type: "Cold-Pressed", origin: "Organic" },
  ];
  writeDb(products);
}

function nextId(products: Product[]): number {
  if (products.length === 0) return 1;
  return Math.max(...products.map((p) => p.id)) + 1;
}

// ---- Public CRUD functions ----

export async function getAllProducts(): Promise<Product[]> {
  return readDb();
}

export async function getProductById(id: number): Promise<Product | null> {
  const products = readDb();
  return products.find((p) => p.id === id) ?? null;
}

export async function createProduct(data: Omit<Product, "id">): Promise<Product> {
  const products = readDb();
  const product: Product = { id: nextId(products), ...data };
  products.push(product);
  writeDb(products);
  return product;
}

export async function updateProduct(id: number, data: Partial<Product>): Promise<Product | null> {
  const products = readDb();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  products[index] = { ...products[index], ...data, id };
  writeDb(products);
  return products[index];
}

export async function deleteProduct(id: number): Promise<boolean> {
  const products = readDb();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  writeDb(filtered);
  return true;
}
