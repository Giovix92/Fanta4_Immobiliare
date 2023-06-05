import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';
import { AuthService } from "src/app/auth/auth.service";
import { MatDialog } from '@angular/material/dialog';
import { ErrordialogComponent } from 'src/app/componenti/errordialog/errordialog.component';
import { SuccessdialogComponent } from 'src/app/componenti/successdialog/successdialog.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { DatePipe } from '@angular/common';
import { Immobile } from 'src/app/Model/Immobile';

@Component({
  selector: 'app-aggiungi-annuncio',
  templateUrl: './aggiungi-annuncio.component.html',
  styleUrls: ['./aggiungi-annuncio.component.css'],
  providers: [DatePipe],
})
export class AggiungiAnnuncioComponent implements OnInit{
  
  public formAggiungi: FormGroup = new FormGroup({});

  astaSelected: boolean = false;
  selectedValue: String = "";
  selectedValueType: String = "";
  images: String[] = [];
  minDateTime: any;
  myImmobiliArray: Immobile[] = [];
  myImmobiliArrayIndex: number = -1;
  myImmobiliSelection: String = "";

  constructor(private service: ServiceService, private auth: AuthService, public dialog: MatDialog, private imageCompress: NgxImageCompressService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    if(!this.auth.isLoggedIn) window.open("http://localhost:4200/home", "_self")
    this.formAggiungi = new FormGroup({
      titolo: new FormControl(),
      descrizione: new FormControl(),
      street: new FormControl(),
      city: new FormControl(),
      county: new FormControl(),
      postalCode: new FormControl(),
      prezzo: new FormControl(),
      superficie: new FormControl(),
      tipo: new FormControl(),
      foto: new FormControl(),
      asta_endtime: new FormControl(),
      tipo_annuncio: new FormControl(),
      prezzo_attuale: new FormControl(),
    });

    const currentDate = new Date();
    const nextDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    this.minDateTime = this.datePipe.transform(nextDay, 'yyyy-MM-ddTHH:mm');

    const prop_id = localStorage.getItem("id");
    if(!this.auth.isAdmin()){
      this.service.findAllByOwner(prop_id || "").subscribe({
        next: (immobili) => {
          this.myImmobiliArray = immobili;
        }
      });
    } else {
      this.service.getImmobili().subscribe({
        next: (immobili) => {
          this.myImmobiliArray = immobili;
        }
      });
    }
  }

  onFileChange(event: any) {
    this.images = [];
    const files = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = e.target.result;

          this.imageCompress
            .compressFile(image, -1, 50, 50) // 50% ratio, 50% quality
            .then(compressedImage => {
              this.images.push(compressedImage);
            })
            .catch(error => {
              this.dialog.open(ErrordialogComponent);
            });
        };
        reader.readAsDataURL(file);
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
    const addressStr: String = this.formAggiungi.value.street + ";" + this.formAggiungi.value.city + ";" + this.formAggiungi.value.county + ";" + this.formAggiungi.value.postalCode;
    if(this.formAggiungi.value.prezzo_attuale > this.formAggiungi.value.prezzo) {
      this.formAggiungi.patchValue({
        prezzo: this.formAggiungi.value.prezzo_attuale
      })
    }
    if(this.myImmobiliSelection == "") {
      this.service.setImmobile({
        nome: this.formAggiungi.value.titolo,
        descrizione: this.formAggiungi.value.descrizione,
        indirizzo: addressStr,
        prezzo_orig: this.formAggiungi.value.prezzo,
        prezzo_attuale: this.formAggiungi.value.prezzo,
        metri_quadri: this.formAggiungi.value.superficie,
        tipo: this.formAggiungi.value.tipo,
        proprietario: localStorage.getItem("id"),
        tipo_annuncio: this.formAggiungi.value.tipo_annuncio,
      }).subscribe({
        next: () => {
          this.service.getLastAddedByOwner(localStorage.getItem("id") || "").subscribe(imm_id => {
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
        complete: () => this.dialog.open(SuccessdialogComponent).afterClosed().subscribe({
          next: () => window.open("http://localhost:4200/home", "_self"),
        }),
      });
    } else {
      const immobile_id = this.myImmobiliArray[this.myImmobiliArrayIndex].id;
      var proprietario = "";
      if(this.myImmobiliArray[this.myImmobiliArrayIndex].proprietario != localStorage.getItem("id")){
        proprietario = this.myImmobiliArray[this.myImmobiliArrayIndex].proprietario;
      } else {
        proprietario = localStorage.getItem("id") || "";
      }
      this.service.updateImmobile(immobile_id, {
        nome: this.formAggiungi.value.titolo,
        descrizione: this.formAggiungi.value.descrizione,
        indirizzo: addressStr,
        prezzo_orig: this.formAggiungi.value.prezzo,
        prezzo_attuale: this.formAggiungi.value.prezzo_attuale,
        metri_quadri: this.formAggiungi.value.superficie,
        tipo: this.formAggiungi.value.tipo,
        proprietario: proprietario,
        tipo_annuncio: this.formAggiungi.value.tipo_annuncio,
      }).subscribe({
        next: () => {
          if(this.images.length > 0) {
            this.images.forEach(image => {
              this.service.createImage({
                id: null,
                immobile: immobile_id,
                img: image,
              }).subscribe({
                error: () => this.dialog.open(ErrordialogComponent),
              });
            });
          }
        },
        error: () => this.dialog.open(ErrordialogComponent),
        complete: () => this.dialog.open(SuccessdialogComponent).afterClosed().subscribe({
          next: () => window.open("http://localhost:4200/home", "_self"),
        }),
      });
    }
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

  onValueImmobiliSelected(event: any) {
    const selectedValue = event.target.value;
    this.myImmobiliArrayIndex = selectedValue;

    const selectedImmobile = this.myImmobiliArray[this.myImmobiliArrayIndex];
    const [street, city, county, postalCode] = selectedImmobile.indirizzo.split(";");
    this.formAggiungi.patchValue({
      titolo: selectedImmobile.nome,
      descrizione: selectedImmobile.descrizione,
      prezzo: selectedImmobile.prezzo_orig,
      prezzo_attuale: selectedImmobile.prezzo_attuale,
      superficie: selectedImmobile.metri_quadri,
      tipo_annuncio: selectedImmobile.tipo_annuncio,
      tipo: selectedImmobile.tipo,
      street: street,
      city: city,
      county: county,
      postalCode: postalCode,
    });

    if(selectedImmobile.tipo_annuncio === "In_Asta") {
      this.astaSelected = true;
    } else {
      this.astaSelected = false;
    }
  }

  openNewPage() {
    window.open('http://localhost:4200/annuncio/'+this.myImmobiliArray[this.myImmobiliArrayIndex].id, '_blank');
  }

  deleteImmobile() {
    this.service.deleteImmobile(this.myImmobiliArray[this.myImmobiliArrayIndex].id).subscribe({
      next: () => {
        this.dialog.open(SuccessdialogComponent).afterClosed().subscribe({
          complete: () => window.location.reload(),
        })
      },
      error: () => this.dialog.open(ErrordialogComponent),
    });
  }
}
