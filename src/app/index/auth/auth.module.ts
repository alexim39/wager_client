import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { MaterialModule } from './../../common/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { WrongPassportComponent } from './wrong-passport/wrong-passport.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent,
    SigninComponent,
    WrongPassportComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [],
  providers: []
})
export class AuthModule { }
