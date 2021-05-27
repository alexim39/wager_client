import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, UserInterface } from './../../common/user/user';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MainService } from './main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'scola-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  currentUser: UserInterface;
  isActive: boolean = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private mainService: MainService) { }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user) => {
        this.currentUser = user;
        this.isActive = user.isActive;
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


