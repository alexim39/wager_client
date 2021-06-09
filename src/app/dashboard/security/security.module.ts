import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityComponent } from './security.component';
import { PipesModule } from './../../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './../../common/user/user';
import { MaterialModule } from './../../common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { PasswordComponent } from './password/password.component';
import { ChangePasswordComponent } from './password/change-password/change-password.component';
import { MfaComponent } from './password/mfa/mfa.component';
import { PasswordService } from './password/password.service';


@NgModule({
  declarations: [
    SecurityComponent,
    PasswordComponent,
    ChangePasswordComponent,
    MfaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [],
  providers: [UserService, PasswordService]
})
export class SecurityModule { }
