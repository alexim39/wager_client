import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserInterface } from './../../../../common/user/user';
import { BoxMenuClass } from './../box-menu.class';
import { Subscription } from 'rxjs';
import { TransactionsService, TransactionsInterface } from './../../../transactions/transactions.service';

@Component({
  selector: 'wager-active-plan-deposit',
  templateUrl: './active-plan-deposit.component.html',
  styleUrls: ['./active-plan-deposit.component.scss']
})
export class ActivePlanDepositComponent extends BoxMenuClass implements OnInit, OnDestroy  {

  subscriptions: Subscription[] = [];
  @Input() user: UserInterface;
  // init total active deposit amount
  totalActivePlanDeposit: number;

  constructor(
    private transactionsService: TransactionsService
  ) { 
    super();
    this.totalActivePlanDeposit = 0;
  }

   // get client investment histories
   private getInvestmentHistories(userId: string) {
    
    // push into list
    this.subscriptions.push(
      this.transactionsService.getHistory(userId).subscribe((res) => {
        if (res.code === 200) {
          //console.log(res.obj)
          this.getInvestedAmounts(res.obj);
        }
      })
    )
  }

  private getInvestedAmounts(investmnts: TransactionsInterface[]) {
    for (let i = 0; i < investmnts.length; i++) { // Loop through objects
      // Call getProfit() Method
      this.setDeposits(investmnts[i].plan, investmnts[i].start, investmnts[i].amount, investmnts[i].period);
    }
  }

  private setDeposits(plan: string, startDate: Date, amount: number, period: number): void {

    // Check if its not a closed deal
    if (!super.getUserClosedDeals(startDate, period)) {
      // If its a running deal
      if (plan === 'Coinout') {
        this.totalActivePlanDeposit = this.totalActivePlanDeposit + amount;
        return;
      }
      if (plan === 'Coinup') {
        this.totalActivePlanDeposit = this.totalActivePlanDeposit + amount;
      }
    }

  }

  ngOnInit(): void {
    //console.log(this.user)
    this.getInvestmentHistories(this.user._id)
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
