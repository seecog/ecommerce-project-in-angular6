import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth'
import * as firebase from 'firebase';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public user : firebase.User;
  constructor(private _auth : AngularFireAuth) {
    this._auth.authState.subscribe(
      (res)=>{
        console.log('User is ',res)
      },
      (error)=>{
        console.log(error)
      }
    )
   }

  ngOnInit() {
  
    
  }

  login() {
  this._auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }
}
