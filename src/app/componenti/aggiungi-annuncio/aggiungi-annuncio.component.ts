import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';
import { AuthService } from "src/app/auth/auth.service";
import { MatDialog } from '@angular/material/dialog';
import { ErrordialogComponent } from 'src/app/componenti/errordialog/errordialog.component';
import { SuccessdialogComponent } from 'src/app/componenti/successdialog/successdialog.component';

@Component({
  selector: 'app-aggiungi-annuncio',
  templateUrl: './aggiungi-annuncio.component.html',
  styleUrls: ['./aggiungi-annuncio.component.css']
})
export class AggiungiAnnuncioComponent implements OnInit{
  
  public formAggiungi: FormGroup = new FormGroup({});

  astaSelected: boolean = false;
  selectedValue: String = "";
  selectedValueType: String = "";
  images: String[] = [];

  constructor(private service: ServiceService, private auth: AuthService, public dialog: MatDialog) {}

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
    }).subscribe({
      next: () => {
        this.service.getLastAddedByOwner(this.auth.utenteCorrente.id).subscribe(imm_id => {
          if(this.astaSelected) {
            this.service.setAsta({
              immobile: imm_id,
              acquirente: null,
              prezzo_partenza: this.formAggiungi.value.prezzo,
              prezzo_corrente: this.formAggiungi.value.prezzo,
              fine: this.convertToTimestamp(this.formAggiungi.value.asta_endtime),
            }).subscribe({
              error: () => this.dialog.open(ErrordialogComponent),
            });
          }

          if(this.images.length > 0) {
            this.images.forEach(image => {
              this.service.createImage({
                id: null,
                immobile: imm_id,
                img: image,
              }).subscribe({
                error: () => this.dialog.open(ErrordialogComponent),
              });
            });
          }
        });
      },
      error: () => this.dialog.open(ErrordialogComponent),
      complete: () => this.dialog.open(SuccessdialogComponent),
    });
  }

  onValueSelected(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === "In_Asta") {
      this.astaSelected = true;
    } else {
      this.astaSelected = false;
    }
  }

  onValueTypeSelected(event: any) {
    const selectedValue = event.target.value;
    this.selectedValueType = selectedValue;
  }
}
