import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../../common/material/material.module';
import { UserService } from './../../common/user/user';

@NgModule({
  declarations: [ BalanceComponent ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [ BalanceComponent ],
  providers: [UserService]
})
export class BalanceModule { }
