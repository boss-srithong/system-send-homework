import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-upload-hw',
  templateUrl: './upload-hw.component.html',
  styleUrls: ['./upload-hw.component.css']
})
export class UploadHWComponent implements OnInit {
  myuid;
  mycid;
  myh;
  cardid;
  title;
  description;
  constructor(
    routes: ActivatedRoute,
  ) {
   /* const myuid = routes.snapshot.params['uid'];
    const mycid = routes.snapshot.params['cid'];
    const myh = routes.snapshot.params['hname'];
    const cardid = routes.snapshot.params['cardid'];
    console.log(cardid);
*/
  }

  ngOnInit() {
  }

}
