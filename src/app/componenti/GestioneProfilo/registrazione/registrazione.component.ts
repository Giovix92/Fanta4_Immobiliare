import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit{
  public formAggiungi: FormGroup = new FormGroup({});

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.formAggiungi = new FormGroup({
      nome: new FormControl(),
      cognome: new FormControl(),
      id: new FormControl(),
      telefono: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      ruolo: new FormControl()
    });
  }

  onSubmit() {
    this.service.setUtente({
      nome: this.formAggiungi.value.nome,
      cognome: this.formAggiungi.value.cognome,
      id: this.formAggiungi.value.id,
      telefono: this.formAggiungi.value.telefono,
      email: this.formAggiungi.value.email,
      password: this.formAggiungi.value.password,
      ruolo: this.formAggiungi.value.ruolo
    }).subscribe(data => {console.log(data)})
  }
}