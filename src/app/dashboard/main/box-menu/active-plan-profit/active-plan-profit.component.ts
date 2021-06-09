import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserInterface } from './../../../../common/user/user';
import { BoxMenuClass } from './../box-menu.class';
import { Subscription } from 'rxjs';
import { TransactionsService, TransactionsInterface } from './../../../transactions/transactions.service';

@Component({
  selector: 'wager-active-plan-profit',
  templateUrl: './active-plan-profit.component.html',
  styleUrls: ['./active-plan-profit.component.scss']
})
export class ActivePlanProfitComponent extends BoxMenuClass implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  @Input() user: UserInterface;
  // init total active profit
  totalActivePlanProfit: number;

  constructor(
    private transactionsService: TransactionsService
  ) { 
    super();
    this.totalActivePlanProfit = 0;
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
      this.setprofits(investmnts[i].plan, investmnts[i].start, investmnts[i].amount, investmnts[i].period);
    }
  }


  private setprofits(plan: string, startDate: Date, amount: number, period: number): void {
    const daysPast =  super.getDaysPast(startDate);

    // Check if its not a closed deal
    if (!super.getUserClosedDeals(startDate, period)) {
      // If its a running deal
      if (plan === 'Coinout') {
        const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
        this.totalActivePlanProfit = this.totalActivePlanProfit + profit;
        return;
      }
      if (plan === 'Coinup') {
        const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
        this.totalActivePlanProfit = this.totalActivePlanProfit + profit;
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
