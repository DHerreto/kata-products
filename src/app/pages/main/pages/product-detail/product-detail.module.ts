import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProductDetailRoutingModule } from "./product-detail-routing.module";
import { ProductDetailComponent } from "./product-detail.component";

@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductDetailRoutingModule
  ]
})
export class ProductDetailModule { };
