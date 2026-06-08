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
  { id: 1, name: "Organic Strawberries", price: 6.59, unit: "1lb", image: "/images/strawberries.jpg", rating: 5, category: "Berries", type: "Organic", origin: "Brazil" },
  { id: 2, name: "Alphonso Mangoes", price: 24.99, unit: "Box", image: "/images/mangoes.jpg", rating: 5, category: "Tropical", type: "Natural", origin: "Trence" },
  { id: 3, name: "Organic Apples", price: 6.99, unit: "1lb", image: "/images/apples.jpg", rating: 5, category: "Stone Fruits", type: "Organic", origin: "Germany" },
  { id: 4, name: "Fresh Oranges", price: 4.99, unit: "1lb", image: "/images/oranges.jpg", rating: 5, category: "Citrus", type: "Natural", origin: "Brazil" },
  { id: 5, name: "Blueberries", price: 8.49, unit: "Box", image: "/images/blueberries.jpg", rating: 5, category: "Berries", type: "Natural", origin: "Germany" },
  { id: 6, name: "Organic Peaches", price: 7.99, unit: "1lb", image: "/images/peaches.jpg", rating: 5, category: "Stone Fruits", type: "Organic", origin: "Organic" },
  { id: 7, name: "Dragon Fruit", price: 9.99, unit: "Each", image: "/images/dragon-fruit.jpg", rating: 5, category: "Tropical", type: "Natural", origin: "Trence" },
  { id: 8, name: "Fresh Pineapple", price: 5.49, unit: "Each", image: "/images/pineapple.jpg", rating: 5, category: "Tropical", type: "Natural", origin: "Brazil" },
];

export const seasonalProducts: Product[] = [
  { id: 101, name: "Summer Strawberries", price: 7.99, unit: "1lb", image: "/images/strawberries.jpg", rating: 5, category: "Berries", type: "Organic", origin: "Brazil" },
  { id: 102, name: "Golden Mangoes", price: 29.99, unit: "Box", image: "/images/mangoes.jpg", rating: 5, category: "Tropical", type: "Natural", origin: "Trence" },
  { id: 103, name: "Honeycrisp Apples", price: 8.49, unit: "1lb", image: "/images/apples.jpg", rating: 5, category: "Stone Fruits", type: "Organic", origin: "Germany" },
  { id: 104, name: "Blood Oranges", price: 6.99, unit: "1lb", image: "/images/oranges.jpg", rating: 5, category: "Citrus", type: "Natural", origin: "Brazil" },
  { id: 105, name: "Wild Blueberries", price: 11.99, unit: "Box", image: "/images/blueberries.jpg", rating: 5, category: "Berries", type: "Organic", origin: "Germany" },
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
    id: 201, name: "The Essentials Box", description: "A perfect starter with everyday favorites your whole family will love.",
    price: 29.99, originalPrice: 39.99, items: ["Apples", "Oranges", "Bananas", "Grapes", "Strawberries"],
    image: "/images/strawberries.jpg", badge: "BESTSELLER",
  },
  {
    id: 202, name: "The Tropical Box", description: "Escape to paradise with exotic tropical fruits handpicked for peak ripeness.",
    price: 39.99, originalPrice: 54.99, items: ["Mangoes", "Pineapple", "Dragon Fruit", "Passion Fruit", "Papaya"],
    image: "/images/mangoes.jpg", badge: "POPULAR",
  },
  {
    id: 203, name: "The Berry Bliss Box", description: "A berry lover's dream — packed with antioxidant-rich seasonal berries.",
    price: 34.99, originalPrice: 44.99, items: ["Strawberries", "Blueberries", "Raspberries", "Blackberries"],
    image: "/images/blueberries.jpg",
  },
  {
    id: 204, name: "The Premium Box", description: "Our finest selection of organic, farm-to-table luxury fruits.",
    price: 59.99, originalPrice: 79.99, items: ["Organic Peaches", "Cherries", "Dragon Fruit", "Golden Kiwi", "Figs"],
    image: "/images/peaches.jpg", badge: "NEW",
  },
];
