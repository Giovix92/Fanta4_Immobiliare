import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Immobile } from 'src/app/Model/Immobile';
import { MatSidenav } from '@angular/material/sidenav';
import { FormControl, FormGroup } from '@angular/forms';
import { Filtro } from 'src/app/Model/Filtro';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  immobili: Immobile[] = [];
  images: String[] = [];
  formFiltri : FormGroup = new FormGroup({});
  filtro: Filtro = new Filtro();

  tipoImmobileValue: String = "";
  tipoAnnuncioValue: String = "";
  tipoOrdinamentoValue: String = "";

  showOnly2Cols: boolean = false;

  ngOnInit(): void {
    /**
     * Prendo tutti gli immobili e applico le modifiche grafiche all'indirizzo
     */
    this.service.getImmobili().subscribe({
      next: (immobili) => {
        immobili.forEach(immobile => {
          immobile.indirizzo = immobile.indirizzo.split(";").join(", ");
          this.service.findImagesByImmobileID(immobile.id).subscribe({
            next: (imgs) => {
              if (imgs.length > 0) {
                const base64String = imgs[0].img;
                this.images[immobile.id] = base64String;
              }
            }
          })
        })
        this.immobili = immobili;
      },
    });

    //inizializzazione dei form che restano in attesa
    this.formFiltri = new FormGroup({
      tipoImmobile: new FormControl(),
      tipoAnnuncio: new FormControl(),
      citta: new FormControl(),
      tipoOrdinamento: new FormControl()
    });

    this.tipoImmobileValue = "";
    this.tipoAnnuncioValue = "";
    this.tipoOrdinamentoValue = "";
  }

  //quando imposto i filtri chiedo al backend di inviarmi gli immobili ordinati e filtrati
  onSubmit() {
    this.filtro.tipo = this.formFiltri.value.tipo,
    this.filtro.tipoAnnuncio = this.formFiltri.value.tipoAnnuncio,
    this.filtro.citta = this.formFiltri.value.citta,
    this.filtro.ordine = this.formFiltri.value.ordine

    // TODO: Filtra immobili
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  private mobileQuery: MediaQueryList;

  constructor(private breakpointObserver: BreakpointObserver, private mediaMatcher: MediaMatcher, private router: Router, private service: ServiceService) {
    // detect screen size changes
    this.breakpointObserver.observe(["(max-width: 1450px)"]).subscribe((result: BreakpointState) => {
      if (result.matches) {
          this.showOnly2Cols = true;     
      } else {
          this.showOnly2Cols = false;
      }
    });
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 600px)');
  }

  Mobile(): boolean {
    return this.mobileQuery.matches;
  }

  tipoImmobileValueChange(event: any) {
    const selectedValuea = event.target.value;
    this.tipoImmobileValue = selectedValuea;
  }

  tipoAnnuncioValueChange(event: any) {
    const selectedValueb = event.target.value;
    this.tipoAnnuncioValue = selectedValueb;
  }

  tipoOrdinamentoValueChange(event: any) {
    const selectedValuec = event.target.value;
    this.tipoOrdinamentoValue = selectedValuec;
  }

  //quando clicco su un immobile si apre la pagina di quell'immobile
  OpenImmobile(id: number) {
    this.router.navigate(['/pag-annuncio', id]);
  }

  pickImgGivenId(id: number): String {
    let imageURL: String = "";
    this.service.findImagesByImmobileID(id).subscribe({
      next: (imgs) => {
        if (imgs.length >= 0) {
          imageURL = 'data:image/jpeg;base64,' + imgs[0];
        }
      },
    });
    return imageURL;
  }
}