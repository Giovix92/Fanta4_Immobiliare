import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Immobile } from '../Model/Immobile';
import { Utente } from '../Model/Utente';
import { Recensione } from '../Model/Recensione';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }


  getImmobili(): Observable <Immobile[]>{
    return this.http.get<Immobile[]>('http://localhost:8080/api/immobili/findAll');
  }

  getImmobile(id: string): Observable <Immobile>{
    return this.http.get<Immobile>('http://localhost:8080/api/immobili/' + id );
  }

  setImmobile(body: {}) {
    return this.http.post('http://localhost:8080/api/immobili/inserisciImmobile', body);
  }

  getUtente(cf: string): Observable <Utente>{
    return this.http.get<Utente>('http://localhost:8080/api/utenti/' + cf );
  }

  setUtente(body: {}) {
    return this.http.post('http://localhost:8080/api/utenti/inserisciUtente', body);
  }

  getRecensioni(id: string): Observable <Recensione[]>{
    return this.http.get<Recensione[]>('http://localhost:8080/api/recensioni/findByImmobile/' + id);
  }

  getUserDetails(sessionId: string | null | undefined) {
    return this.http.get<Utente>(`http://localhost:8080/api/utenti/user-details?sessionId=` + sessionId);
  }


}
