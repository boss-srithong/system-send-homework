import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {

  constructor(
    public ang: AngularFireAuth,
    private router: Router,
    public database: AngularFireDatabase,
  ) {

  }

  ngOnInit() {
  }
  signup(email, pass) {
    this.ang.auth.createUserWithEmailAndPassword(email, pass).then(data => {
      localStorage.setItem('uid', data.user.uid);
      this.database.database.ref(`Users/${data.user.uid}`).set({
        courses: {
          new: 'true'
        }
      }).then(data2 => {
        this.router.navigate(['/home']);
      });
      //console.log('ok');

    }).catch(error => {
      console.log('error');
    });
    console.log(email, pass);
  }
}
