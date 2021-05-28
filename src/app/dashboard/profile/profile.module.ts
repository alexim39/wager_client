import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../common/material/material.module';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { PipesModule } from './../../common/pipes/pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './../../common/user/user';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeleteProfileComponent } from './profile-details/delete-profile/delete-profile.component';
import { BankDetailsComponent } from './profile-details/bank-details/bank-details.component';

@NgModule({
  declarations: [
    ProfileComponent, 
    ProfileDetailsComponent, 
    DeleteProfileComponent, 
    BankDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    PipesModule,
    RouterModule
  ],
  exports: [ProfileComponent, ProfileDetailsComponent],
  providers: [UserService]
})
export class ProfileModule { }