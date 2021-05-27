import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../common/material/material.module';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { PipesModule } from './../../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './../../common/user/user';

@NgModule({
  declarations: [ProfileComponent, ProfileDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule,
    RouterModule
  ],
  exports: [ProfileComponent, ProfileDetailsComponent],
  providers: [UserService]
})
export class ProfileModule { }