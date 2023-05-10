
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Immobile } from 'src/app/Model/Immobile';
import { Recensione } from 'src/app/Model/Recensione';
import { Utente } from 'src/app/Model/Utente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-pag-annuncio',
  templateUrl: './pag-annuncio.component.html',
  styleUrls: ['./pag-annuncio.component.css']
})
export class PagAnnuncioComponent {

  constructor(private route: ActivatedRoute, private service: ServiceService, private router: Router) {}

  id: string = "";
  public immobile: Immobile = new Immobile();
  public recensioni: Recensione[] = []
  public immobili: Immobile[] = [];
  public utente: Utente = new Utente();

  ngOnInit() {
    //dato l'id dal routerLink interrogo il database per avere quell'immobile
    this.id += this.route.snapshot.paramMap.get("id");
    this.service.getImmobile(this.id).subscribe(imm => this.immobile = imm); 

    //ERRORE NON RIESCO A PRENDERE IL CF DEL PROPRIETARIO
    //dato il cf del proprietario da immobile interrogo il database per avere i dati del venditore
    this.service.getUtente("RSSMRA83H24H501R").subscribe(ute => this.utente = ute); 

    //dato l'id dell'immobile  interrogo il database per avere le recensioni dell'immobile
    this.service.getRecensioni(this.immobile.id).subscribe(rec => this.recensioni = rec);

    //dato il cf del proprietario da immobile interrogo il database per avere altri annunci del venditore
    this.service.getImmobiliByCF(this.utente.id).subscribe(imm => this.immobili = imm)

  }

  visualizzaUtente(id: string){
    this.router.navigate(['/pag-venditore', id]);
  }

  cliccato(id: number) {
    this.router.navigate(['/pag-annuncio', id]);
  }
   
  


}