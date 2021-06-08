import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { PipesModule } from './../../common/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './../../common/user/user';
import { MaterialModule } from './../../common/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FeedbackService } from './feedback.service';


@NgModule({
  declarations: [
    FeedbackComponent
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
  providers: [UserService, FeedbackService]
})
export class FeedbackModule { }
