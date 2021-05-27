import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, UserInterface } from './../../../common/user/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { EventEmitterService } from './../../common/event-emitter';
import { LayService, LayInterface } from '../lay.service';
import { DashboardClass } from '../../common/dashboard.class';

@Component({
  selector: 'wager-coinup',
  templateUrl: './coinup.component.html',
  styleUrls: ['./coinup.component.scss', './coinup.mobile.scss']
})
export class CoinupComponent extends DashboardClass implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  user: UserInterface;

  // Init Btn
  cashupBtn: boolean;
  // Cashup properties
  cashupField: number;
  cashupSelect: number;
  isInvestFromDepositBalance: boolean;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private layService: LayService,
    private eventEmitterService: EventEmitterService) {
      super();
      // disable btn by default
      this.cashupBtn = true;
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
  /* chooseInvestmntOptions(option: boolean): void {
    this.isInvestFromDepositBalance = option;
  } */
 
   // Validate User input details
   getCashup(value: number) {
     // Check if both input field are empty
     if (this.cashupField === undefined || this.cashupSelect === undefined) {
       this.cashupBtn = true;
       return;
     }
 
     if ( value >= 3000 && value <= 100000 ) { // Only activate btn when value is >= 3000
       this.cashupBtn = false;
     } else { // if ( value < 3000 ) {
       this.cashupBtn = true;
     }
   }
 
   
   // Submit Cashup Investment Details
   submitCashUp(cashupAmount: number, duration: number) {
 
     if (!this.isInvestFromDepositBalance) { // Check investmnt deposit options
 
       const cashupObj: LayInterface = {
         userId: this.user._id,
         amount: cashupAmount,
         layedFrom: 'deposit',
         period: duration,
         plan: 'Coinup',
         transactionId: super.generateTransactionId(),
         transactionStatus: 'completed' // Note: this values should come from the payment gateway - pending, failed or complete
       };
 
       // push into list
      this.subscriptions.push(
        this.layService.coinupFromDeposit(cashupObj).subscribe((res) => {
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
 
     } /* else { // Investment from user withdrawable balance
 
       const cashupObj: LayInterface = {
         userId: this.user._id,
         amount: cashupAmount,
         layedFrom: 'withdrawable',
         period: duration,
         plan: 'Coinup',
         transactionId: super.generateTransactionId(),
         transactionStatus: 'completed' // Note: this values should come from the payment gateway - pending, failed or complete
       };
 
       // push into list
      this.subscriptions.push(
       this.layService.coinupFromWithdrawable(cashupObj).subscribe((res) => {
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
 
     } */
   }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
