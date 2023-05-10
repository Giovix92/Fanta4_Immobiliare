import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import {Utente} from "../../Model/Utente";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit{

  utente: Utente = new Utente();

  constructor(private route: ActivatedRoute, private service: ServiceService, private auth: AuthService){}
  
  ngOnInit(): void {

    this.utente = this.auth.utenteCorrente;

  }

}
