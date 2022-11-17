import { Component } from '@angular/core';
import { ethers } from 'ethers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-first-app';

  someText = 'This is some text';
  counter = 0;

  clickMe() {
    this.counter++;
  }
}
