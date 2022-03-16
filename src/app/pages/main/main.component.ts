import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public openMenu:boolean = false;
  public title: string = 'Kata Angular'

  constructor() {}
}
