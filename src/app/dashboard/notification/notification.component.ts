/*
User gets notification:
  1. after making deposit (payment)
  2. when admin sends general info
  3. when withdraw request is completed
  4. when withdraw request is raised
  5. when user change password
  6. when LAY plan period is complete
*/

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserInterface } from '../../common/user/user';
import { Subscription } from 'rxjs';
import { NotificationService, NotificationInterface } from './notification.service';


@Component({
  selector: 'scola-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  // user
  @Input() currentUser: UserInterface;
  // init subscriptions list
  subscriptions: Subscription[] = [];
  notifications: NotificationInterface[];
  UnreadNotifications: NotificationInterface[] = [];

  // notifications - number of unread notification
  notificationCount: number = 0;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    //console.log(this.currentUser)

    // push into list
    this.subscriptions.push(
      this.notificationService.getNotifications(this.currentUser._id).subscribe((res) => {
        if (res.code === 200) {
          // process returned response
          this.notifications = res.obj;
          
          // set notification counter
          this.getNotificationCounter(this.notifications);
          // get unread notification
          this.getUnreadNotificationCounter(this.notifications);
        }
      })
    )
  }

  private getNotificationCounter(notifications: NotificationInterface[]) {
    notifications.forEach((notification) => {
      if (notification.status == 'unread') {
        this.notificationCount = this.notificationCount + 1;
      }
    })
  }

  private getUnreadNotificationCounter(notifications: NotificationInterface[]) {
    notifications.forEach((notification) => {
      if (notification.status == 'unread') {
        this.UnreadNotifications.push(notification);
      }
    })
  }

  deleteNotification(id: string) {
    // push into list
    this.subscriptions.push(
      this.notificationService.deleteNotification(id).subscribe((res) => {
        if (res.code === 200) {
          // process returned response
          this.notificationCount = this.notificationCount - 1;
        }
      })
    )
  }

  markAsRead(id: string) {
    // push into list
    this.subscriptions.push(
      this.notificationService.markAsRead(id).subscribe((res) => {
        if (res.code === 200) {
          // process returned response
          this.notificationCount = this.notificationCount - 1;
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
