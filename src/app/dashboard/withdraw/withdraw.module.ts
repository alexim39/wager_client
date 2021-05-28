import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './../../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './../../common/user/user';
import { MaterialModule } from './../../common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { WithdrawComponent } from './withdraw.component';
import { WithdrawDetailsService } from './withdraw.service';




@NgModule({
  declarations: [
    WithdrawComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [],
  providers: [UserService, WithdrawDetailsService]
})
export class WithdrawModule { }
