import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo.component';
import { MaterialModule } from './../material/material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [LogoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [LogoComponent]
})
export class LogoModule { }
