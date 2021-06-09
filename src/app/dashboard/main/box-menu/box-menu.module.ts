import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxMenuComponent } from './box-menu.component';
import { PipesModule } from './../../../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './../../../common/user/user';
import { MaterialModule } from './../../../common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FgrComponent } from './fgr/fgr.component';
import { ActivePlanDepositComponent } from './active-plan-deposit/active-plan-deposit.component';
import { ActivePlanProfitComponent } from './active-plan-profit/active-plan-profit.component';
import { PendingWidrawalComponent } from './pending-widrawal/pending-widrawal.component';


@NgModule({
  declarations: [
    BoxMenuComponent,
    FgrComponent,
    ActivePlanDepositComponent,
    ActivePlanProfitComponent,
    PendingWidrawalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [BoxMenuComponent],
  providers: [UserService]
})
export class BoxMenuModule { }
