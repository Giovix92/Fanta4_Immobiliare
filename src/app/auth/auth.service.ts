import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Utente} from "../Model/Utente";
import {ServiceService} from "../Service/service.service";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sessionId: string | null | undefined ;
  utenteCorrente: Utente = new Utente();
  isLoggedIn = false;
  constructor(private http: HttpClient, private service: ServiceService, private route: ActivatedRoute) {
    this.checkLogin();
  }

  checkLogin(): boolean {
    this.sessionId = this.route.snapshot.queryParams['sessionId'];
    this.service.getUserDetails(this.sessionId).subscribe({
      next: (data) => {
        this.utenteCorrente = data;
        console.log(data);
        this.isLoggedIn = true;
        return true;
      },
      error: (err) => {
        this.isLoggedIn = false;
        console.log("[!] SessionID not valid!");
        console.log(err);
      }
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
    this.utenteCorrente = new Utente();
    this.isLoggedIn = false;
    this.sessionId = null;
  }
}
