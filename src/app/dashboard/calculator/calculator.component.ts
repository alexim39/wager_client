import { Component, OnInit } from '@angular/core';
// declare jquery as any
declare const $: any;

@Component({
  selector: 'app-calculator',
  template: `
    <div class="breadcrumb-wrap">
      <ul class="breadcrumb">
        <li>
          <a [routerLink]="['/dashboard']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Dashboard</a>
        </li>
        <li>calculator</li>
      </ul>
    </div>
    <mat-tab-group mat-align-tabs="center">
      <mat-tab label="CoinOut">
        <coinout></coinout>
      </mat-tab>
      <mat-tab label="CoinUp">
        <coinup></coinup>
      </mat-tab>
    </mat-tab-group>
  `
})
export class CalculatorComponent implements OnInit {
  
  constructor() {}

  ngOnInit() {
  }

}
