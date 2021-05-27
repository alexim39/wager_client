import { Component, OnInit, Input } from '@angular/core';
import { UserInterface } from './../../../common/user/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wager-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {

  @Input() user: UserInterface;
  subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
