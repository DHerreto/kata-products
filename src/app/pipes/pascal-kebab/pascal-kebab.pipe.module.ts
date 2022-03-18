import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PascalKebabCasePipe } from './pascal-kebab.pipe';



@NgModule({
  declarations: [
    PascalKebabCasePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PascalKebabCasePipe
  ]
})
export class PascalKebabCasePipeModule { }
