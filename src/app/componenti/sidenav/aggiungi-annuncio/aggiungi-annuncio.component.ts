import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-aggiungi-annuncio',
  templateUrl: './aggiungi-annuncio.component.html',
  styleUrls: ['./aggiungi-annuncio.component.css']
})
export class AggiungiAnnuncioComponent implements OnInit{

  public formAggiungi: FormGroup = new FormGroup({});

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.formAggiungi = new FormGroup({
      titolo: new FormControl(),
      descrizione: new FormControl(),
      citta: new FormControl(),
      prezzo: new FormControl(),
      superficie: new FormControl(),
      tipo: new FormControl(),
      foto: new FormControl(),
    });
  }

  onSubmit() {
    this.service.setImmobile({
      nome: this.formAggiungi.value.titolo,
      descrizione: this.formAggiungi.value.descrizione,
      indirizzo: this.formAggiungi.value.citta,
      prezzo: this.formAggiungi.value.prezzo,
      metri_quadri: this.formAggiungi.value.superficie,
      tipo: this.formAggiungi.value.tipo,
      proprietario: "RSSMRA83H24H501R",
      tipo_annuncio: this.formAggiungi.value.tipo_annuncio,

    }).subscribe(data => {console.log(data)})

  }
}
