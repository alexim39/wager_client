import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-index',
  template: `<div fxLayout="column" fxFlexFill>
               <wager-nav [device]="device"></wager-nav>
               <router-outlet></router-outlet>
               <wager-footer></wager-footer>
              </div>
            `
})
export class IndexComponent implements OnInit {

  subscriptions: Subscription[] = [];
  device: boolean;

  constructor(private mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mediaObserver.media$.subscribe((media: MediaChange) => {
        
        this.device = media.mqAlias === 'xs' ? true : false;
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
