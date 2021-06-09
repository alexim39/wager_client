import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserInterface } from './../../../../common/user/user';
import { BoxMenuClass } from './../box-menu.class';
import { TransactionsService, TransactionsInterface } from './../../../transactions/transactions.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wager-fgr',
  templateUrl: './fgr.component.html',
  styleUrls: ['./fgr.component.scss']
})
export class FgrComponent extends BoxMenuClass implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  @Input() user: UserInterface;
  // init total active deposit amount
  private totalActivePlanDeposit: number;
  private interest: number; // Sum of amounts paid as interest (I)
  private time: number; // Sum of days of investment periods (T)
  //private principal: number;  // Sum of amounts invested (P)

  // init financial growth
  fgb: number;

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
          this.time = super.getObjectTimePropertySum(res.obj); // returns summed average of time period
          this.setFinancialGrowth(res.obj);
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

    //const daysPast =  super.getDaysPast(startDate);

    // Check if its not a closed deal
    if (!super.getUserClosedDeals(startDate, period)) {

      // If its a running deal
      if (plan === 'Coinout') {
        this.totalActivePlanDeposit = this.totalActivePlanDeposit + amount;
        this.interest = amount * super.get_X_Percent(2);
        return;
      }
      if (plan === 'Coinup') {
        this.totalActivePlanDeposit = this.totalActivePlanDeposit + amount;
        this.interest = amount * super.get_X_Percent(1);
      }
    }
  }


  private setFinancialGrowth(investmnts: TransactionsInterface[]) {

    const principal = super.getPrincipal(this.totalActivePlanDeposit, investmnts); // returns sum of average principal amount
    /* Using the formula r = i/pt for calculating interest rate */
    const rate = (this.interest / investmnts.length)  / (principal * this.time);
    this.fgb = rate * 100;
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
