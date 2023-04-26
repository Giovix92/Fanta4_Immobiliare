import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = true;
  admin = false;

  constructor(private http: HttpClient) { }

  isAuthenticated(){
    return this.isLoggedIn;
  }

  isAdmin(){
    return this.admin;
  }




  signIn(email: string, password: string){
    //return this.http.post()
  }   
}
