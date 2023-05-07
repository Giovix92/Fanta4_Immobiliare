import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import { NavigationExtras, Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Immobile } from 'src/app/Model/Immobile';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /*mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private service: ServiceService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);


  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  isMobile(): boolean{
    return this.mobileQuery.matches;
  }*/


  @ViewChild('sidenav') sidenav!: MatSidenav;
  private mobileQuery: MediaQueryList;
  constructor(private breakpointObserver: BreakpointObserver, private mediaMatcher: MediaMatcher, private router: Router, private service: ServiceService) {
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 600px)');
  }


  Mobile(): boolean {
    /*return this.breakpointObserver.isMatched(Breakpoints.Handset);*/
    return this.mobileQuery.matches;
  }


  cliccato(id: number) {
    this.router.navigate(['/pag-annuncio', id]);
  }


  public immobili: Immobile[] = [];

  ngOnInit(): void {
    this.service.getImmobili().subscribe(imm => this.immobili = imm);
  }


}
