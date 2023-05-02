import { ChangeDetectorRef, Component } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { NavigationExtras, Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Immobile } from 'src/app/Model/Immobile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  mobileQuery: MediaQueryList;

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
  }

  cliccato(prova: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {argomento: 'valore argomento',},};
    this.router.navigate(['/pag-annuncio'] );
  }


  public immobili: Immobile[] = [];

  ngOnInit(): void {
    this.service.getImmobili().subscribe(imm => this.immobili = imm);
  }


}
