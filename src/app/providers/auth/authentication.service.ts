import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
 
const TOKEN_KEY = 'votabrasil:token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
 
  constructor(private storage: Storage, private plt: Platform) { 
    this.checkToken();
  }
 
  checkToken() {
    let token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      this.authenticationState.next(true);
    }
  }
 
  login(dados) {
    this.storage.set('votabrasil:auth',dados.usuario);
    this.storage.set(TOKEN_KEY,dados.access_token);
    localStorage.setItem(TOKEN_KEY,dados.access_token);
    return this.storage.set(TOKEN_KEY,dados.access_token).then(() => {
      this.authenticationState.next(true);
    });
  }
 
  logout() {
    this.storage.remove('votabrasil:auth');
    this.storage.remove(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  getAuthStateObserver() {
    return this.authenticationState;
  }

  async userAuth() {
    return await this.storage.get('votabrasil:auth');
  }

  forget(email){
    this.storage.set("email", email);
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }

}