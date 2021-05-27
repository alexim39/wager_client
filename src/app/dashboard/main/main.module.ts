import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { UserService } from './../../common/user/user';
import { MaterialModule } from './../../common/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainService } from './main.service';
import { RouterModule } from '@angular/router';
import { AccountActivationComponent } from './account-activation/account-activation.component';
import { AccountActivationService } from './account-activation/account-activation.service';


@NgModule({
  declarations: [MainComponent, AccountActivationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [MainComponent, AccountActivationComponent],
  providers: [UserService, MainService, AccountActivationService]
})
export class MainModule { }
