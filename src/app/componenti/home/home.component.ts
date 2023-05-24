import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
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
  formFiltri : FormGroup = new FormGroup({});
  filtro: Filtro = new Filtro();

  tipoImmobileValue: String = "";
  tipoAnnuncioValue: String = "";
  tipoOrdinamentoValue: String = "";

  ngOnInit(): void {
    //caricamento di tutti gli immobili nel database
    this.service.getImmobili().subscribe(imm => this.immobili = imm);

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
  cliccato(id: number) {
    this.router.navigate(['/pag-annuncio', id]);
  }

}



