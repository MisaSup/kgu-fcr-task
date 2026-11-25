import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    title: "Vite T-Shirt",
    price: 1990,
    description: "Хлопковая футболка с принтом. Размеры S–XXL.",
    image: "/images/tshirt.svg",
  },
  {
    id: "2",
    title: "React Mug",
    price: 890,
    description: "Керамическая кружка 330 мл.",
    image: "/images/mug.svg",
  },
  {
    id: "3",
    title: "Node Cap",
    price: 1490,
    description: "Бейсболка с регулируемым ремешком.",
    image: "/images/cap.svg",
  },
  {
    id: "4",
    title: "TypeScript Sticker Pack",
    price: 490,
    description: "Набор виниловых стикеров, 6 штук.",
    image: "/images/sticker.svg",
  },
];
