import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SignInInterface } from './../signin/signin.interface'
import { ServerResponse } from './../../../common/server/response.interface';
import { AuthService } from './../auth.service';
import { UserService, UserInterface } from './../../../common/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'wager-wrong-passport',
  templateUrl: './wrong-passport.component.html',
  styleUrls: ['./wrong-passport.component.scss', './wrong-passport.mobile.scss']
})
export class WrongPassportComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  passwordHide = true;
  form: FormGroup;
  user: UserInterface;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
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

        }
      }, (error: ErrorEvent) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 8000,
          panelClass: ['error']
        });
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
      password: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[A-Za-z0-9!@#$%^&*()-_=+?/.>,<;:]{8,80}') // min of 8 any character lower/upper case with optionally any of attached special character or digit and mix of 80
          ], updateOn: 'change'
      })
    })
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
