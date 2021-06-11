import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ContactInterface, ContactService} from './contact.service';

@Component({
  selector: 'wager-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', './contact.mobile.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      names: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.email
          ], updateOn: 'change'
      }),
      email: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.email
          ], updateOn: 'change'
      }),
      phone: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.email
          ], updateOn: 'change'
      }),
      comments: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.email
          ], updateOn: 'change'
      }),
      
    })
  }

  onSubmit(contactObj: ContactInterface) {
    // push into list
    this.subscriptions.push(
      this.contactService.saveContact(contactObj).subscribe((res) => {
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
