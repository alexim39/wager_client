import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wager-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss', './nav.mobile.scss']
})
export class NavComponent implements OnInit {

  @Input() deviceXs: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
