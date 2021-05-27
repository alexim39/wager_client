import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayComponent } from './lay.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../../common/material/material.module';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CoinoutComponent } from './coinout/coinout.component';
import { CoinupComponent } from './coinup/coinup.component';
import { LayService } from './lay.service';
import { FormsModule } from '@angular/forms'
import { UserService } from './../../common/user/user';

@NgModule({
  declarations: [
    LayComponent,
    IndexComponent,
    CoinoutComponent,
    CoinupComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    FormsModule
  ],
  exports: [],
  providers: [UserService, LayService]
})
export class LayModule { }
