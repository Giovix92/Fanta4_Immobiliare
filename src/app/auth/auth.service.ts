import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utente } from "../Model/Utente";
import { ServiceService } from "../Service/service.service";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sessionId: string | null | undefined ;
  utenteCorrente: any;
  isLoggedIn: Boolean = false;
  lastAnnuncioVisited: Number = -1;
  constructor(private http: HttpClient, private service: ServiceService, private route: ActivatedRoute, private router: Router) {
    this.checkLogin();
  }

  checkLogin(): boolean {
    /**
     * Ritorna true se l'utente è già loggato e le informazioni sono già caricate
     */
    if(this.utenteCorrente != null) return true;
    this.sessionId = this.route.snapshot.queryParams['sessionId'];
    this.service.getUserDetails(this.sessionId).subscribe({
      next: (data) => {
        this.utenteCorrente = new Utente();
        this.utenteCorrente = data;
        this.isLoggedIn = true;
        localStorage.setItem("nome", this.utenteCorrente.nome);
        localStorage.setItem("cognome", this.utenteCorrente.cognome);
        localStorage.setItem("telefono", this.utenteCorrente.telefono);
        localStorage.setItem("tipologia", this.utenteCorrente.tipologia);
        localStorage.setItem("email", this.utenteCorrente.email);
        localStorage.setItem("password", this.utenteCorrente.password);
        localStorage.setItem("bannato", this.utenteCorrente.bannato);
        localStorage.setItem("id", this.utenteCorrente.id);  
        return true;
      },
      error:() => {
        const userFromLS = localStorage.getItem("id");
        if(userFromLS == null || userFromLS == undefined) {
          this.isLoggedIn = false;
          console.log("[!] SessionID not valid, and user not found in local storage!");
          return false;
        }
        this.isLoggedIn = true;
        this.utenteCorrente = new Utente();
        this.utenteCorrente.nome = localStorage.getItem("nome");
        this.utenteCorrente.cognome = localStorage.getItem("cognome");
        this.utenteCorrente.telefono = localStorage.getItem("telefono");
        this.utenteCorrente.tipologia = localStorage.getItem("tipologia");
        this.utenteCorrente.email = localStorage.getItem("email");
        this.utenteCorrente.password = localStorage.getItem("password");
        this.utenteCorrente.bannato = localStorage.getItem("bannato");
        this.utenteCorrente.id = localStorage.getItem("id");
        return true;
      },
    });
    return false;
  }

  isAdmin(): boolean {
    return this.utenteCorrente.tipologia == "admin";
  }

  isBuyer(): boolean {
    return this.utenteCorrente.tipologia == "buyer";
  }

  logout(): void {
    this.utenteCorrente = null;
    this.isLoggedIn = false;
    this.sessionId = null;
    localStorage.removeItem("nome");
    localStorage.removeItem("cognome");
    localStorage.removeItem("telefono");
    localStorage.removeItem("tipologia");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("bannato");
    localStorage.removeItem("id");
  }
}
