import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PascalKebabCasePipeModule } from "src/app/pipes/pascal-kebab/pascal-kebab.pipe.module";
import { ProductDetailRoutingModule } from "./product-detail-routing.module";
import { ProductDetailComponent } from "./product-detail.component";

@NgModule({
  declarations: [
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductDetailRoutingModule,
    PascalKebabCasePipeModule
  ]
})
export class ProductDetailModule { };
