import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from './../index/auth/auth.service';
import { Router } from '@angular/router';
import { ServerResponse } from './../common/server/response.interface';
import { DashboardService } from './dashboard.service';
import { UserInterface, UserService } from '../common/user/user';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'scola-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // init subscriptions list
  subscriptions: Subscription[] = [];
  currentUser: UserInterface;
  deviceXs: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private dashboardService: DashboardService,
    private router: Router,
    private UserService: UserService,
    private mediaObserver: MediaObserver
  ) { }

  signOut(): void {
    // push into list
    this.subscriptions.push(
      this.authService.signOut().subscribe((res: ServerResponse) => {
        if (res.code === 200) {
          localStorage.removeItem('token')
          // reroute to home page
          this.router.navigate(['/']);
        }
      }, (error) => {
        console.error(error);
      })
    )
  }

  ngOnInit(): void {
    
    // push into list
    this.subscriptions.push(
      this.UserService.getUser().subscribe((user: UserInterface) => {
          this.currentUser = user;
      }, (error) => {
        // reroute to home page
        this.router.navigate(['/']);
      })
    )

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
