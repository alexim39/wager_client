import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { UserInterface } from './../../../common/user/user';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionsClass } from './../transactions.class';
import { TransactionsInterface, TransactionsService } from './../transactions.service';

@Component({
  selector: 'wager-lay',
  templateUrl: './lay.component.html',
  styleUrls: ['./lay.component.scss']
})
export class LayComponent extends TransactionsClass implements OnInit {

  @Input() user: UserInterface;
  subscriptions: Subscription[] = [];



  displayedColumns: string[] = ['position', 'investmentId', 'plan', 'amount', 'period', 'startDate', 'endDate', 'daysPast', 'daysLeft', 'profit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // init empty response
  public isEmptyResponse: Boolean;

  public histories: MatTableDataSource<TransactionsInterface>;
  private viewDetailedHistory: any[];
  public historiesDetails: TransactionsInterface;

  // balance: number;
  totalProfit: number;
  totalDeposit: number;

  isTableExpanded = false;


  constructor(
    private transactionsService: TransactionsService
  ) {
    super();
    // Init totalProfit/totalDeposit
    this.totalProfit = 0;
    this.totalDeposit = 0;
  }


  // Get current user investments histories
  private getInvestmntHistory(clientId: string) {
    this.transactionsService.getHistory(clientId).subscribe((res) => {

      if (res.code === 200) {

        let metchedArray: any = [];

        // loop through response data to check for game result status
        res.obj.forEach((response: any) => {
          if (response.plan === 'Wager') {
            // if transaction is wager

            response.wager.games.game.forEach((game: any) => {
              if (game.status === 'win') {
                // modify the outcome value of wager array
                game.status = 'win';
              }
              if (game.status === 'lose') {
                // modify the outcome value of wager arryay
                game.status = 'lose';

              }
              if (game.status === '') {
                // modify the outcome value of wager array
                game.status = 'running';
              }

            })
            metchedArray.push(response)

            // if transaction is not wager
          } else {
            metchedArray.push(response)
            //console.log(metchedArray)
          }
        })

        // Assign return objects for viewing detailed history
        this.viewDetailedHistory = metchedArray;
        //console.log(metchedArray)

        setTimeout(() => this.histories.paginator = this.paginator);
        setTimeout(() => this.histories.sort = this.sort);

        // sort arrays by date to return recent first
        const sortedResult = metchedArray.sort((a: any, b: any) => {
          return <any>new Date(b.start) - <any>new Date(a.start);
        });

        // Assign the data to the data source for the table to render
        this.histories = new MatTableDataSource(sortedResult);

      }

    }, (error) => {
      console.error(error);
    });
  }



  // apply filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.histories.filter = filterValue.trim().toLowerCase();

    if (this.histories.paginator) {
      this.histories.paginator.firstPage();
    }
  }

  // Get expiring date
  public expiryDate(startDate: Date, period: number): Date {
    // Get start date
    const strtDate = new Date(startDate);
    return new Date(strtDate.getTime() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * period);
  }

  // Number of days left before expiring
  public numberOfDaysLeft(startDate: Date, period: number): number {
    // Days left
    const daysLeft = period - super.getDaysPast(startDate);
    if (daysLeft <= 0) {
      return 0;
    }
    return daysLeft;
  }

  // Number of day past
  public getNumberOfDaysPast(startDate: Date, period: number): number {
    if (super.getDaysPast(startDate) > period) {
      return period;
    }
    return super.getDaysPast(startDate);
  }

  public getLessThanOneWeek(startDate: Date, period: number): boolean {
    // Get less than 7 days
    return super.settLessThanOneWeek(7, startDate, period);
  }

  public getLessThanOneMonth(startDate: Date, period: number): boolean {
    // Get less than 30 days
    return super.settLessThanOneMonth(30, startDate, period);
  }

  // closed wager outcome
  /* public losedWager(startDate: Date, period: number, wager: any): any {
    if (super.getUserClosedDeals(startDate, period) && wager) { // if its a closed deal and its a wager
      //console.log(super.isInArray(wager.games, 'lose'))
      if (super.isInArray(wager.games.game, 'lose')) {
        return true;
      } else if (super.isInArray(wager.games.game, 'win')) {
        return false;
      }
    }
  } */

  // unsettle wager outcome
  public unsettledWager(startDate: Date, period: number, wager: any): any {
    if (super.getUserClosedDeals(startDate, period) && wager) { // if its a closed deal and its a wager
      if (wager.outcome === null) {
        return true;
      } else {
        return false;
      }
    }
  }

  // Get investment profit
  public investmentProfit(plan: string, startDate: Date, amount: number, period: number, wager: any): any {

    //console.log(wager.games[0].status)
    const daysPast = super.getDaysPast(startDate);

    // Check if its a closed deal
    if (this.closedDeals(startDate, period)) {

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
      /* if (plan === 'Wager') {
        //console.log(wager.outcome)
        return super.getWagerProfit(wager, wager.odd, amount);
      } */
    }

    // If its a running deal
    if (plan === 'Coinout') {
      const profit = daysPast * amount * super.get_X_Percent(2); // 2% of amount
      this.totalProfit = this.totalProfit + profit;
      this.totalDeposit = this.totalDeposit + amount;
      return profit;
    }
    if (plan === 'Coinup') {
      const profit = daysPast * amount * super.get_X_Percent(1); // 1% of amount
      this.totalProfit = this.totalProfit + profit;
      this.totalDeposit = this.totalDeposit + amount;
      return profit;
    }
    /* if (plan === 'Wager') {
      return 0;
    } */
  }

  public closedDeals(startDate: Date, period: number): boolean { // Method used to set closed deal on view
    return super.getUserClosedDeals(startDate, period);
  }

  // Get investment status
  public investmentStatus(daysleft: number): string {
    if (daysleft <= 0) {
      return `<small class="expired"><b>Expired</b></small>`;
    }
    if (daysleft === 1) { // If 1 day left
      return `<small class="running">Still Running with a day left to go</small>`;
    }
    return `<small class="running">Still Running with</small> ${daysleft} days <small class="running">left to go</small>`;
  }

  // Get investment percentate in string %
  public investmentPercentage(plan: string, wager: any): any {
    if (plan === 'Coinout') {
      return '2%';
    }
    if (plan === 'Coinup') {
      return '1%';
    }
    /* if (plan === 'Wager') {
      return wager.odd + ' odd';
    } */
  }

  // Get tatal investment payout amount
  public investmentPayout(profit: number, amount: number, plan: string): any {
    if (plan === 'Coinout' || plan === 'Coinup') {
      return profit + amount;
    }
    /* if (plan === 'Wager') {
      return profit;
    } */
  }

  ngOnInit(): void {
    this.getInvestmntHistory(this.user._id)
  }


  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
