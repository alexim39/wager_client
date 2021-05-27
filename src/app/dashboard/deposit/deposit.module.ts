import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositComponent } from './deposit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../../common/material/material.module';
import { RouterModule } from '@angular/router';
import { UserService } from './../../common/user/user';


@NgModule({
  declarations: [
    DepositComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule
  ],
  exports: [],
  providers: [UserService]
})
export class DepositModule { }
