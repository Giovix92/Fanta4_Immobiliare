import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';
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

  ngOnInit(): void {
    //caricamento di tutti gli immobili nel database
    this.service.getImmobili().subscribe(imm => this.immobili = imm);

    //inizializzazione dei form che restano in attesa
    this.formFiltri = new FormGroup({
      tipo: new FormControl(),
      tipoAnnuncio: new FormControl(),
      citta: new FormControl(),
      ordine: new FormControl()
    });
  }

  //quando imposto i filtri chiedo al backend di inviarmi gli immobili ordinati e filtrati
  onSubmit() {
    this.filtro.tipo = this.formFiltri.value.tipo,
    this.filtro.tipoAnnuncio = this.formFiltri.value.tipAnnuncio,
    this.filtro.citta = this.formFiltri.value.citta,
    this.filtro.ordine = this.formFiltri.value.ordine

    this.service.getImmobiliByFiltro(this.filtro).subscribe(imm => this.immobili = imm) 
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;
  private mobileQuery: MediaQueryList;
  constructor(private breakpointObserver: BreakpointObserver, private mediaMatcher: MediaMatcher, private router: Router, private service: ServiceService) {
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 600px)');
  }


  Mobile(): boolean {
    return this.mobileQuery.matches;
  }

  //quando clicco su un immobile si apre la pagina di quell'immobile
  cliccato(id: number) {
    this.router.navigate(['/pag-annuncio', id]);
  }

}



