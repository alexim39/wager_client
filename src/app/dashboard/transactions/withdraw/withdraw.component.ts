import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { UserInterface } from './../../../common/user/user';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionsClass } from './../transactions.class';
import { WithdrawalInterface, TransactionsService } from './../transactions.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EventEmitterService } from './../../common/event-emitter';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'wager-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent extends TransactionsClass implements OnInit  {

  @Input() user: UserInterface;
  subscriptions: Subscription[] = [];

  displayedColumns: string[] = ['position', 'Amount', 'Bank', 'Account', 'Date', 'Status', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  withdrawals: MatTableDataSource<WithdrawalInterface>;
  disable: boolean;
  totalWithdrawal: number
  isEmptyResponse: Boolean;

  constructor(
    private transactionsService: TransactionsService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private eventEmitterService: EventEmitterService
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


  // get client withdraw request
  private withdrawRequest(clientId: string) {
    this.transactionsService.getWithdrawRequest(clientId).subscribe((res) => {

      if (res.code === 200) {

        // check empty response
        this.emptyResponse(res.obj);

        // sort arrays by date to return recent first
        const sortedResult =  res.obj.sort((a: WithdrawalInterface, b: WithdrawalInterface) => {
          return <any>new Date(b.withdrawDate) - <any> new Date(a.withdrawDate);
        });

        // Assign the data to the data source for the table to render
        this.withdrawals = new MatTableDataSource(sortedResult);

        setTimeout(() => this.withdrawals.paginator = this.paginator);
        setTimeout(() => this.withdrawals.sort = this.sort);

        // get total sum of deposit
        this.totalWithdrawal = super.getTotalWithdrawal(res.obj);
      }
    }, (error) => {
      console.error(error);
    });
  }


  // apply filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.withdrawals.filter = filterValue.trim().toLowerCase();

    if (this.withdrawals.paginator) {
      this.withdrawals.paginator.firstPage();
    }
  }

  cancelWithdrawal(withdrawId: string) {
    this.transactionsService.cancelWithdrawRequest(withdrawId).subscribe((res) => {
      if (res.code === 200) {
        this.snackBar.open(`${res.msg}`, `Close`, {
          duration: 4000,
          panelClass: ['success']
        });
        // refresh balance to update new value
        this.eventEmitterService.refreshButtonClick();
        // reload the withdraw table
        this.withdrawRequest(this.user._id);
      }
    }, (error) => {
      this.snackBar.open(`${error.error.msg}`, `Close`, {
        duration: 4000,
        panelClass: ['error']
      });
    });
  }

  // Pending withdrawal
  setPendingCSS(status: string): boolean {
    if (status === 'Pending') {
      this.disable = false;
      return true;
    }
    return false;
  }

  // Completed withdrawal
  setCompletedCSS(status: string): boolean {
    if (status === 'Completed') {
      this.disable = true;
      return true;
    }
    return false;
  }

  // Rejected withdrawal
  setRejectedCSS(status: string): boolean {
    if (status === 'Rejected') {
      this.disable = true;
      return true;
    }
    return false;
  }


  ngOnInit(): void {
    this.withdrawRequest(this.user._id);
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
