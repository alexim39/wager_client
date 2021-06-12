import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService, UserInterface } from './../../../common/user/user';

@Component({
  selector: 'wager-box-menu',
  //styles: ['div { width: auto; margin-top: 1rem;}'],
  template: `
    <div *ngIf="user" fxLayout="row" fxLayout.xs="column" fxLayoutGap="1rem" fxLayoutAlign="space-between center">
      <wager-fgr fxFlex="25" [user]="user"></wager-fgr>
      <wager-active-plan-profit fxFlex="25" [user]="user"></wager-active-plan-profit>
      <wager-active-plan-deposit fxFlex="25" [user]="user"></wager-active-plan-deposit>
      <wager-pending-widrawal fxFlex="25" [user]="user"></wager-pending-widrawal>
  </div>`
})
export class BoxMenuComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user: UserInterface;

  constructor(
    private userService: UserService
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
