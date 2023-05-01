import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Immobile } from 'src/app/Model/Immobile';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-pag-annuncio',
  templateUrl: './pag-annuncio.component.html',
  styleUrls: ['./pag-annuncio.component.css']
})
export class PagAnnuncioComponent {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private route: ActivatedRoute) {
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

  cliccato() {
    this.router.navigate(['/pag-annuncio']);
  }




  prova!: number;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.prova = params['argomento'];
    });


  }

  tipo_annuncio = 'ANNUNCI RECENTI'

  persona =
  {
    nome: "Luca",
    cognome:"rossi",
    isOnline: true,
    color: 'blue',
    tel:"0948712587",
    email:"cannavacciuoloantonino@gmail.com",
  };

  casa =
  { nome: "Luca",
    tipo: "monolocale",
    regione:"Calabria",
    descrizione: "Monolocale situato a Reggio Calabria",
    immagine: "https://www.dire.it/wp-content/uploads/2020/06/palazzi-colorati_casa_case_Sigma-Coatings-5-scaled.jpg",
    prezzo: "50.000",
    mq:"500mq",
    indirizzo:"via Gelesio",
    proprietario:"Antonino Cannavacciuolo",
    ta:"Affitto",

  };
}
