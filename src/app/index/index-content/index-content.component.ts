import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wager-index-content',
  template: `<wager-slide></wager-slide>
            <wager-features></wager-features>
            `
})
export class IndexContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
