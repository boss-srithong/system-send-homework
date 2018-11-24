import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment-timezone'
import { ViewChild,ElementRef } from '@angular/core';
@Component({
  selector: 'app-listhw',
  templateUrl: './listhw.component.html',
  styleUrls: ['./listhw.component.css']
})

export class ListhwComponent implements OnInit {
  uid;
  cid;
  keyHw = [];
  dateNow
  node
  constructor(
    db: AngularFireDatabase,
    route: Router,
    routes: ActivatedRoute,
    private spinner: NgxSpinnerService,

  ) {

    const myuid = routes.snapshot.params['uid'];
    const mycid = routes.snapshot.params['cid'];
    this.uid = myuid;
    this.cid = mycid;
    this.dateNow = new Date()

    const readdb = db.list(`Users/${myuid}/courses/${mycid}`)
    readdb.valueChanges().subscribe( (data:any) =>{
          // console.log(data)
    })
    const readdb2 = db.database.ref(`Users/${myuid}/courses/${mycid}`).once('value').then(data => {
      // console.log(data.val())
      
      for (let key in data.val()) {
        // console.log(key)
        if (key != 'detail' && key != 'name' && key != 'list') {
          let dt = new Date(data.val()[key]['datetime'])
          let options = {  weekday: "long", day: 'numeric', month: 'short', year: 'numeric' } 
          const formatTime = dt.toTimeString()
          let convertTime = formatTime.split(' ')[0]

          let current:any = moment(new Date())
          let deadline:any = moment(new Date(data.val()[key]['datetime']))
          let diffday = deadline.diff(current,'day')
          let difftime = deadline.diff(current)
          let diffDuration = moment.duration(difftime)

          this.keyHw.push({
            name: key,
            uid: myuid,
            cid: mycid,
            detail: data.val()[key]['detail'],
            date: dt.toLocaleDateString('th-TH', options) +' เวลา '+ convertTime,
            checkdate: dt,
            timeout: diffday +' วัน '+diffDuration.hours()+' ชั่วโมง '+diffDuration.minutes() + ' นาที '
          })
        }
      }

      this.spinner.hide();

    })
  }
  @ViewChild('#ctd')
  myTDVariable: ElementRef;

  ngOnInit() {
    this.spinner.show();

    this.node = this.myTDVariable
    // this.myInputVariable.nativeElement.value = ""
    console.log(this.node)

  }


}
