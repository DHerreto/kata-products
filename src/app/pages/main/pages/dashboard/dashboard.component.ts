import { Component, OnInit } from '@angular/core';
import { Product, ProductI, ProductType } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService
      .getProducts()
      .subscribe(
        (products: ProductI[]) =>
          (this.products = products.map(
            (prod: ProductI) =>
              new Product(
                prod.id,
                prod.name,
                prod.quality,
                prod.sellIn,
                prod.type
              )
          ))
      );
  }

  simulation(): void {
    for (let i = 0; i < this.products.length; i++) {
      if (
        this.products[i].type != ProductType.vintage &&
        this.products[i].type != ProductType.cured
      ) {
        if (this.products[i].quality > 0) {
          if (this.products[i].type != ProductType.immutable) {
            this.products[i].quality = this.products[i].quality - 1;
          }
        }
      } else {
        if (this.products[i].quality < 50) {
          this.products[i].quality = this.products[i].quality + 1;
          if (this.products[i].type == ProductType.cured) {
            if (this.products[i].sellIn < 11) {
              if (this.products[i].quality < 50) {
                this.products[i].quality = this.products[i].quality + 1;
              }
            }
            if (this.products[i].sellIn < 6) {
              if (this.products[i].quality < 50) {
                this.products[i].quality = this.products[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.products[i].type != ProductType.immutable) {
        this.products[i].sellIn = this.products[i].sellIn - 1;
      }
      if (this.products[i].sellIn < 0) {
        if (this.products[i].type != ProductType.vintage) {
          if (this.products[i].type != ProductType.cured) {
            if (this.products[i].quality > 0) {
              if (this.products[i].type != ProductType.immutable) {
                this.products[i].quality = this.products[i].quality - 1;
              }
            }
          } else {
            this.products[i].quality =
              this.products[i].quality - this.products[i].quality;
          }
        } else {
          if (this.products[i].quality < 50) {
            this.products[i].quality = this.products[i].quality + 1;
          }
        }
      }
    }
  }
}
