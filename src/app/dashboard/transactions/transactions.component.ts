import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService, UserInterface } from './../../common/user/user';

@Component({
  selector: 'wager-transactions',
  template:  `
  <div class="breadcrumb-wrap">
    <ul class="breadcrumb">
      <li>
        <a [routerLink]="['/dashboard']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Dashboard</a>
      </li>
      <li>transactions</li>
    </ul>
  </div>
  <mat-tab-group mat-align-tabs="center" *ngIf="user">
    <mat-tab label="Lay Transactions">
    <wager-lay [user]="user"></wager-lay>
    </mat-tab>
    <mat-tab label="Deposit Transactions">
    <wager-deposit [user]="user"></wager-deposit>
    </mat-tab>
    <mat-tab label="Withdraw Transactions">
      <wager-withdraw [user]="user"></wager-withdraw>
    </mat-tab>
  </mat-tab-group>
  `
})
export class TransactionsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user: UserInterface;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
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
