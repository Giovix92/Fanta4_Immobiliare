import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
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
  immobile: Immobile = new Immobile();
  utente: Utente = new Utente();
  recensioni: Recensione[] = [];

  cf: string = "RSSMRA83H24H501R"; 

  ngOnInit() {
    this.id += this.route.snapshot.paramMap.get("id");
    this.service.getImmobile(this.id).subscribe(imm => this.immobile = imm); 
 
    this.service.getUtente(this.cf).subscribe(ute => this.utente = ute); 

    this.service.getRecensioni(this.id).subscribe(rec => this.recensioni = rec) //recensione deve cercare sull'id dell'immobile non sulla chiave primaria
  }

  visualizzaUtente(id: string){
    this.router.navigate(['/profilo', id]);
  }   


}