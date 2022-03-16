import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product, ProductType } from './models/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BddService implements InMemoryDbService {
  createDb() {
    const products = [
      { id: 11, name: 'Pan', sellIn: 5, quality: 10, type: ProductType.perishable },
      { id: 12, name: 'Queso Azul', sellIn: 2, quality: 1, type: ProductType.vintage },
      { id: 13, name: 'Yogurt', sellIn: 5, quality: 6, type: ProductType.perishable },
      { id: 14, name: 'Sal', sellIn: 1, quality: 80, type: ProductType.immutable },
      { id: 15, name: 'Jamón', sellIn: 10, quality: 20, type: ProductType.cured },
    ];
    return {products};
  }

  // Overrides the genId method to ensure that a product always has an id.
  // If the products array is empty,
  // the method below returns the initial number (11).
  // if the products array is not empty, the method below returns the highest
  // product id + 1.
  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 11;
  }
}
