import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { WrongPassportComponent } from './auth/wrong-passport/wrong-passport.component';
import { IndexContentComponent } from './index-content/index-content.component';
import { IndexComponent } from './index.component';
import { LegalComponent } from './legal/legal.component'
import { TermsComponent } from './legal/terms/terms.component';
import { PrivacyComponent } from './legal/privacy/privacy.component';
import { CookiesComponent } from './legal/cookies/cookies.component';
import { ContactComponent } from './contact/contact.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';


const routes: Routes = [
  {
    path: '', component: IndexComponent,
    children: [
      { path: '', component: IndexContentComponent },
      { path: 'signin', component: WrongPassportComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'new-password/:userId', component: NewPasswordComponent },
      { path: 'contacts', component: ContactComponent },
      {
        path: 'legal', component: LegalComponent,
        children: [
          { path: '', component: TermsComponent },
          { path: 'terms', component: TermsComponent },
          { path: 'privacy', component: PrivacyComponent },
          { path: 'cookies', component: CookiesComponent },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
