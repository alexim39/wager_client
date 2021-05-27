import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, UserInterface } from './../../../common/user/user';
import { ProfileDetailsInterface, ProfileDetailsService } from './profile-details.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'scola-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss', './profile-details.mobile.scss']
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  profileForm: FormGroup;
  user: UserInterface;
  isActive: boolean;
  imagePath: string = `./../../../assets/img/profile.jpg`;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private route: Router,
    private profileDetailsService: ProfileDetailsService
  ) { }


  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
        this.isActive = this.user.isActive;

        this.profileForm = new FormGroup({
          firstname: new FormControl(this.user.firstname, {
            validators:
              [
                Validators.required,
                Validators.pattern('[A-Za-z]{2,80}')
              ], updateOn: 'change'
          }),
          lastname: new FormControl(this.user.lastname, {
            validators:
              [
                Validators.required,
                Validators.pattern('[A-Za-z]{2,80}'),
                //this.ageValidator
              ], updateOn: 'change'
          }),
          email: new FormControl(this.user.email.toLowerCase(), {
            validators:
              [
                Validators.required,
                Validators.email
              ], updateOn: 'change'
          }),
          phone: new FormControl(this.user.phone, {
            validators:
              [
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11),
                //Validators.pattern('[0-9]{1,11}'),
              ], updateOn: 'change'
          }),
          about: new FormControl(this.user.about, {
            validators:
              [
                //Validators.required,
                //Validators.pattern('[A-Za-z]{2,50}'),
                Validators.maxLength(100),
              ], updateOn: 'change'
          }),
        })
      })
    )

  }

  onSubmit(profile: ProfileDetailsInterface) {

    // add user id
    profile['userId'] = this.user._id;

    // push into list
    this.subscriptions.push(

      this.profileDetailsService.update(profile).subscribe((res) => {
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

  // delete profile
  deleteProfile() {
    const confirmDelete = confirm(`You are about to permanently delete your profile from Kudutask, by continuing you will loss access to your profile and all information you have in Kudutask`);
    if (confirmDelete) {

      // push into list
      this.subscriptions.push(
        this.profileDetailsService.delete(this.user._id).subscribe((res) => {
          if (res.code === 200) {
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['success']
            });

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
