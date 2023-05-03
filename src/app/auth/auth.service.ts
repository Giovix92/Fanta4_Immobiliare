import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cfAutenticate = "BRLLSN98L30C349Y";
  isLoggedIn = true;
  admin = false;

  constructor(private http: HttpClient) { }

  cfAutenticated(){
    return this.cfAutenticate;
  }

  isAuthenticated(){
    return this.isLoggedIn;
  }

  isAdmin(){
    return this.admin;
  }


  signIn(email: string, password: string){
    const user = { email: email, password: password };
    window.location.href="http://localhost:8080/Login.html"
  }
}
