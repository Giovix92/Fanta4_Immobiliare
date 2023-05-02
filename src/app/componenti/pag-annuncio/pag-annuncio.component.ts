import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Immobile } from 'src/app/Model/Immobile';
import { Utente } from 'src/app/Model/Utente';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-pag-annuncio',
  templateUrl: './pag-annuncio.component.html',
  styleUrls: ['./pag-annuncio.component.css']
})
export class PagAnnuncioComponent {

  constructor(private route: ActivatedRoute, private service: ServiceService) {}

  id: string = "";
  immobile: Immobile = new Immobile();
  utente: Utente = new Utente();

  ngOnInit() {
    this.id += this.route.snapshot.paramMap.get("id");
    this.service.getImmobile(this.id).subscribe(imm => this.immobile = imm); 

    //this.service.getUtente(this.immobile.proprietario).subscribe(ute => this.utente = ute); errore non ricevo la risposta in tempo
  }
}