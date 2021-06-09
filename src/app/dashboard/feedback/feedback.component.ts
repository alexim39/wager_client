import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService, UserInterface } from './../../common/user/user';
import {FeedbackService, FeedbackInterface} from './feedback.service';

@Component({
  selector: 'wager-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user: UserInterface;
  feedbackForm: FormGroup;


  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
      })
    )

    this.feedbackForm = new FormGroup({
      tellUsAbout: new FormControl('', {validators: 
        [
          Validators.required,
          //Validators.pattern('[A-Za-z]{2,80}')
        ], updateOn: 'change'
      }),
      feedbackMsg: new FormControl('', {validators: 
        [
          Validators.required,
          //Validators.pattern('[A-Za-z]{2,80}'),
        ], updateOn: 'change'
      }),
      reply: new FormControl(false),
    })
  }

  onSubmit(feedbackObj: FeedbackInterface){

    // attach the user id
    feedbackObj['userId'] = this.user._id;
    
    // push into list
    this.subscriptions.push(
      this.feedbackService.create(feedbackObj).subscribe((res) => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });
          
          // reset form
          //this.formsManager.resetForm(this.feedbackForm);
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
