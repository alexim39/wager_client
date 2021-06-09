import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserInterface } from './../../../../common/user/user';
import {PasswordService, ChangePasswordInterface} from './../password.service';


@Component({
  selector: 'wager-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  hideCurrentPassword = true;
  hideNewPassword = true;
  @Input() user: UserInterface;
  passwordForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private passwordService: PasswordService
  ) { }

  ngOnInit(): void {

    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[A-Za-z0-9!@#$%^&*()-_=+?/.>,<;:]{8,80}') // min of 8 any character lower/upper case with optionally any of attached special character or digit and mix of 80
          ], updateOn: 'change'
      }),
      newPassword: new FormControl('', {
        validators:
          [
            Validators.required,            
            Validators.pattern('[A-Za-z0-9!@#$%^&*()-_=+?/.>,<;:]{8,80}') // min of 8 any character lower/upper case with optionally any of attached special character or digit and mix of 80
            //this.ageValidator
          ], updateOn: 'change'
      }),
    })
  }

  onSubmit(passwordObj: ChangePasswordInterface) {
    // ensure current and new password are not same
    if (passwordObj.currentPassword === passwordObj.newPassword) {
      this.snackBar.open(`Current password can not be the same with new password`, `Close`, {
        duration: 4000,
        panelClass: ['error']
      });
      return
    }
    // add user id
    passwordObj['userId'] = this.user._id;

    // push into list
    this.subscriptions.push(
      this.passwordService.changePassword(passwordObj).subscribe((res) => {
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
        });
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
