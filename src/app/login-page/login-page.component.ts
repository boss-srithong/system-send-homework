import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  mydata = {
    name: 'surasak',
    lasname: 'sincha',
  }
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
  ) {
    afAuth.auth.onAuthStateChanged(function (user) {
      if (user != null) {
        router.navigate(['/home']);
      }
    });
  }
  ngOnInit() {

  }

  Signin(email: string, pass: string) {
    // console.log(email);
    this.afAuth.auth.signInWithEmailAndPassword(email, pass).then((data) => {
      console.log(data);
      localStorage.setItem('uid', data.user.uid);
      this.router.navigate(['/home']);
    });
  }
}
