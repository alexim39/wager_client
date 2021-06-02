import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wager-index-content',
  template: `
    <wager-slide></wager-slide>
    <wager-intro></wager-intro>
    <wager-video-presentation></wager-video-presentation>
    <wager-features></wager-features>
    <wager-generate-income></wager-generate-income>
    <wager-get-in-touch></wager-get-in-touch>
  `
})
export class IndexContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
