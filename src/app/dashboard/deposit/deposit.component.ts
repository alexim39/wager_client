import { Component, OnInit, OnDestroy, Inject, HostListener } from '@angular/core';
import { UserService, UserInterface } from './../../common/user/user';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';
import { DepositService, DepositInterface } from './deposit.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitterService } from './../common/event-emitter';
import { DashboardClass } from '../common/dashboard.class';
import { Router } from '@angular/router'
declare const payWithPaystack: any;

@Component({
  selector: 'wager-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent extends DashboardClass implements OnInit {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  user: UserInterface;
  // Submit Btn
  submitBtn: boolean = true;
  //paystackWindow: any;
  paystackPayload: any;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private depositService: DepositService,
    private eventEmitterService: EventEmitterService,
    private router: Router
  ) {
    super();
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

  getCashout(amount: number): void {
    if (amount >= 3000 && amount <= 100000) { // Only activate btn when value is >= 3000
      this.submitBtn = false;
    } else { //  if ( value < 5000 ) {
      this.submitBtn = true;
    }
  }

  onSubmit(amount: number) {

    const depositObj: DepositInterface = {
      userId: this.user._id,
      amount: amount,
      transactionId: super.generateTransactionId(),
      email: this.user.email,
      phone: this.user.phone,
      transactionMethod: 'paystack'
    };

    // external paystack function
    payWithPaystack(depositObj)
  }




  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
