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
import { FlexLayoutModule } from '@angular/flex-layout';
import { BoxMenuModule } from './box-menu/box-menu.module';

@NgModule({
  declarations: [MainComponent, AccountActivationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    BoxMenuModule
  ],
  exports: [MainComponent, AccountActivationComponent],
  providers: [UserService, MainService, AccountActivationService]
})
export class MainModule { }
