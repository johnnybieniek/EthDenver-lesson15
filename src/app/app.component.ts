import { Component } from '@angular/core';
import { ethers } from 'ethers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  randomWallet: ethers.Wallet | undefined;
  provider: ethers.providers.BaseProvider | undefined;
  userWallet: ethers.Wallet | undefined;
  seeProposals: boolean | undefined;
  defaultState: boolean | undefined;
  proposalList: string[];

  constructor() {
    this.seeProposals = false;
    this.defaultState = true;
    this.proposalList = [];
  }

  goHome() {
    this.seeProposals = false;
    this.defaultState = true;
    this.randomWallet = undefined;
    this.userWallet = undefined;
  }

  createWallet() {
    this.defaultState = false;
    this.provider = ethers.providers.getDefaultProvider('goerli');
    this.randomWallet = ethers.Wallet.createRandom().connect(this.provider);
  }

  showProposals() {
    this.defaultState = false;
    this.seeProposals = true;
  }

  mintTokens(source: string) {
    let address: string;
    if (source == 'random') {
      address = this.randomWallet!.address;
    } else {
      address = this.userWallet!.address;
    }
    console.log(`${address} requested tokens!`);
  }

  getVotingPower(source: string) {
    let address: string;
    if (source == 'random') {
      address = this.randomWallet!.address;
    } else {
      address = this.userWallet!.address;
    }
    console.log(`${address} wants to get more voting power!`);
  }
}
