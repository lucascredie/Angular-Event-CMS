import { Injectable } from '@angular/core';
import {AngularFireAuth } from 'angularfire2/auth';
import {Observable} from'rxjs/observable';
import { promise } from 'protractor';
import { reject } from 'q';

@Injectable()
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  logIn(email:string, password:string) {

    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userdata => resolve(userdata),
    err => reject(err));
    })
  }

  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

  logOut() {
    this.afAuth.auth.signOut();
  }
}
