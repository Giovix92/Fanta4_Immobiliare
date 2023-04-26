import { Component } from '@angular/core';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent {
  persone = [
    {nome: "Paolo", cognome:"Rossi", email: "paoloRossi@gmail.com", indirizzo: 'Via Germogli', citta: 'Cosenza', regione:'Calabria'},
  ]
  nome = "Paolo";
  cognome ="Rossi";
  email= "paoloRossi@gmail.com"
  indirizzo= 'Via Germogli'
  citta= 'Cosenza';
  regione='Calabria';



}
