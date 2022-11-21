import { Component } from '@angular/core';
import { ethers } from 'ethers';
import { HttpClient } from '@angular/common/http';

const getProposalsRequest = 'http://localhost:3000/get-proposals';

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
  proposalVoteCount: number[];
  userBalance: number;
  userVotingPower: number;
  mintResult: string | undefined;

  constructor(private http: HttpClient) {
    this.seeProposals = false;
    this.defaultState = true;
    this.proposalList = [];
    this.proposalVoteCount = [];
    this.userBalance = 0;
    this.userVotingPower = 0;

    if (this.proposalList.length == 0) {
      this.http
        .get<string[]>(getProposalsRequest)
        .subscribe((proposalArray) => {
          console.log(proposalArray);
          this.proposalList = proposalArray;
        });
    }
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

    const balanceRequest = 'http://localhost:3000/user-balance/'.concat(
      this.randomWallet.address
    );

    this.http.get<number>(balanceRequest).subscribe((balance) => {
      console.log(`balance: ${balance}`);
      this.userBalance = balance;
    });

    const votingPowerRequest =
      'http://localhost:3000/user-voting-power/'.concat(
        this.randomWallet.address
      );
    this.http.get<number>(votingPowerRequest).subscribe((votingPower) => {
      console.log(`voting power: ${votingPower}`);
      this.userVotingPower = votingPower;
    });
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
