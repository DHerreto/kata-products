export enum ProductType {
  perishable = 'Pedecedero',
  cured = 'Curado',
  vintage = 'Antiguo',
  immutable = 'Inmutable'
}
export interface ProductI {
  id: number;
  name: string;
  sellIn: number;
  quality: number;
  type: ProductType;
}
export class Product {
  id: number;
  name: string;
  sellIn: number;
  quality: number;
  type: ProductType

  constructor(id: number, name: string, sellIn: number, quality: number, type: ProductType) {
    this.id = id;
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.type = type;
  }
}
