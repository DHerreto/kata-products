import { Product, ProductType } from "./product";

export const mockProducts: Product[] = [
  { id: 11, name: 'Pan', sellIn: 5, quality: 10, type: ProductType.perishable },
  { id: 12, name: 'Queso Azul', sellIn: 2, quality: 1, type: ProductType.vintage },
  { id: 13, name: 'Yogurt', sellIn: 5, quality: 6, type: ProductType.perishable },
  { id: 14, name: 'Sal', sellIn: 1, quality: 80, type: ProductType.immutable },
  { id: 15, name: 'Jamón', sellIn: 10, quality: 20, type: ProductType.cured },
];
