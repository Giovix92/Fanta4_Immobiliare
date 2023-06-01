import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Immobile } from '../Model/Immobile';
import { Utente } from '../Model/Utente';
import { Recensione } from '../Model/Recensione';
import { Asta } from '../Model/Asta';
import { Filtro } from '../Model/Filtro';
import { Image } from '../Model/Image';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  // ### IMMOBILI ###
  /**
   * FindAll generica per gli immobili
   */
  getImmobili(): Observable<Immobile[]>{
    return this.http.get<Immobile[]>('http://localhost:8080/api/immobili/findAll');
  }

  /**
   * Get singolo immobile dato id
   */
  getImmobile(id: number): Observable<Immobile>{
    return this.http.get<Immobile>('http://localhost:8080/api/immobili/' + id );
  }

  /**
   * Effettua una ricerca di tutti gli annunci inseriti dal venditore tramite cf
   */
  getImmobiliByCF(cf: string): Observable<Immobile[]>{
    return this.http.get<Immobile[]>('http://localhost:8080/api/immobili/' + cf);
  }

  /**
   * Prendi l'ultimo immobile aggiunto dall'utente, utile per salvare le aste  
   */
  getLastAddedByOwner(id: string): Observable<Number> {
    return this.http.get<Number>('http://localhost:8080/api/immobili/getLastAddedByOwner/' + id)
  }

  /**
   * Prendi tutti gli immobili dato il codice fiscale
   */
  findAllByOwner(id: string): Observable<Immobile[]> {
    return this.http.get<Immobile[]>('http://localhost:8080/api/immobili/findAllByOwner/' + id)
  }

  /**
   * SaveOrUpdate immobile
   */
  setImmobile(body: {}) {
    return this.http.post('http://localhost:8080/api/immobili', body);
  }

  /**
   * Delete immobile dato l'id
   */
  deleteImmobile(id: Number) {
    return this.http.delete('http://localhost:8080/api/immobili/' + id);
  }

  /**
   * Update immobile dato id + body
   */
  updateImmobile(id: Number, body: {}): Observable<Immobile> {
    return this.http.put<Immobile>('http://localhost:8080/api/immobili/' + id, body);
  }

  // ### UTENTE ###
  /**
   * Get singolo utente dato codice fiscale
   */
  getUtente(cf: string): Observable <Utente>{
    return this.http.get<Utente>('http://localhost:8080/api/utenti/' + cf );
  }

  /**
   * Elimina utente dato id
   */
  deleteUtente(cf: string) {
    return this.http.delete('http://localhost:8080/api/utenti' + cf);
  }

  /**
   * Update utente dato id + body
   */
  updateUtente(cf: string, body: {}): Observable<Utente> {
    return this.http.put<Utente>('http://localhost:8080/api/utenti/' + cf, body);
  }

  /**
   * Get user details given a sessionId from backend
   */
  getUserDetails(sessionId: string | null | undefined) {
    return this.http.get<Utente>(`http://localhost:8080/api/utenti/user-details?sessionId=` + sessionId);
  }

  // ### RECENSIONI ###
  /**
   * Create recensione dato body
   */
  setRecensione(body: {}){
    return this.http.post('http://localhost:8080/api/recensioni', body);
  }

  /**
   * Trova recensioni dato l'immobile id
   */
  getRecensioniByImmobileID(id: number): Observable <Recensione[]>{
    return this.http.get<Recensione[]>('http://localhost:8080/api/recensioni/findByImmobile/' + id);
  }

  /**
   * Delete recensione dato l'id
   */
  deleteRecensione(id: Number) {
    return this.http.delete('http://localhost:8080/api/recensioni/' + id);
  }

  // ### ASTE ###
  /**
   * Creazione asta dato body
   */
  setAsta(body: {}) {
    return this.http.post('http://localhost:8080/api/aste', body);
  }

  /**
   * Get asta by immobile id
   */
  getAstaByImmobile(id: number): Observable <Asta>{
    return this.http.get<Asta>('http://localhost:8080/api/aste/findByImmobile/' + id);
  }

  /**
   * Update asta dato id
   */
  updateAsta(id: number, body: {}): Observable<Asta> {
    return this.http.put<Asta>('http://localhost:8080/api/aste/' + id, body);
  }

  // ### IMAGES ###
  /**
   * Creazione immagine dato body
   */
  createImage(body: {}) {
    return this.http.post('http://localhost:8080/api/images', body)
  }

  /**
   * Find all images dato id
   */
  findImagesByImmobileID(id: number): Observable<Image[]> {
    return this.http.get<Image[]>('http://localhost:8080/api/images/findByImmobile/' + id);
  }
}
