import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignInInterface } from './signin.interface';
import { AuthService } from './../auth.service';
import { ServerResponse } from './../../../common/server/response.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthComponent } from './../auth.component';
import { UserInterface, UserService } from '../../../common/user/user';

@Component({
  selector: 'wager-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  signIn_hide = true;
  currentUser: UserInterface;
  subscriptions: Subscription[] = [];
  form: FormGroup;

  constructor(
    private thisDialogRef: MatDialogRef<AuthComponent>,
    private snackBar: MatSnackBar,
    private router: Router,
    private UserService: UserService,
    private authService: AuthService
  ) { }

  onSignIn(formObject: SignInInterface): void {
    // push into list
    this.subscriptions.push(
      this.authService.signIn(formObject).subscribe((res: ServerResponse) => {

        if (res.code === 200) {
          localStorage.setItem('token', res.obj);

          // redirect to dashboard
          this.router.navigate(['/dashboard']);
          // close dialog
          this.thisDialogRef.close()

        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 8000,
          panelClass: ['error']
        });

        if (error.status === 401) {
          if (typeof(Storage) !== "undefined") {
            if (localStorage.clickcount) {
              localStorage.clickcount = Number(localStorage.clickcount)+1;
            } else {
              localStorage.clickcount = 1;
            }
            // check if click is >= 3 times
            if (localStorage.clickcount >= 3) {
              // set user details on shared data service
              // to enable the use of user details on other components
              //this.UserService.setUser(error.error.obj);

              // redirect to other page
              this.router.navigate(['/signin']);
              localStorage.removeItem('clickcount')
              // close dialog
              this.thisDialogRef.close()
            }
          }
        }
      })
    )

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.email
          ], updateOn: 'change'
      }),
      password: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[A-Za-z0-9!@#$%^&*()-_=+?/.>,<;:]{8,80}') // min of 8 any character lower/upper case with optionally any of attached special character or digit and mix of 80
          ], updateOn: 'change'
      })
    })
  }

  closeDialog(): void {
    // close dialog
    this.thisDialogRef.close()
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
