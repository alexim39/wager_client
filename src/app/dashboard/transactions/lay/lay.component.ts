import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { UserInterface } from './../../../common/user/user';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionsClass } from './../transactions.class';
import { TransactionsInterface, TransactionsService } from './../transactions.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'wager-lay',
  templateUrl: './lay.component.html',
  styleUrls: ['./lay.component.scss']
})
export class LayComponent extends TransactionsClass implements OnInit, OnDestroy {

  @Input() user: UserInterface;
  subscriptions: Subscription[] = [];


  displayedColumns: string[] = ['position', 'transactionId', 'plan', 'amount', 'period', 'startDate', 'endDate', 'daysPast', 'daysLeft', 'profit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  histories: MatTableDataSource<TransactionsInterface>;
  historiesDetails: TransactionsInterface;

  // balance: number;
  totalProfit: number;
  totalDeposit: number;
  isTableExpanded = false;
  isEmptyResponse: Boolean;


  constructor(
    public transactionsService: TransactionsService,
    private breakpointObserver: BreakpointObserver
  ) {
    super();
    // Init totalProfit/totalDeposit
    this.totalProfit = 0;
    this.totalDeposit = 0;
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


  // Get current user investments histories
  private getInvestmntHistory(clientId: string): void {
    // push into list
    this.subscriptions.push(
      this.transactionsService.getHistory(clientId).subscribe((res) => {
        if (res.code === 200) {
  
          // check empty response
          this.emptyResponse(res.obj);
  
          setTimeout(() => this.histories.paginator = this.paginator);
          setTimeout(() => this.histories.sort = this.sort);
  
          // sort arrays by date to return recent first
          const sortedResult = res.obj.sort((a: TransactionsInterface, b: TransactionsInterface) => {
            return <any>new Date(b.start) - <any>new Date(a.start);
          });
  
          // Assign the data to the data source for the table to render
          this.histories = new MatTableDataSource(sortedResult);
        }
      })
    )
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
  expiryDate(startDate: Date, period: number): Date {
    // Get start date
    const strtDate = new Date(startDate);
    return new Date(strtDate.getTime() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * period);
  }

  // Number of days left before expiring
  numberOfDaysLeft(startDate: Date, period: number): number {
    // Days left
    const daysLeft = period - super.getDaysPast(startDate);
    if (daysLeft <= 0) {
      return 0;
    }
    return daysLeft;
  }

  // Number of day past
  getNumberOfDaysPast(startDate: Date, period: number): number {
    if (super.getDaysPast(startDate) > period) {
      return period;
    }
    return super.getDaysPast(startDate);
  }

  getLessThanOneWeek(startDate: Date, period: number): boolean {
    // Get less than 7 days
    return super.settLessThanOneWeek(7, startDate, period);
  }

  getLessThanOneMonth(startDate: Date, period: number): boolean {
    // Get less than 30 days
    return super.settLessThanOneMonth(30, startDate, period);
  }

  // Get investment profit
  investmentProfit(plan: string, startDate: Date, amount: number, period: number, wager: any): any {

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
  }

  closedDeals(startDate: Date, period: number): boolean { // Method used to set closed deal on view
    return super.getUserClosedDeals(startDate, period);
  }

  ngOnInit(): void {
    this.getInvestmntHistory(this.user._id)

    this.DeviceOrientation()
  }

  private DeviceOrientation() {
    const layoutChanges = this.breakpointObserver.observe([
      '(orientation: portrait)',
      '(orientation: landscape)',
    ]);

    layoutChanges.subscribe(result => {
      console.log(result)
      //updateMyLayoutForOrientationChange();
    });

  }


  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
