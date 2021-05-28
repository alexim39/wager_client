import { Component, OnInit } from '@angular/core';
import { CalculatorClass } from '../calculator.class';

// declare jquery as any
declare const $: any;

@Component({
  selector: 'coinup',
  templateUrl: './coinup.component.html',
  styleUrls: ['./coinup.component.scss', './coinup.mobile.scss']
})
export class CashupCalculatorComponent extends CalculatorClass implements OnInit {

  // Cashup properties
  cashupField: number;
  cashupSelect: number;
  cashupProfit: number;
  cashupPayout: number;
  cashupPercentage: number;

  cashupBtn: boolean;

  constructor() { 
    // Call parent class constructor
    super();

    // Init Cashup properties
    this.cashupPercentage = super.get_X_Percent(1); // 1% of amount
    this.cashupProfit = 0;
    this.cashupPayout = 0;

    
    this.cashupBtn = true;
  }

  public getCashup(value: number) {

    // Check if both input field are empty
    if (this.cashupField === undefined || this.cashupSelect === undefined) {
      this.cashupBtn = true;
      return;
    }

    this.cashupProfit = this.cashupPercentage * value * this.cashupSelect;
    this.cashupPayout = this.cashupProfit + this.cashupField;

    if ( value >= 3000 && value <= 100000 ) { // Only activate btn when value is >= 3000
      this.cashupBtn = false;
    } else { // if ( value < 3000 ) {
      this.cashupBtn = true;
    }
  }

  ngOnInit(): void {
  }

}
