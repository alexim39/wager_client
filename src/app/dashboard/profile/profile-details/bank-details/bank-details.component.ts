import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserInterface } from './../../../../common/user/user';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { BankDetailsInterface, ProfileDetailsService } from '../profile-details.service';

@Component({
  selector: 'wager-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss', './bank-details.mobile.scss']
})
export class BankDetailsComponent implements OnInit {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() user: UserInterface;
  bankForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private profileDetailsService: ProfileDetailsService
  ) { }

  ngOnInit(): void {

    this.bankForm = new FormGroup({
      bankName: new FormControl(this.user.bankName, {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}')
          ], updateOn: 'change'
      }),
      accountNo: new FormControl(this.user.accountNo, {
        validators:
          [
            Validators.required,
            Validators.pattern('[0-9]{10}'),
            //this.ageValidator
          ], updateOn: 'change'
      }),
    })
  }

  onSubmit(bankDetails: BankDetailsInterface) {

    // add user id
    bankDetails['userId'] = this.user._id;

    // push into list
    this.subscriptions.push(
      this.profileDetailsService.updateBankProfile(bankDetails).subscribe((res) => {
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
