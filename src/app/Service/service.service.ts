import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Immobile } from '../Model/Immobile';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }


  getImmobili(): Observable <Immobile[]>{
    return this.http.get<Immobile[]>('http://localhost:8080/api/immobili/findAll');
  }

  getImmobile(id: string): Observable <Immobile>{
    return this.http.get<Immobile>('http://localhost:8080/api/immobili/findById', {params: {id}} );
  }

  setImmobile(body: {}) {
    return this.http.post('http://localhost:8080/api/immobili/inserisciImmobile', body);
  }




  setUtente(body: {}) {
    return this.http.post('http://localhost:8080/api/utenti/inserisciUtente', body);
  }





}
