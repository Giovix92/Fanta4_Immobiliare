
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Asta } from 'src/app/Model/Asta';
import { Immobile } from 'src/app/Model/Immobile';
import { Recensione } from 'src/app/Model/Recensione';
import { Utente } from 'src/app/Model/Utente';
import { ServiceService } from 'src/app/Service/service.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrordialogComponent } from '../errordialog/errordialog.component';
import { SuccessdialogComponent } from '../successdialog/successdialog.component';

@Component({
  selector: 'app-pag-annuncio',
  templateUrl: './pag-annuncio.component.html',
  styleUrls: ['./pag-annuncio.component.css']
})
export class PagAnnuncioComponent {

  constructor(public auth: AuthService, private route: ActivatedRoute, private service: ServiceService, public dialog: MatDialog) {}

  id: number = 0;
  stringID: string = "";
  immobile: Immobile = new Immobile();
  recensioni: Recensione[] = []
  immobili: Immobile[] = [];
  utente: Utente = new Utente();
  asta: Asta = new Asta();
  images: String[] = [];

  existAsta: boolean = false;

  showRecensioneForm: boolean = false;
  formAddRecensione: FormGroup = new FormGroup({});

  ngOnInit() {
    /**
     * Prendo i dettagli dell'immobile dato l'id
     */
    this.stringID += this.route.snapshot.paramMap.get("id");
    this.id = Number.parseInt(this.stringID);
    this.service.getImmobile(this.id).subscribe({
      next: (immobile) => {
        this.immobile = immobile;

        /**
         * Se l'immobile è di tipo asta, faccio una GET al server per prendere i dati dell'asta
         */
        if(immobile.tipo_annuncio == "In_Asta") {
          this.service.getAstaByImmobile(immobile.id).subscribe({
            next: (asta_info) => {
              this.asta = asta_info;
              this.existAsta = true;
            }
          });
        }

        /**
         * Prendo le immagini dal database, se esistono
         */
        this.service.findImagesByImmobileID(immobile.id).subscribe({
          next: (imgs) => {
            if(imgs.length > 0) {
                imgs.forEach(img => {
                  this.images.push('data:image/jpeg;base64,' + img.img);
              })
            }
          }
        });

        /**
         * Prendo le recensioni dal database, se esistono
         */
        this.service.getRecensioniByImmobileID(immobile.id).subscribe({
          next: (recensioni) => {
            if(recensioni.length > 0) {
              this.recensioni = recensioni;
            }
          }
        })
      }
    });

    /**
     * Inizializza il form per le recensioni con i suoi campi
     */
    this.formAddRecensione = new FormGroup({ 
      titolo: new FormControl(), 
      rating: new FormControl() 
    });
  }

  updateImmobile() {
    // TODO: Fare form come profilo
  }

  deleteImmobile() {
    this.service.deleteImmobile(this.id);
    this.dialog.open(SuccessdialogComponent);
  }

  onSubmit(){
    this.service.setRecensione({
      titolo: this.formAddRecensione.value.titolo,
      rating: this.formAddRecensione.value.valutazione,
      autore: this.auth.utenteCorrente.id,
      immobile: this.id
    }).subscribe({
      next: () => this.dialog.open(SuccessdialogComponent),
      error: () => this.dialog.open(ErrordialogComponent),
    })
    this.showRecensioneForm = false;
  }
}