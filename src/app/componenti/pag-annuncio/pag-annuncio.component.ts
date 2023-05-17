
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Asta } from 'src/app/Model/Asta';
import { Immobile } from 'src/app/Model/Immobile';
import { Recensione } from 'src/app/Model/Recensione';
import { Utente } from 'src/app/Model/Utente';
import { ServiceService } from 'src/app/Service/service.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-pag-annuncio',
  templateUrl: './pag-annuncio.component.html',
  styleUrls: ['./pag-annuncio.component.css']
})
export class PagAnnuncioComponent {

  constructor(public auth: AuthService, private route: ActivatedRoute, private service: ServiceService, private router: Router) {}

  id: string = "";
  immobile: Immobile = new Immobile();
  recensioni: Recensione[] = []
  immobili: Immobile[] = [];
  utente: Utente = new Utente();
  asta: Asta = new Asta();

  existAsta: boolean = false;
  existRecensioni: boolean = false;
  existImmobili: boolean = false;

  addRecensione: boolean = false;
  formAggRec: FormGroup = new FormGroup({ titolo: new FormControl(), rating: new FormControl() });


  ngOnInit() {
    //dato l'id dal routerLink interrogo il database per avere quell'immobile
    this.id += this.route.snapshot.paramMap.get("id");
    this.service.getImmobile(this.id).subscribe(imm => {
      this.immobile = imm 

      if (this.immobile.tipo_annuncio=="Asta"){
        this.service.getAstaByImmobile(this.immobile.id).subscribe(ast => this.asta = ast)
        this.existAsta = true;
      }

      //dato il cf del proprietario da immobile interrogo il database per avere i dati del venditore
      this.service.getUtente(this.immobile.proprietario).subscribe(ute => { 
        this.utente = ute 
        
        //dato il cf del proprietario da immobile interrogo il database per avere altri annunci del venditore
        this.service.getImmobiliByCF(this.utente.id).subscribe(imm => {
          this.immobili = imm
          this.existImmobili = true;
          //DA FARE controllare se esistono altri annunci

        });
      });
    });

    //dato l'id dell'immobile  interrogo il database per avere le recensioni dell'immobile
    this.service.getRecensioniByImmobileID(this.id).subscribe(rec =>{ 
      this.recensioni = rec 
      this.existRecensioni = true;
      //DA FARE controllare se esistono recensioni
    });

  }

  cliccato(id: number) {
    this.router.navigate(['/pag-annuncio', id]);
  }

  aggRecensione(){
    this.addRecensione = true;
  }

  onSubmit(){
    this.service.setRecensione({
      titolo: this.formAggRec.value.titolo,
      rating: this.formAggRec.value.valutazione,
      autore: this.auth.utenteCorrente.id,
      immobile: this.id
    }).subscribe()
    this.addRecensione = false;
  }
}