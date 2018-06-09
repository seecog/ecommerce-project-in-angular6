import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public user : firebase.User;
  constructor(private _auth : AngularFireAuth) {
    this._auth.authState.subscribe(
      (res)=>{
this.user = res;
      },
      (error)=>{
        console.log("The error is ",error)
      }
    )
   }

  ngOnInit() {
  }

  logout(){
    this._auth.auth.signOut();
  }


}
