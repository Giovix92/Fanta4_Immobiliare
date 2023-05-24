import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  isSidenavOpened: boolean = false;
  isMobile = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  private mobileQuery: MediaQueryList;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mediaMatcher: MediaMatcher,
    public auth: AuthService
  ) {
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 600px)');
  }

  ngAfterViewInit() {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.TabletPortrait]).subscribe(result => {
      this.isMobile = result.matches;
      this.sidenav.mode = this.isMobile ? 'over' : 'side';
      this.sidenav.close();
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  Mobile(): boolean {
    return this.mobileQuery.matches;
  }
}