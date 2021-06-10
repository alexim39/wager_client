import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from './../index/auth/auth.guard';
import { MainComponent } from './../dashboard/main/main.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { DepositComponent } from './deposit/deposit.component';
import { LayComponent } from './lay/lay.component';
import { CoinupComponent } from './lay/coinup/coinup.component';
import { CoinoutComponent } from './lay/coinout/coinout.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SecurityComponent } from './security/security.component';
import { PasswordComponent } from './security/password/password.component';
import { ListComponent as NotificationList } from './../dashboard/notification/list/list.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MainComponent },
      { path: 'profile', component: ProfileDetailsComponent },
      { path: 'calculator', component: CalculatorComponent },
      {
        path: 'deposit',
        children: [
          { path: '', component: DepositComponent },
          //{ path: 'about', component: WagerInfoComponent},
        ]
      },
      {
        path: 'lay',
        children: [
          { path: '', component: LayComponent },
          { path: 'coinout', component: CoinoutComponent },
          { path: 'coinup', component: CoinupComponent }
        ]
      },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'withdraw', component: WithdrawComponent },
      { path: 'feedback', component: FeedbackComponent },
      {
        path: 'security',
        children: [
          { path: '', component: SecurityComponent },
          { path: 'password', component: PasswordComponent }
        ]
      },
      { path: 'notifications', component: NotificationList },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasbhoardRoutingModule { }