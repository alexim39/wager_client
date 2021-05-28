import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserInterface } from './../../../../common/user/user';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileDetailsInterface, ProfileDetailsService } from '../profile-details.service';

@Component({
  selector: 'wager-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss', './delete-profile.mobile.scss']
})
export class DeleteProfileComponent implements OnInit {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() user: UserInterface;
  isChecked = false;

  constructor(
    private snackBar: MatSnackBar,
    private route: Router,
    private profileDetailsService: ProfileDetailsService
  ) { }

  ngOnInit(): void {
  }

  // delete profile
  deleteProfile() {
    const confirmDelete = confirm(`You are about to permanently delete your profile from Wager, by continuing you will loss access to your profile and all information you have in Wager`);
    if (confirmDelete) {

      // push into list
      this.subscriptions.push(
        this.profileDetailsService.deleteProfile(this.user._id).subscribe((res) => {
          if (res.code === 200) {
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['success']
            });
            localStorage.removeItem('token')
            // sign user out
            setTimeout(() => {
              // redirect user to task list
              this.route.navigateByUrl(`/`);
            }, 4000);
          }
        }, (error) => {
          this.snackBar.open(`${error.error.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['error']
          });
        })
      )
    }
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
