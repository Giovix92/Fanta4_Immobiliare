import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
 /* mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  Loggato = true; rendere dinamico

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }*/

  /*isMobile(): boolean{
    return this.mobileQuery.matches;
  }*/

  Loggato: boolean = false;
  isSidenavOpened: boolean = false;
  isMobile = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;
  private mobileQuery: MediaQueryList;
  constructor(private breakpointObserver: BreakpointObserver, private mediaMatcher: MediaMatcher, private auth: AuthService) {
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 600px)');
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.TabletPortrait
    ]).subscribe(result => {
      this.isMobile = result.matches;
      this.sidenav.mode = this.isMobile ? 'over' : 'side';
      this.sidenav.close();
      this.Loggato = this.auth.checkLogin();
      console.log(this.Loggato);
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  Mobile(): boolean {
    /*return this.breakpointObserver.isMatched(Breakpoints.Handset);*/
    return this.mobileQuery.matches;
  }



}
