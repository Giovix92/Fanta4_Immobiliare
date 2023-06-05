import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { latLng, tileLayer, Map } from 'leaflet';
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
import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AddreviewdialogComponent } from '../addreviewdialog/addreviewdialog.component';

@Component({
  selector: 'app-annuncio',
  templateUrl: './annuncio.component.html',
  styleUrls: ['./annuncio.component.css']
})
export class AnnuncioComponent implements OnInit {

  constructor(public auth: AuthService, private route: ActivatedRoute, private router: Router, private service: ServiceService, public dialog: MatDialog) {}

  /* Immobile stuffs */
  public id: number = 0;
  stringID: string = "";
  immobile: Immobile = new Immobile();
  public recensioni: Recensione[] = []
  proprietario: Utente = new Utente();
  asta: Asta = new Asta();
  images: String[] = [];
  prezzoOrigStyle: String = "";

  /* Map stuffs */
  originalAddress: String = "";
  mapOptions: any;
  map: any;
  addressComponents: any;

  /* Reviews stuff */
  showRecensioneForm: boolean = false;
  formAddRecensione: FormGroup = new FormGroup({});

  /* FAB */
  menuOpen = false;
  faFacebook = faFacebook;
  faWhatsapp = faWhatsapp;
  faEnvelope = faEnvelope;

  /* Asta stuff */
  subscription: Subscription = new Subscription;
  public dateNow = new Date();
  public dDay = new Date();
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;
  timeDifference?: number;
  secondsToDday?: number;
  minutesToDday?: number;
  hoursToDday?: number;
  daysToDday?: number;
  prezzo_minimo_asta: number = 0;
  ultimo_offerente: String = "nessuno";
  prezzo_asta_update: number = this.asta.prezzo_partenza;
  astaDisabled: boolean = false;

  ngOnInit() {
    /**
     * Prendo i dettagli dell'immobile dato l'id
     */
    this.stringID += this.route.snapshot.paramMap.get("id");
    this.id = Number.parseInt(this.stringID);
    this.service.getImmobile(this.id).subscribe({
      next: (immobile) => {
        /**
         * originalAddress servirà per eventuali modifiche all'articolo, mentre
         * lo split rimuoverà dall'indirizzo i ';' per una corretta visualizzazione.
         */ 
        this.originalAddress = immobile.indirizzo;
        immobile.indirizzo = immobile.indirizzo.split(";").join(", ");
        this.immobile = immobile;

        /**
         * Prendo le info dell'utente
         */
        this.service.getUtente(immobile.proprietario).subscribe({
          next: (utente) => {
            this.proprietario = utente;
          }
        })

        /**
         * Se l'immobile è di tipo asta, faccio una GET al server per prendere i dati dell'asta
         */
        if(immobile.tipo_annuncio == "In_Asta") {
          this.service.getAstaByImmobile(immobile.id).subscribe({
            next: (asta_info) => {
              this.asta = asta_info;

              this.dateNow = new Date();
              this.dDay = new Date(asta_info.fine);

              this.subscription = interval(1000)
                .subscribe(x => { this.getTimeDifference(); });

              this.prezzo_minimo_asta = asta_info.prezzo_corrente + 1;

              this.service.getUtente(asta_info.acquirente).subscribe({
                next: (utente) => {
                  this.ultimo_offerente = utente.email;
                }
              })
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
                  this.images.push(img.img);
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
              this.recensioni.forEach(recensione => {
                this.service.getUtente(recensione.autore).subscribe({
                  next: (utente) => {
                    recensione.autore = utente.email;
                  }
                })
              })
            }
          }
        })

        /**
         * Inizializza elementi per la mappa
         */
        const [street, city, county, postalcode] = this.originalAddress.split(';').map(component => component.trim());
        this.addressComponents = {
          street: street || '',
          city: city || '',
          county: county || '',
          postalcode: postalcode || ''
        };
        this.addressComponents.street = this.addressComponents.street.split(" ").join("+");
        this.initMap();

        /**
         * Show the original price as crossed out if the condition is met
         */
        this.prezzoOrigStyle = (this.immobile.prezzo_orig > this.immobile.prezzo_attuale)
          ? "text-decoration: line-through; text-decoration-color: red; font-size: 15px; margin-bottom: -10px;"
          : "";
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

  initMap() {
    const apiUrl = `https://nominatim.openstreetmap.org/search?street=${this.addressComponents.street}&city=${this.addressComponents.city}&county=${this.addressComponents.county}&postalcode=${this.addressComponents.postalcode}&zoomOffset=1&format=json`;
  
    this.mapOptions = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        })
      ],
      center: latLng(0, 0)
    };
  
    this.map = new Map('leafletMap', this.mapOptions);
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const { lat, lon } = data[0]; // Extract the latitude and longitude from the API response
          this.map.setView(latLng(lat, lon), 17); // Set the map view with the adjusted zoomOffset
          this.map.panTo(latLng(lat, lon)); // Pan the map to the specified coordinates
        }
      });
  }

  deleteImmobile() {
    this.service.deleteImmobile(this.id);
    this.dialog.open(SuccessdialogComponent);
  }

  sendEmail() {
    window.location.href = `mailto:${this.proprietario.email}`;
  }

  makeCall() {
    window.location.href = `tel:${this.proprietario.telefono}`;
  }

  deleteRecensione(index: number) {
    this.service.deleteRecensione(index).subscribe({
      next: () => window.location.reload(),
      error: () => this.dialog.open(ErrordialogComponent),
    })
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  shareTo(social: string): void {
    const shareUrl = `localhost:4200/annuncio/${this.id}`;
    const shareText = `Guarda quest'annuncio: ${this.immobile.nome}\nDescrizione: ${this.immobile.descrizione}\nPrezzo: ${this.immobile.prezzo_attuale}€`;
  
    switch (social) {
      case 'facebook':
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(shareText)}`;
        window.open(facebookUrl, '_blank');
        break;
  
      case 'whatsapp':
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
        window.open(whatsappUrl, '_blank');
        break;
  
      case 'mail':
        const subject = encodeURIComponent(`Check out this property: ${this.immobile.nome}`);
        const body = encodeURIComponent(`${this.immobile.descrizione}\nPrice: ${this.immobile.prezzo_attuale}€\n\n${shareUrl}`);
        const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
        window.location.href = mailtoUrl;
        break;
  
      default:
        break;
    }
  }

  addReview(): void {
    this.auth.lastAnnuncioVisited = this.immobile.id;
    this.dialog.open(AddreviewdialogComponent).afterClosed().subscribe({
      next: () => window.location.reload()
    })
  }

  getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  
    if (this.timeDifference <= 0) {
      this.astaDisabled = true;
      this.ngOnDestroy();
    }
  }

  allocateTimeUnits (timeDifference: number) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sendUpdateAsta() {
    if(this.prezzo_asta_update <= this.prezzo_minimo_asta-1) {
      this.dialog.open(ErrordialogComponent);
    } else {
      this.service.updateAsta(this.asta.id, {
        id: this.asta.id,
        immobile: this.asta.immobile,
        acquirente: localStorage.getItem("id"),
        prezzo_partenza: this.asta.prezzo_partenza,
        prezzo_corrente: this.prezzo_asta_update,
        fine: this.asta.fine,
      }).subscribe({
        next: () => this.dialog.open(SuccessdialogComponent).afterClosed().subscribe(() => {window.location.reload()}),
        error: () => this.dialog.open(ErrordialogComponent).afterClosed().subscribe(() => {window.location.reload()}),
      })
    }
  }

  checkIfSameOwner(): Boolean {
    return this.immobile.proprietario == localStorage.getItem('id');
  }

  checkIfSameReviewOwner(recensione: Recensione): Boolean {
    return recensione.autore == localStorage.getItem('email');
  }
}