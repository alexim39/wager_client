import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { SignUpInterface } from './signup.interface';
import { ServerResponse } from './../../../common/server/response.interface';
import { AuthService } from './../auth.service';
import { AuthComponent } from './../auth.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'wager-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', './signup.mobile.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  signUp_hide = true;
  // init subscriptions list
  subscriptions: Subscription[] = [];
  form: FormGroup;  
  isSpinning: boolean = false;


  constructor(
    private thisDialogRef: MatDialogRef<AuthComponent>,
    private snackBar: MatSnackBar,
    private auth: AuthService) { }

  onSignUp(formObject: SignUpInterface): void {
    this.isSpinning = true;

    // push into list
    this.subscriptions.push(

      this.auth.signUp(formObject).subscribe((res: ServerResponse) => {

        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 8000,
            panelClass: ['success']
          });
          // close dialog
          this.thisDialogRef.close()
          // stop spinner
          this.isSpinning = false;
        }

      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 8000,
          panelClass: ['error']
        });
        // stop spinner
        this.isSpinning = false;
      })
    )
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      lastname: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[A-Za-z]{2,80}')
          ], updateOn: 'change'
      }),
      firstname: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[A-Za-z]{2,80}'),
            //this.ageValidator
          ], updateOn: 'change'
      }),
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
      }),
      tnc: new FormControl(false, {
        validators:
          [
            Validators.requiredTrue
          ]
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
