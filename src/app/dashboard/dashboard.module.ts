import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from './../common/material/material.module';
import { DasbhoardRoutingModule } from './dashobard-routing.module';
import { NotificationModule } from './notification/notification.module';
import { ProfileModule } from './profile/profile.module';
import { AuthGuard } from './../index/auth/auth.guard';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LogoModule } from './../common/logo/logo.module';
import { MainModule } from './main/main.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalculatorModule } from './calculator/calculator.module';
import { BalanceModule } from './balance/balance.module';
import { LayModule } from './lay/lay.module';
import { DepositModule } from './deposit/deposit.module';
import { UserService } from './../common/user/user';
import { DashboardService } from './dashboard.service';
import { TransactionsModule } from './transactions/transactions.module';
import { WithdrawModule } from './withdraw/withdraw.module'
import { FeedbackModule } from './feedback/feedback.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule, CalculatorModule, MaterialModule, LogoModule, NotificationModule,
    ProfileModule, MainModule, FlexLayoutModule, RouterModule, FeedbackModule,
    TransactionsModule, BalanceModule, LayModule, DepositModule, WithdrawModule,
    DasbhoardRoutingModule
  ],
  exports: [],
  providers: [AuthGuard, UserService, DashboardService]
})
export class DashboardModule { }
