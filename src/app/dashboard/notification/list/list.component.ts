import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserInterface, UserService } from '../../../common/user/user';
import { Subscription } from 'rxjs';
import { NotificationService, NotificationInterface } from './../notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'wager-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user: UserInterface;
  notifications: MatTableDataSource<NotificationInterface>;

  displayedColumns: string[] = ['sn', 'title', 'msg', 'source', 'date', 'msr', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // notifications - number of unread notification
  notificationCount: number = 0;
  isEmptyResponse: Boolean;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) { }

  // check for empty response
  private emptyResponse(array: any) {
    if (array.length === 0) {
      // array empty or does not exist
      this.isEmptyResponse = false;
    }else{
      this.isEmptyResponse = true;
    }
  }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
        
        this.notificationService.getNotifications(this.user._id).subscribe((res) => {
          if (res.code === 200) {

            // check empty response
            this.emptyResponse(res.obj);

            // sort arrays by date to return recent first
          const sortedResult =  res.obj.sort((a: NotificationInterface, b: NotificationInterface) => {
            return <any>new Date(b.createDate) - <any> new Date(a.createDate);
          });

            // set notification counter
          this.getNotificationCounter(sortedResult);

            // Assign the data to the data source for the table to render
            this.notifications = new MatTableDataSource(res.obj);

            setTimeout(() => this.notifications.paginator = this.paginator);
            setTimeout(() => this.notifications.sort = this.sort);
          }
        })
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

  deleteNotification(id: string) {
    const confirmDelete = confirm(`This action will delete the selected notification from your profile`);
    if (confirmDelete) {
      // push into list
      this.subscriptions.push(
        this.notificationService.deleteNotification(id).subscribe((res) => {
          if (res.code === 200) {
            // process returned response
            //this.notificationCount = this.notificationCount - 1;
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['success']
            });
          }
        })
      )
    }
  }

  markAsRead(id: string) {
    // push into list
    this.subscriptions.push(
      this.notificationService.markAsRead(id).subscribe((res) => {
        if (res.code === 200) {
          // process returned response
          //this.notificationCount = this.notificationCount - 1;
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });
          // refresh balance to update new value
          //this.eventEmitterService.refreshButtonClick();
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
