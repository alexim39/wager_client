import { Component, OnInit } from '@angular/core';
// declare jquery as any
declare const $: any;
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'scola-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    private matSidenav: MatSidenav,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    // init list togle
    this.listItemTogle();
  }

  private listItemTogle() {
    
    // Toggle lay indicator
    $('.lay-close').show();
    $('.lay').click(() => {
     if ($('.lay-close').is(':visible')) {
       $('.lay-close').hide(300);
       $('.lay-open').show(300);
       $('.layDropdown').show(100);
     } else {
       $('.lay-close').show(300);
       $('.lay-open').hide(300);
       $('.layDropdown').hide(100);
     }
    });
  }

  toggle() {
    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    if (isSmallScreen) {
      this.matSidenav.close()
    }
  }

}
