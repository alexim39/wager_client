import { Component, OnInit } from '@angular/core';
// declare jquery as any
declare const $: any;

@Component({
  selector: 'scola-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss', './auth.mobile.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // jquery ready
    $(document).ready(() => {
      $('#signUp').click(() => {
        $('.container').addClass("right-panel-active");
      })

      $('#signIn').click(() => {
        $('.container').removeClass("right-panel-active");
      })
    })
  }

}
