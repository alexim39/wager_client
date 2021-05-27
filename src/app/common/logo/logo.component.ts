import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wager-logo',
  template: `<a [routerLink]="['/dashboard']">
              <span>
                  <mat-icon>toll</mat-icon>
                  Wager
              </span>
            </a>
            `,
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
