import { Component, OnInit, Input } from '@angular/core';
import { UserInterface } from './../../../common/user/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wager-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

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
