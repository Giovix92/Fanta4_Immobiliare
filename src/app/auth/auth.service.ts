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
        return true;
      },
      error:() => {
        this.isLoggedIn = false;
        console.log("[!] SessionID not valid!");
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
  }
}
