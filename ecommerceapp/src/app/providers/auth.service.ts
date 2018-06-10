import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth'
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User>;
  constructor(private _auth : AngularFireAuth) { 
    this.user$ = _auth.authState;
  }

login(){
  this._auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
 }

 logout(){
  this._auth.auth.signOut();
 }

}
