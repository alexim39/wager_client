import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { UserInterface } from './../../../common/user/user';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionsClass } from './../transactions.class';
import { TransactionsInterface, TransactionsService } from './../transactions.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'wager-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent extends TransactionsClass implements OnInit {

  @Input() user: UserInterface;
  subscriptions: Subscription[] = [];

  displayedColumns: string[] = ['position', 'investmentId', 'amount', 'transactionDate', 'status', 'method'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  histories: MatTableDataSource<any>;
  totalDeposit: number;
  isEmptyResponse: Boolean;


  constructor(
    private transactionsService: TransactionsService,
    private breakpointObserver: BreakpointObserver
  ) { 
    super();
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

  // get client deposit balance
  private getDeposits(clientId: string) {
    // push into list
    this.subscriptions.push(
      this.transactionsService.getDeposits(clientId).subscribe((res) => {
        if (res.code === 200) {  
  
          // check empty response
          this.emptyResponse(res.obj);
          
          // sort arrays by date to return recent first
          const sortedResult =  res.obj.sort((a: any, b: any) => {
            return <any>new Date(b.depositDate) - <any> new Date(a.depositDate);
          });
  
          // Assign the data to the data source for the table to render
          this.histories = new MatTableDataSource(sortedResult);
  
          setTimeout(() => this.histories.paginator = this.paginator);
          setTimeout(() => this.histories.sort = this.sort);
  
        }
        // get total sum of deposit
        this.totalDeposit = super.getTotalDeposit(res.obj);
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
  

  // Pending withdrawal
  setPendingCSS(status: string): boolean {
    if (status === 'Pending') {
      return true;
    }
    return false;
  }

  // Completed withdrawal
  setCompletedCSS(status: string): boolean {
    if (status === 'Completed') {
      return true;
    }
    return false;
  }

  // Rejected withdrawal
  setRejectedCSS(status: string): boolean {
    if (status === 'Rejected') {
      return true;
    }
    return false;
  }


  ngOnInit(): void {
    // call get balance
    this.getDeposits(this.user._id)
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
