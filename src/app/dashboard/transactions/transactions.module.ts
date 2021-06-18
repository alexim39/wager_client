import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './../../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './../../common/user/user';
import { MaterialModule } from './../../common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TransactionsComponent } from './transactions.component';
import { RouterModule } from '@angular/router';
import { LayComponent } from './lay/lay.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransactionsService } from './transactions.service';

@NgModule({
  declarations: [
    TransactionsComponent,
    LayComponent,
    DepositComponent,
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
  providers: [UserService, TransactionsService]
})
export class TransactionsModule { }
