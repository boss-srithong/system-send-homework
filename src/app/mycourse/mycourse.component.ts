import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { ViewChild, ElementRef } from '@angular/core'

@Component({
  selector: 'app-mycourse',
  templateUrl: './mycourse.component.html',
  styleUrls: ['./mycourse.component.css']
})
export class MycourseComponent implements OnInit {
  couseName: string;
  couseDetail: string;
  cid;
  showAddHM = false;
  myDate;
  listHomework = [];
  startDate =  new Date()
  handleChange
  constructor(
    public myau: AngularFireAuth,
    public db: AngularFireDatabase,
    route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    
  ) {
    const mycid = route.snapshot.params['cid'];
    this.cid = mycid;
    const uid = localStorage.getItem('uid');
    const readdb = db.database.ref(`Users/${uid}/courses/${mycid}`);
    readdb.once('value').then(data => {
      this.couseName = data.val().name;
      this.couseDetail = data.val().detail;
      
  })
  }

  ngOnInit() {
    this.spinner.show();
    let uid = localStorage.getItem('uid');
    this.db.list(`Users/${uid}/`).valueChanges().subscribe(data => {
      this.listHomework = [];
      // tslint:disable-next-line:forin
      for (var key in data[0][this.cid]) {
        if (key != 'detail' && key != 'name' && key != 'list') {
          this.listHomework.push(key);
        }
      }
      this.spinner.hide();
    })
  }
  
  addHM() {
    if (this.showAddHM === true) {
      this.showAddHM = false;
    } else {
      this.showAddHM = true;
    }
    //console.log('add hm');
  }

  updateDate(even) {
    let options = {  weekday: "long", day: 'numeric', month: 'short', year: 'numeric' } 
    let newDate = even.toLocaleString()
    const formatTime = new Date(newDate).toTimeString()
    let convertTime = formatTime.split(' ')[0]
    this.myDate =  new Date(newDate).toLocaleDateString('th-TH', options) + ' เวลา ' + convertTime

    // this.myDate = moment(newDate).format('DD/MM/YYYY, HH:mm:ss')
  }

  SaveData(topic:string, mytime, detail:string) {
    //console.log(`id:${this.state.courseID} name:${this.state.cname} detail:${this.state.cdetail}`);
    console.log('my',new Date(new Date(mytime).getTime()))
    let uid = localStorage.getItem('uid');
    let newDate = new Date(mytime).getTime()
      if(topic && mytime && detail){
        var course = this.db.database.ref(`Users/${uid}/courses/${this.cid}/${topic}`);
        course.set({ datetime: newDate, detail: detail})
        .then(data => {
          // tslint:disable-next-line:no-unused-expression

          this.saveStatusHW(topic)

          this.showAddHM = false;
          console.log('close');
        })
      } else if(!topic || !mytime || !detail) {
        alert('กรุณากรอกข้อมูลให้ครบ')
      }
  }

  saveStatusHW(topic){
    let uid = localStorage.getItem('uid');
    let readdbList = this.db.database.ref(`Users/${uid}/courses/${this.cid}/list/data`)
    readdbList.once('value', (res:any) => {
          for(let index in res.val()){
                if(index === '0'){
                    let updateTopic = this.db.database.ref(`Users/${uid}/courses/${this.cid}/list/data/${index}/homework/${topic}`)
                    updateTopic.set(`${topic}`)
                } else {
                  let updateTopic = this.db.database.ref(`Users/${uid}/courses/${this.cid}/list/data/${index}/homework/${topic}`)
                  updateTopic.set({ status: false, score: '', datetime: ''})
                }
          }
    })
  }

  deletCC(idHW) {
    let uid = localStorage.getItem('uid')
    var course = this.db.database.ref(`Users/${uid}/courses/${this.cid}/${idHW}`);
    course.remove()

    this.delHWLiet(idHW)

  }

  delHWLiet(idHW){
    let uid = localStorage.getItem('uid');
    let readdbList = this.db.database.ref(`Users/${uid}/courses/${this.cid}/list/data`)
    readdbList.once('value', (res:any) => {
          for(let index in res.val()){
                    let updateTopic = this.db.database.ref(`Users/${uid}/courses/${this.cid}/list/data/${index}/homework/${idHW}`)
                    updateTopic.remove()
          }
    })
  }

}
