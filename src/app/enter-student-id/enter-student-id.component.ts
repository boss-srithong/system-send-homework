import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enter-student-id',
  templateUrl: './enter-student-id.component.html',
  styleUrls: ['./enter-student-id.component.css']
})
export class EnterStudentIdComponent implements OnInit {
  myuid;
  mycid;
  myh;
  constructor(
    routes: ActivatedRoute,
    private router: Router,

  ) {
    const myuid = routes.snapshot.params['uid'];
    const mycid = routes.snapshot.params['cid'];
    const myh = routes.snapshot.params['hname'];
    this.myuid = myuid;
    this.mycid = mycid;
    this.myh = myh;
    localStorage.setItem('uploadPath', 'Users/' + myuid + '/courses/' + mycid + '/' + myh);

  }

  ngOnInit() {
  }
  goto(data) {
    this.router.navigate(['/send/' + this.myuid + '/' + this.mycid + '/' + this.myh + '/' + data.toUpperCase()]);
  }
}
