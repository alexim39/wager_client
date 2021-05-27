import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../../common/material/material.module';
import { UserService } from './../../common/user/user';
import { CalculatorComponent } from './calculator.component';
import { CashoutCalculatorComponent } from './coinout/coinout.component';
import { CashupCalculatorComponent } from './coinup/coinup.component';

@NgModule({
  declarations: [
    CalculatorComponent,
    CashoutCalculatorComponent,
    CashupCalculatorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [],
  providers: [UserService]
})
export class CalculatorModule { }
