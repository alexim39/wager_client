import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, UserInterface } from '../../common/user/user';
import { BalanceClass } from './balance.class';
import { BalanceService } from './balance.service';
import { EventEmitterService } from './../common/event-emitter';
import { Subscription, Observable } from 'rxjs';
// declare jquery as any
declare const $: any;

@Component({
  selector: 'wager-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent extends BalanceClass implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  user: UserInterface;

  totalBalance: number;
  //withdrawable: number;

  constructor(
    private userService: UserService, 
    private balanceService: BalanceService, 
    private eventEmitterService: EventEmitterService
    ) {
    super();

    this.totalBalance = 0;
    //this.withdrawable = 0;
  }

  // Refresh deposit account balance
  refreshBalance() {
    // deposit account balance
    this.getDepositAccountBalance(this.user._id);
    //this.getWithdrawableAccountBalance(this.user._id);
  }

  // get client deposit balance
  private getDepositAccountBalance(userId: string): void {
    this.balanceService.getAccountBalance(userId).subscribe((res) => {
      if (res.code === 200) {
        this.totalBalance = res.obj;
      }
    }, (error) => {
      console.error(error)
    })
  }

  // get client withdrawable balance
 /*  private getWithdrawableAccountBalance(clientId: string): void {
    this.balanceService.getClientWithdrawableAccountBalance(clientId).subscribe((response: any) => {
      if (response.message === 'done') {
        this.withdrawable = response.data;
      }
      
    }, (error) => {
      console.error(error)
    })
  } */

  ngOnInit() {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
        // call get balance
        this.getDepositAccountBalance(this.user._id);
        //this.getWithdrawableAccountBalance(this.user._id);
      })
    )
    

    // call refresh method from event emitter service
    if (this.eventEmitterService.subsVar == undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.refreshDepositAccountBalance.subscribe(() => {    
        this.refreshBalance();    
      });    
    }

  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
