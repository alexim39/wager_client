import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WrongPassportComponent } from './auth/wrong-passport/wrong-passport.component';
import { IndexContentComponent } from './index-content/index-content.component';
import { IndexComponent } from './index.component';




const routes: Routes = [
  { path: '', component: IndexComponent,
    children: [
      { path: '', component: IndexContentComponent },
      { path: 'signin', component: WrongPassportComponent  },
      //{ path: 'signup', component: SignUpComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
