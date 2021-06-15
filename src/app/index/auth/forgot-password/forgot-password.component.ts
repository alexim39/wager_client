import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ForgotPasswordService, ForgotPasswordInterface } from './forgot-password.service';
import { UserService, UserInterface } from './../../../common/user/user';

@Component({
  selector: 'wager-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', './forgot-password.mobile.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  public form: FormGroup;
  user: UserInterface;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private forgotPasswordService: ForgotPasswordService
  ) { }

  onSubmit(forgotPassword: ForgotPasswordInterface) {

    // push into list
    this.subscriptions.push(
      this.forgotPasswordService.forgotPassword(forgotPassword).subscribe((res) => {

        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });
        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 4000,
          panelClass: ['error']
        })
      })
    )

  }

  ngOnInit(): void {
    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
      })
    )

    this.form = new FormGroup({
      email: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.email
          ], updateOn: 'change'
      }),

    })
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
