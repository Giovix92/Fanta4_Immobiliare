import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utente } from 'src/app/Model/Utente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent {
  /*
  persone = [
    {nome: "Paolo", cognome:"Rossi", email: "paoloRossi@gmail.com", indirizzo: 'Via Germogli', citta: 'Cosenza', regione:'Calabria'},
  ]
  nome = "Paolo";
  cognome ="Rossi";
  email= "paoloRossi@gmail.com"
  indirizzo= 'Via Germogli'
  citta= 'Cosenza';
  regione='Calabria';
  */

  constructor(private route: ActivatedRoute, private service: ServiceService, private router: Router){}

  id: string = "";
  utente: Utente = new Utente();

  ngOnInit() {
    this.id += this.route.snapshot.paramMap.get("id");
    this.service.getUtente(this.id).subscribe(ute => this.utente = ute);
  }



}
