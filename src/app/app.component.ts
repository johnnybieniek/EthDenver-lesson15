import { Component } from '@angular/core';
import { ethers } from 'ethers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  wallet: ethers.Wallet | undefined;
  provider: ethers.providers.BaseProvider | undefined;

  constructor() {}

  createWallet() {
    this.provider = ethers.providers.getDefaultProvider('goerli');
    this.wallet = ethers.Wallet.createRandom().connect(this.provider);
  }
}
