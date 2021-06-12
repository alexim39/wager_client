import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { UserInterface } from './../../../common/user/user';
import { Subscription } from 'rxjs';
import { TransactionsInterface, TransactionsService } from './../../transactions/transactions.service';
import { TransactionsClass } from './../../transactions/transactions.class';

@Component({
  selector: 'wager-monthly-profit-graph',
  templateUrl: './monthly-profit-graph.component.html',
  styleUrls: ['./monthly-profit-graph.component.scss']
})
export class MonthlyProfitGraphComponent extends TransactionsClass implements OnInit, OnDestroy {

  @Input() user: UserInterface
  subscriptions: Subscription[] = [];
  profitArray: number[] = [];
  depositArray: number[] = [];

  barChartOptions: ChartOptions = { responsive: true  };
  barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartDataSets[] = [
    {
      data: this.profitArray,
      label: `Monthly Wager Profit for ${new Date().getFullYear()}`
    },
    {
      data: this.depositArray,
      label: `Monthly Wager deposit for ${new Date().getFullYear()}`
    }
  ]

  isEmptyResponse: Boolean;

  // init
  janTotalProfit: number = 0;
  janTotalDeposit: number = 0;

  febTotalProfit: number = 0;
  febTotalDeposit: number = 0;

  marTotalProfit: number = 0;
  marTotalDeposit: number = 0;

  aprTotalProfit: number = 0;
  aprTotalDeposit: number = 0;

  mayTotalProfit: number = 0;
  mayTotalDeposit: number = 0;

  junTotalProfit: number = 0;
  junTotalDeposit: number = 0;

  julTotalProfit: number = 0;
  julTotalDeposit: number = 0;

  augTotalProfit: number = 0;
  augTotalDeposit: number = 0;

  sepTotalProfit: number = 0;
  sepTotalDeposit: number = 0;

  octTotalProfit: number = 0;
  octTotalDeposit: number = 0;

  novTotalProfit: number = 0;
  novTotalDeposit: number = 0;

  decTotalProfit: number = 0;
  decTotalDeposit: number = 0;

  constructor(
    private transactionsService: TransactionsService,
  ) {
    super()
   }

   // check for empty response
  private emptyResponse(array: any) {
    if (array.length === 0) {
      // array empty or does not exist
      this.isEmptyResponse = false;
    }else{
      this.isEmptyResponse = true;
    }
  }

  ngOnInit(): void {
    this.getInvestmntHistory(this.user._id)
  }

  // Get current user investments histories
  private getInvestmntHistory(clientId: string) {
    // push into list
    this.subscriptions.push(
      this.transactionsService.getHistory(clientId).subscribe((res) => {
        if (res.code === 200) {

          // check empty response
          this.emptyResponse(res.obj);
          
          // sort arrays by date to return recent first
          /* const sortedResult = res.obj.sort((a: TransactionsInterface, b: TransactionsInterface) => {
            return <any>new Date(b.start) - <any>new Date(a.start);
          }); */

          // loop through returned array of history
          res.obj.forEach((history: TransactionsInterface) => {
            this.investmentProfit(history.plan, history.start, history.amount, history.period)
          })
  
        }
      })
    )
  }

  // Get investment profit
  private investmentProfit(plan: string, startDate: Date, amount: number, period: number) {

    //console.log(wager.games[0].status)
    const daysPast = super.getDaysPast(startDate);
    

    switch (new Date(startDate).getMonth()) {
      case 0:
        //console.log('jan')

        if (plan === 'Coinout') {
          const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
          this.janTotalProfit = this.janTotalProfit + profit;
          this.janTotalDeposit = this.janTotalDeposit + amount;
        }
        if (plan === 'Coinup') {
          const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
          this.janTotalProfit = this.janTotalProfit + profit;
          this.janTotalDeposit = this.janTotalDeposit + amount;
        }
        this.profitArray[0] = this.janTotalProfit;
        this.depositArray[0] = this.janTotalDeposit;
        break;

      case 1:
        //console.log('feb')

        if (plan === 'Coinout') {
          const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
          this.febTotalProfit = this.febTotalProfit + profit;
          this.febTotalDeposit = this.febTotalDeposit + amount;
        }
        if (plan === 'Coinup') {
          const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
          this.febTotalProfit = this.febTotalProfit + profit;
          this.febTotalDeposit = this.febTotalDeposit + amount;
        }
        this.profitArray[1] = this.febTotalProfit;
        this.depositArray[1] = this.febTotalDeposit;
        break;
      case 2:
        //console.log('mar')

        if (plan === 'Coinout') {
          const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
          this.marTotalProfit = this.marTotalProfit + profit;
          this.marTotalDeposit = this.marTotalDeposit + amount;
        }
        if (plan === 'Coinup') {
          const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
          this.marTotalProfit = this.marTotalProfit + profit;
          this.marTotalDeposit = this.marTotalDeposit + amount;
        }
        this.profitArray[2] = this.marTotalProfit;
        this.depositArray[2] = this.marTotalDeposit;
        break;
      case 3:
        //console.log('apr')

        if (plan === 'Coinout') {
          const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
          this.aprTotalProfit = this.aprTotalProfit + profit;
          this.aprTotalDeposit = this.aprTotalDeposit + amount;
        }
        if (plan === 'Coinup') {
          const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
          this.aprTotalProfit = this.aprTotalProfit + profit;
          this.aprTotalDeposit = this.aprTotalDeposit + amount;
        }
        this.profitArray[3] = this.aprTotalProfit;
        this.depositArray[3] = this.aprTotalDeposit;
        break;
      case 4:
        //console.log('may')

        if (plan === 'Coinout') {
          const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
          this.mayTotalProfit = this.mayTotalProfit + profit;
          this.mayTotalDeposit = this.mayTotalDeposit + amount;
        }
        if (plan === 'Coinup') {
          const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
          this.mayTotalProfit = this.mayTotalProfit + profit;
          this.mayTotalDeposit = this.mayTotalDeposit + amount;
        }
        this.profitArray[4] = this.mayTotalProfit;
        this.depositArray[4] = this.mayTotalDeposit;
        break;
      case 5:
        //console.log('jun')
        
        if (plan === 'Coinout') {
          const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
          this.junTotalProfit = this.junTotalProfit + profit;
          this.junTotalDeposit = this.junTotalDeposit + amount;
        }
        if (plan === 'Coinup') {
          const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
          this.junTotalProfit = this.junTotalProfit + profit;
          this.junTotalDeposit = this.junTotalDeposit + amount;
        }
        this.profitArray[5] = this.junTotalProfit;
        this.depositArray[5] = this.junTotalDeposit;
        break;

      case 6:
        //console.log('jul')

        if (plan === 'Coinout') {
          const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
          this.julTotalProfit = this.julTotalProfit + profit;
          this.julTotalDeposit = this.julTotalDeposit + amount;
        }
        if (plan === 'Coinup') {
          const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
          this.julTotalProfit = this.julTotalProfit + profit;
          this.julTotalDeposit = this.julTotalDeposit + amount;
        }
        this.profitArray[6] = this.julTotalProfit;
        this.depositArray[6] = this.julTotalDeposit;
        break;
      case 7:
        //console.log('aug')

        if (plan === 'Coinout') {
          const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
          this.augTotalProfit = this.augTotalProfit + profit;
          this.augTotalDeposit = this.augTotalDeposit + amount;
        }
        if (plan === 'Coinup') {
          const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
          this.augTotalProfit = this.augTotalProfit + profit;
          this.augTotalDeposit = this.augTotalDeposit + amount;
        }
        this.profitArray[7] = this.augTotalProfit;
        this.depositArray[7] = this.augTotalDeposit;
        break;
      case 8:
        //console.log('sep')

        if (plan === 'Coinout') {
          const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
          this.sepTotalProfit = this.sepTotalProfit + profit;
          this.sepTotalDeposit = this.sepTotalDeposit + amount;
        }
        if (plan === 'Coinup') {
          const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
          this.sepTotalProfit = this.sepTotalProfit + profit;
          this.sepTotalDeposit = this.sepTotalDeposit + amount;
        }
        this.profitArray[8] = this.sepTotalProfit;
        this.depositArray[8] = this.sepTotalDeposit;
        break;
      case 9:
        //console.log('oct')

        if (plan === 'Coinout') {
          const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
          this.octTotalProfit = this.octTotalProfit + profit;
          this.octTotalDeposit = this.octTotalDeposit + amount;
        }
        if (plan === 'Coinup') {
          const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
          this.octTotalProfit = this.octTotalProfit + profit;
          this.octTotalDeposit = this.octTotalDeposit + amount;
        }
        this.profitArray[9] = this.octTotalProfit;
        this.depositArray[9] = this.octTotalDeposit;
        break;
      case 10:
        //console.log('nov')

        if (plan === 'Coinout') {
          const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
          this.novTotalProfit = this.novTotalProfit + profit;
          this.novTotalDeposit = this.novTotalDeposit + amount;
        }
        if (plan === 'Coinup') {
          const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
          this.novTotalProfit = this.novTotalProfit + profit;
          this.novTotalDeposit = this.novTotalDeposit + amount;
        }
        this.profitArray[10] = this.novTotalProfit;
        this.depositArray[10] = this.novTotalDeposit;
        break;
      case 11:
        //console.log('dec')

        if (plan === 'Coinout') {
          const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
          this.decTotalProfit = this.decTotalProfit + profit;
          this.decTotalDeposit = this.decTotalDeposit + amount;
        }
        if (plan === 'Coinup') {
          const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
          this.decTotalProfit = this.decTotalProfit + profit;
          this.decTotalDeposit = this.decTotalDeposit + amount;
        }
        this.profitArray[11] = this.decTotalProfit;
        this.depositArray[11] = this.decTotalDeposit;
    }

    // Check if its a closed deal
    /* if (this.closedDeals(startDate, period)) {

      if (plan === 'Coinout') {
        const profit = period * amount * super.get_X_Percent(2); // 2% of amount
        this.totalProfit = this.totalProfit + profit;
        this.totalDeposit = this.totalDeposit + amount;
        return profit;
      }
      if (plan === 'Coinup') {
        const profit = period * amount * super.get_X_Percent(1); // 1% of amount
        this.totalProfit = this.totalProfit + profit;
        this.totalDeposit = this.totalDeposit + amount;
        return profit;
      }
    } */
  }

  closedDeals(startDate: Date, period: number): boolean { // Method used to set closed deal on view
    return super.getUserClosedDeals(startDate, period);
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
