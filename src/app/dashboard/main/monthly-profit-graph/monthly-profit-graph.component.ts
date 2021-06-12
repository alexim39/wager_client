import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { UserInterface } from './../../../common/user/user';
import { Subscription } from 'rxjs';
import { TransactionsInterface, TransactionsService } from './../../transactions/transactions.service';

@Component({
  selector: 'wager-monthly-profit-graph',
  templateUrl: './monthly-profit-graph.component.html',
  styleUrls: ['./monthly-profit-graph.component.scss']
})
export class MonthlyProfitGraphComponent implements OnInit, OnDestroy {

  @Input() user: UserInterface
  subscriptions: Subscription[] = [];

  private d = new Date();
  //var n = d.getFullYear();

  barChartOptions: ChartOptions = {
    responsive: true
  };

  barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartDataSets[] = [
    {
      data: [2000, 900, 5333, 0, 9044, 12000, 3000, 0, 400, 3600, 1000, 900],
      label: `Monthly Wager Profit for ${this.d.getFullYear()}`
    }
  ]

  constructor(
    private transactionsService: TransactionsService,
  ) { }

  ngOnInit(): void {
    this.getInvestmntHistory(this.user._id)
  }

  // Get current user investments histories
  private getInvestmntHistory(clientId: string) {
    // push into list
    this.subscriptions.push(
      this.transactionsService.getHistory(clientId).subscribe((res) => {
        if (res.code === 200) {
          // sort arrays by date to return recent first
          const sortedResult = res.obj.sort((a: TransactionsInterface, b: TransactionsInterface) => {
            return <any>new Date(b.start) - <any>new Date(a.start);
          });

          console.log(sortedResult)
  
        }
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
