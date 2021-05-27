import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserInterface } from '../../common/user/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'scola-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  // user
  @Input() currentUser: UserInterface | any;
  // init subscriptions list
  subscriptions: Subscription[] = [];

  // notifications
  notifications: number = 1;

  constructor() { }

  ngOnInit(): void {
    //console.log(this.currentUser)
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
