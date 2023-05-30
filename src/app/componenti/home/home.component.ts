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
  immobili_backup: Immobile[] = [];
  images: String[] = [];
  formFiltri : FormGroup = new FormGroup({});
  formRicerca: FormGroup = new FormGroup({});
  filtro: Filtro = new Filtro();

  tipoImmobileValue: String = "";
  tipoAnnuncioValue: String = "";
  tipoOrdinamentoValue: String = "";
  searchWord: String = "";

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
      tipoOrdinamento: new FormControl()
    });

    this.formRicerca = new FormGroup({
      searchWord: new FormControl()
    });

    this.tipoImmobileValue = "";
    this.tipoAnnuncioValue = "";
    this.tipoOrdinamentoValue = "";
    this.searchWord = "";
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

  sortImmobili(value: String) {
    if (value === "piu_costosi") {
      this.immobili.sort((a, b) => b.prezzo_attuale - a.prezzo_attuale);
    } else if (value === "meno_costosi") {
      this.immobili.sort((a, b) => a.prezzo_attuale - b.prezzo_attuale);
    } else if (value === "piu_grandi") {
      this.immobili.sort((a, b) => b.metri_quadri - a.metri_quadri);
    } else if (value === "meno_grandi") {
      this.immobili.sort((a, b) => a.metri_quadri - b.metri_quadri);
    }
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
    this.sortImmobili(this.tipoOrdinamentoValue);
  }

  //quando clicco su un immobile si apre la pagina di quell'immobile
  OpenImmobile(id: number) {
    this.router.navigate(['/pag-annuncio', id]);
  }

  onSubmit() {
    if(this.immobili_backup.length == 0) {
      this.immobili_backup = this.immobili;
    } else {
      this.immobili = this.immobili_backup;
    }
  
    this.filtro.tipoImmobile = this.formFiltri.value.tipoImmobile;
    this.filtro.tipoAnnuncio = this.formFiltri.value.tipoAnnuncio;
    this.filtro.tipoOrdinamento = this.formFiltri.value.tipoOrdinamento;
    this.filtro.searchWord = this.formRicerca.value.searchWord;
  
    if(this.formFiltri.value.tipoImmobile == "" &&
       this.formFiltri.value.tipoAnnuncio == "" &&
       this.formFiltri.value.tipoOrdinamento == "" &&
       this.formRicerca.value.searchWord == null) {
      return;
    } else {
      this.immobili = this.immobili.filter(imm => {
        if (this.filtro.tipoImmobile && !this.filtro.tipoAnnuncio && !this.filtro.searchWord) {
          return imm.tipo === this.filtro.tipoImmobile;
        } else if ((!this.filtro.tipoImmobile || this.filtro.tipoImmobile === "") && this.filtro.tipoAnnuncio && !this.filtro.searchWord) {
          return imm.tipo_annuncio === this.filtro.tipoAnnuncio;
        } else if ((!this.filtro.tipoImmobile || this.filtro.tipoImmobile === "") && (!this.filtro.tipoAnnuncio || this.filtro.tipoAnnuncio === "") && (this.filtro.searchWord || this.filtro.searchWord === "")) {
          const searchWordLower = this.filtro.searchWord ? this.filtro.searchWord.toLowerCase() : "";
          const isWordInNome = imm.nome.toLowerCase().includes(searchWordLower);
          const isWordInDescrizione = imm.descrizione.toLowerCase().includes(searchWordLower);
          const isWordInIndirizzo = imm.indirizzo.toLowerCase().includes(searchWordLower);
          return isWordInNome || isWordInDescrizione || isWordInIndirizzo;
        } else {
          const isTipoMatch = (!this.filtro.tipoImmobile || imm.tipo === this.filtro.tipoImmobile);
          const isTipoAnnuncioMatch = (!this.filtro.tipoAnnuncio || imm.tipo_annuncio === this.filtro.tipoAnnuncio);
          const searchWordLower = this.filtro.searchWord ? this.filtro.searchWord.toLowerCase() : "";
          const isWordInNome = (!this.filtro.searchWord || imm.nome.toLowerCase().includes(searchWordLower));
          const isWordInDescrizione = (!this.filtro.searchWord || imm.descrizione.toLowerCase().includes(searchWordLower));
          const isWordInIndirizzo = (!this.filtro.searchWord || imm.indirizzo.toLowerCase().includes(searchWordLower));
          const isTipoAndAnnuncioMatch = isTipoMatch && isTipoAnnuncioMatch;
          return (isTipoAndAnnuncioMatch && (isWordInNome || isWordInDescrizione || isWordInIndirizzo));
        }
      });

      this.sortImmobili(this.filtro.tipoOrdinamento);
    }
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