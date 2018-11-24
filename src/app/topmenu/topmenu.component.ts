import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {

  constructor(
    public myau: AngularFireAuth,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  signOut() {
    this.myau.auth.signOut().then(data => {
      console.log('out ok');
      this.router.navigate(['/login']);
    }).catch(data => {
      console.log('error');
    });
  }
}
