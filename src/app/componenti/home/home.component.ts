import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Immobile } from 'src/app/Model/Immobile';
import { MatSidenav } from '@angular/material/sidenav';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  @ViewChild('sidenav') sidenav!: MatSidenav;
  private mobileQuery: MediaQueryList;
  constructor(private breakpointObserver: BreakpointObserver, private mediaMatcher: MediaMatcher, private router: Router, private service: ServiceService) {
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 600px)');
  }


  Mobile(): boolean {
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



