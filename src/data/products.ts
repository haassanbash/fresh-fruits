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

export const allProducts: Product[] = [
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

export const seasonalProducts: Product[] = [
  { id: 101, name: "Summer Berry Splash", price: 7.99, unit: "bottle", image: "/images/berry-smoothie.jpg", rating: 5, category: "Seasonal", type: "Blended", origin: "Brazil" },
  { id: 102, name: "Autumn Apple Cider", price: 8.99, unit: "bottle", image: "/images/orange-juice.jpg", rating: 5, category: "Seasonal", type: "Cold-Pressed", origin: "Trence" },
  { id: 103, name: "Winter Citrus Warmth", price: 6.99, unit: "bottle", image: "/images/green-juice.jpg", rating: 5, category: "Seasonal", type: "Hand-Squeezed", origin: "Germany" },
  { id: 104, name: "Spring Green Revive", price: 7.49, unit: "bottle", image: "/images/green-juice.jpg", rating: 5, category: "Seasonal", type: "Cold-Pressed", origin: "Brazil" },
  { id: 105, name: "Mango Summer Freeze", price: 9.49, unit: "bottle", image: "/images/mango-juice.jpg", rating: 5, category: "Seasonal", type: "Blended", origin: "Germany" },
];

export interface FruitBox {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  items: string[];
  image: string;
  badge?: string;
}

export const fruitBoxes: FruitBox[] = [
  {
    id: 201, name: "Daily Wellness Pack", description: "A refreshing mix of cold-pressed juices for your everyday health routine.",
    price: 29.99, originalPrice: 39.99, items: ["Green Detox Juice", "Orange Squeeze", "Berry Blast Smoothie", "Strawberry Juice"],
    image: "/images/green-juice.jpg", badge: "BESTSELLER",
  },
  {
    id: 202, name: "Tropical Escape", description: "Exotic tropical juice blends that transport you to paradise.",
    price: 39.99, originalPrice: 54.99, items: ["Mango Smoothie", "Pineapple Crush", "Tropical Paradise", "Peach Nectar"],
    image: "/images/tropical-juice.jpg", badge: "POPULAR",
  },
  {
    id: 203, name: "Berry Lover's Bundle", description: "Antioxidant-packed berry juices and smoothies for health enthusiasts.",
    price: 34.99, originalPrice: 44.99, items: ["Strawberry Juice", "Berry Blast Smoothie", "Tropical Paradise"],
    image: "/images/berry-smoothie.jpg",
  },
  {
    id: 204, name: "Family Fresh Pack", description: "A generous assortment of fresh juices for the whole family to enjoy.",
    price: 59.99, originalPrice: 79.99, items: ["Orange Squeeze", "Green Detox", "Mango Smoothie", "Strawberry Juice", "Pineapple Crush"],
    image: "/images/pineapple-juice.jpg", badge: "NEW",
  },
];
