import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, UserInterface } from './../../common/user/user';
import { Subscription } from 'rxjs';
import { WithdrawDetailsService, WithdrawDetailsInterface } from './withdraw.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitterService } from './../common/event-emitter';

@Component({
  selector: 'wager-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss', './withdraw.mobile.scss']
})
export class WithdrawComponent implements OnInit {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  user: UserInterface;
  onSubmitBtn: boolean;
  isSpinning: boolean = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private withdrawDetailsService: WithdrawDetailsService,
    private eventEmitterService: EventEmitterService
  ) { }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user) => {
        this.user = user;
      })
    )

  }

  checkAmount(amount: number): void {
    if ( amount >= 1000 && amount <= 1000000 ) {
      this.onSubmitBtn = true;
    } else { 
      this.onSubmitBtn = false;
    }
  }

  onSubmit(amount: number) {
    this.isSpinning = true;

     // add user id
     const bankObj: WithdrawDetailsInterface = {
      userId: this.user._id,
      bankName: this.user.bankName,
      accountNo: this.user.accountNo,
      amount: amount
     }

     // push into list
     this.subscriptions.push(
       this.withdrawDetailsService.withdraw(bankObj).subscribe((res) => {
         if (res.code === 200) {
           this.snackBar.open(`${res.msg}`, `Close`, {
             duration: 4000,
             panelClass: ['success']
           });

           // refresh balance to update new value
           this.eventEmitterService.refreshButtonClick();
           // stop spinner
           this.isSpinning = false;
         }
       }, (error) => {
         this.snackBar.open(`${error.error.msg}`, `Close`, {
           duration: 4000,
           panelClass: ['error']
         });
         // stop spinner
         this.isSpinning = false;
       })
     )
  }


  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
