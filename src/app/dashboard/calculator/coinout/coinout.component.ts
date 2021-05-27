import { Component, OnInit } from '@angular/core';
import { CalculatorClass } from '../calculator.class';

// declare jquery as any
declare const $: any;

@Component({
  selector: 'coinout',
  templateUrl: './coinout.component.html',
  styleUrls: ['./coinout.component.scss', './coinout.mobile.scss']
})
export class CashoutCalculatorComponent extends CalculatorClass implements OnInit {

  // Cashout properties
  cashoutField: number;
  cashoutProfit: number;
  cashoutPayout: number;
  cashoutPercentage: number;

  // Submit Btn
  cashoutBtn: boolean;

  constructor() { 
    // Call parent class constructor
    super();

    // Init Cashout properties
    this.cashoutPercentage = super.get_X_Percent(2); // 2% of amount

    this.cashoutProfit = 0;
    this.cashoutPayout = 0;

    // Init Btn
    this.cashoutBtn = true;
  }

  public getCashout(value: number | any) {
    // console.log(value);
    this.cashoutProfit = this.cashoutPercentage * value * 6; // Mutiply by 6 instead of 7 because sunday is not involved
    this.cashoutPayout = this.cashoutProfit + this.cashoutField;

    if ( value >= 5000 && value <= 100000 ) { // Only activate btn when value is >= 5000
      this.cashoutBtn = false;
    } else { //  if ( value < 5000 ) {
      this.cashoutBtn = true;
    }
  }


  ngOnInit(): void {
  }

}
