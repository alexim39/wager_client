import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { MaterialModule } from './../../common/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { WrongPassportComponent } from './wrong-passport/wrong-passport.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { NewPasswordService } from './new-password/new-password.service';
import { ForgotPasswordService } from './forgot-password/forgot-password.service';
import { ActivationService } from './activation/activation.service';
import { ActivationComponent } from './activation/activation.component';


@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent,
    SigninComponent,
    WrongPassportComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    ActivationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [],
  providers: [ForgotPasswordService, NewPasswordService, ActivationService]
})
export class AuthModule { }
