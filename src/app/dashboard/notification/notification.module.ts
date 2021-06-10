import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { MaterialModule } from './../../common/material/material.module';
import { RouterModule } from '@angular/router';
import { UserService } from './../../common/user/user';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListComponent } from './list/list.component';
import { PipesModule } from './../../common/pipes/pipes.module';

@NgModule({
  declarations: [NotificationComponent, ListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    PipesModule
  ],
  exports: [NotificationComponent],
  providers: [UserService, NotificationService]
})
export class NotificationModule { }
