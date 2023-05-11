import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Immobile } from '../Model/Immobile';
import { Utente } from '../Model/Utente';
import { Recensione } from '../Model/Recensione';
import { Asta } from '../Model/Asta';
import { Filtro } from '../Model/Filtro';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  //#######################################################IMMOBILE#######################################################
  //Effettua una findAll per avere tutti gli annunci
  getImmobili(): Observable <Immobile[]>{
    return this.http.get<Immobile[]>('http://localhost:8080/api/immobili/findAll');
  }

  //Effettua una findByFiltro per avere tutti gli annunci e li ordina
  getImmobiliByFiltro(filtri: Filtro): Observable <Immobile[]>{
    return this.http.get<Immobile[]>('http://localhost:8080/api/immobili/' + filtri);
  }

  //Effettua una ricerca dell'annuncio dato l'id dell'immobile
  getImmobile(id: string): Observable <Immobile>{
    return this.http.get<Immobile>('http://localhost:8080/api/immobili/' + id );
  }

  //Effettua una ricerca di tutti gli annunci inseriti dal venditore tramite cf
  getImmobiliByCF(cf: string): Observable <Immobile[]>{
    return this.http.get<Immobile[]>('http://localhost:8080/api/immobili/findAll' + cf);
  }

  //Salva l'annuncio 
  setImmobile(body: {}) {
    return this.http.post('http://localhost:8080/api/immobili/inserisciImmobile', body);
  }





  //#######################################################UTENTE#######################################################
  getUtente(cf: string): Observable <Utente>{
    return this.http.get<Utente>('http://localhost:8080/api/utenti/' + cf );
  }

  setUtente(body: {}) {
    return this.http.post('http://localhost:8080/api/utenti/inserisciUtente', body);
  }

  

  



  //#######################################################RECENSIONE#######################################################
  getRecensioni(id: number): Observable <Recensione[]>{
    return this.http.get<Recensione[]>('http://localhost:8080/api/recensioni/findByImmobile/' + id);
  }




  //#######################################################RECENSIONE#######################################################
  getAstaByImmobile(id: number): Observable <Asta>{
    return this.http.get<Asta>('http://localhost:8080/api/VEDEREEEEEEE' + id);
  }






  //#######################################################LOGIN#######################################################
  getUserDetails(sessionId: string | null | undefined) {
    return this.http.get<Utente>(`http://localhost:8080/api/utenti/user-details?sessionId=` + sessionId);
  }


}
