import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';
import { AuthService } from "../../../auth/auth.service";


@Component({
  selector: 'app-aggiungi-annuncio',
  templateUrl: './aggiungi-annuncio.component.html',
  styleUrls: ['./aggiungi-annuncio.component.css']
})
export class AggiungiAnnuncioComponent implements OnInit{
  
  public formAggiungi: FormGroup = new FormGroup({});

  astaSelected: boolean = false;
  selectedValue: String = "In_Affitto";
  images: String[] = [];

  constructor(private service: ServiceService, private auth: AuthService) {}

  ngOnInit(): void {
    this.formAggiungi = new FormGroup({
      titolo: new FormControl(),
      descrizione: new FormControl(),
      citta: new FormControl(),
      prezzo: new FormControl(),
      superficie: new FormControl(),
      tipo: new FormControl(),
      foto: new FormControl(),
      asta_endtime: new FormControl(),
      tipo_annuncio: new FormControl()
    });
  }

  onFileChange(event: any) {
    this.images = [];
    const files = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1];
          this.images.push(base64);
        };
        reader.onerror = (error) => {
          console.log('Error: ', error);
        };
      }
    }
  }

  convertToTimestamp(value: string): number {
    const date = new Date(value);
    const timestamp = date.getTime();
    const postgresTimestamp = BigInt(timestamp);
    const postgresTimestampNumber = Number(postgresTimestamp);
    return postgresTimestampNumber;
  }

  onSubmit() {
    this.service.setImmobile({
      nome: this.formAggiungi.value.titolo,
      descrizione: this.formAggiungi.value.descrizione,
      indirizzo: this.formAggiungi.value.citta,
      prezzo: this.formAggiungi.value.prezzo,
      metri_quadri: this.formAggiungi.value.superficie,
      tipo: this.formAggiungi.value.tipo,
      proprietario: this.auth.utenteCorrente.id,
      tipo_annuncio: this.formAggiungi.value.tipo_annuncio,
    }).subscribe(data => {console.log(data)})

    setTimeout(() => {
      /**
       * Dirty hack: Timeout di 1 secondo tra una richiesta ed un'altra
       * Dobbiamo dare il tempo al database di ricevere la POST e salvare tutte le modifiche.
       * In questo modo, non ci saranno problemi a ricevere l'ID ed effettuare la nuova POST su aste.
       */
      this.service.getLastAddedByOwner(this.auth.utenteCorrente.id).subscribe(imm_id => {
        console.log("[i] DEBUG: IMMOBILE ID: " + imm_id);
        if(this.astaSelected) {
          console.log("[i] CARICO ASTA");
          this.service.setAsta({
            immobile: imm_id,
            acquirente: null,
            prezzo_partenza: this.formAggiungi.value.prezzo,
            prezzo_corrente: this.formAggiungi.value.prezzo,
            fine: this.convertToTimestamp(this.formAggiungi.value.asta_endtime),
          }).subscribe(data => { console.log(data); });
        }

        if(this.images.length > 0) {
          this.images.forEach(image => {
            this.service.createImage({
              id: null,
              immobile: imm_id,
              img: image,
            }).subscribe(data => {console.log(data); });
          });
        }

      });
    }, 1000);
  }

  onValueSelected(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === "In_Asta") {
      this.astaSelected = true;
    } else {
      this.astaSelected = false;
    }
  }
}
