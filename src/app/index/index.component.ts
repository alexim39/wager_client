import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-index',
  template: `<wager-nav [deviceXs]="deviceXs"></wager-nav>
             <router-outlet></router-outlet>
             <wager-footer></wager-footer>
            `
})
export class IndexComponent implements OnInit {

  subscriptions: Subscription[] = [];
  deviceXs: boolean;

  constructor(private mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mediaObserver.media$.subscribe((result: MediaChange) => {
        //console.log(result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
      })
    )
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
