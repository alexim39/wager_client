import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, UserInterface } from './../../../common/user/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { EventEmitterService } from './../../common/event-emitter';
import { LayService, LayInterface } from '../lay.service';
import { DashboardClass } from '../../common/dashboard.class';


@Component({
  selector: 'wager-coinout',
  templateUrl: './coinout.component.html',
  styleUrls: ['./coinout.component.scss', './coinout.mobile.scss']
})
export class CoinoutComponent extends DashboardClass implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  user: UserInterface;

  // Submit Btn
  cashoutBtn: boolean;
  isInvestFromDepositBalance: boolean;


  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private layService: LayService,
    private eventEmitterService: EventEmitterService
  ) { 
    super()
    // disable btn by default
    this.cashoutBtn = true;
    this.isInvestFromDepositBalance = false;
  }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
      })
    )

  }

  // toggle switch box
  chooseInvestmntOptions(option: boolean): void {
    this.isInvestFromDepositBalance = option;
  }

  getCashout(value: number): void {
    if ( value >= 5000 && value <= 100000 ) { // Only activate btn when value is >= 5000
      this.cashoutBtn = false;
    } else { //  if ( value < 5000 ) {
      this.cashoutBtn = true;
    }
  }

  onSubmit(cashoutAmount: number) {

    if (!this.isInvestFromDepositBalance) { // toogle deposit source

      const coinoutObj: LayInterface = {
        userId: this.user._id,
        amount: cashoutAmount,
        layedFrom: 'deposit',
        period: 6, // 6 days used instead of 7 since sunday is not involed
        plan: 'Coinout',
        transactionId: super.generateTransactionId(),
        transactionStatus: 'completed', // Note: this values should come from the payment gateway - pending, failed or complete
      };

      // push into list
      this.subscriptions.push(
        this.layService.coinoutFromDeposit(coinoutObj).subscribe((res) => {
          if (res.code === 200) {
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['success']
            });

            // refresh balance to update new value
            this.eventEmitterService.refreshButtonClick();
          }
        }, (error) => {
          this.snackBar.open(`${error.error.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['error']
          });
        })
      )

    } else {

       const coinoutObj: LayInterface = {
        userId: this.user._id,
        amount: cashoutAmount,
        layedFrom: 'withdrawable',
        period: 6, // 6 days used instead of 7 since sunday is not involed
        plan: 'Coinout',
        transactionId: super.generateTransactionId(),
        transactionStatus: 'completed', // Note: this values should come from the payment gateway - pending, failed or complete
      };

      // push into list
      this.subscriptions.push(
        this.layService.coinoutFromWithdrawable(coinoutObj).subscribe((res) => {
          if (res.code === 200) {
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['success']
            });

            // refresh balance to update new value
            this.eventEmitterService.refreshButtonClick();
          }
        }, (error) => {
          this.snackBar.open(`${error.error.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['error']
          });
        })
      )
    }
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
