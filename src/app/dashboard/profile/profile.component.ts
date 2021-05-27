import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserInterface } from '../../common/user/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'scola-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy{

  imagePath: string = `./../../../assets/img/profile.jpg`;

  @Input() currentUser: UserInterface | any;
  // init subscriptions list
  subscriptions: Subscription[] = [];

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
