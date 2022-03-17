import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Product, ProductType } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  @Input() product!: Product;

  types: ProductType[] = Object.values(ProductType);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = +(this.route.snapshot.paramMap.get('id') || 0);
    this.productService
      .getProduct(id)
      .subscribe((product) => (this.product = new Product(
        product.id,
        product.name,
        product.sellIn,
        product.quality,
        product.type
      )));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.productService
      .updateProduct(this.product)
      .subscribe(() => this.goBack());
  }
}
