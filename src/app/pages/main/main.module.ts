import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainComponent } from "./main.component";
import { MainRoutingModule } from "./main-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [ MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: []
})
export class MainModule { };
