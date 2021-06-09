import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserInterface } from './../../../../common/user/user';

@Component({
  selector: 'wager-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss']
})
export class MfaComponent implements OnInit, OnDestroy{

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() user: UserInterface;

  constructor() { }

  ngOnInit(): void {
    //console.log(this.user)
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
