import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserInterface } from './../../../../common/user/user';
import { BoxMenuClass } from './../box-menu.class';
import { Subscription } from 'rxjs';
import { TransactionsService } from './../../../transactions/transactions.service';

@Component({
  selector: 'wager-pending-widrawal',
  templateUrl: './pending-widrawal.component.html',
  styleUrls: ['./pending-widrawal.component.scss']
})
export class PendingWidrawalComponent extends BoxMenuClass implements OnInit, OnDestroy  {

  subscriptions: Subscription[] = [];
  @Input() user: UserInterface;
  // init withdraw request
  withdrawal: number;

  constructor(
    private transactionsService: TransactionsService
  ) { 
    super();
    this.withdrawal = 0;
  }

  
  // get client withdraw request
  private withdrawRequest(clientId: string) {
    // push into list
    this.subscriptions.push(
      this.transactionsService.getWithdrawRequest(clientId).subscribe((res) => {
        if (res.code === 200) {
          //console.log(res.obj)

          // get total sum of pending withdraw request
          this.withdrawal = super.getTotalPendingWithdrawal(res.obj);
        }
      })
    )
  }

  ngOnInit(): void {
    //console.log(this.user)
    this.withdrawRequest(this.user._id);
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
