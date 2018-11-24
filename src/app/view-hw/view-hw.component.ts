import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx'
import * as moment from 'moment'
@Component({
  selector: 'app-view-hw',
  templateUrl: './view-hw.component.html',
  styleUrls: ['./view-hw.component.css']
})

export class ViewHWComponent implements OnInit {
  list = [];
  showData = [];
  showName
  closeResult: string;
  name;
  detail;
  cid;
  pdfSrc
  index
  hid
  cc
  uid
  indexList
  idHW
  tableHW
  tableAll
  score = 'ยังไม่ได้ตรวจ'
  constructor(
    public myau: AngularFireAuth,
    public db: AngularFireDatabase,
    route: ActivatedRoute,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,

  ) {
    const hid = route.snapshot.params['hid'];
    const cc = route.snapshot.params['cc'];
    const uid = localStorage.getItem('uid');
    this.hid = hid; 
    this.cc = cc;
    this.uid = uid
    this.idHW = cc;

  }
  
  ngOnInit() {
    this.spinner.show();
    // this.showAll()
    this.showTable()
    this.showFilename()
  }

  

  showAll(){
  
    const path = localStorage.getItem('uploadPath')
    const mypath = `Users/${this.uid}/courses/${this.hid}`
    const readdb2 = this.db.list(mypath)
    readdb2.valueChanges().subscribe( (res:any) => {
      let myindex = 0;
      this.showData = []   
for(let index in res) {
    if( typeof res[index] === 'object'){
        if(res[index].data === undefined){
              for(let key in res[index]){
                  if( key != 'datetime' && key != 'detail' && key != 'list' ){
                  this.showData[myindex] = [];
                  this.showData[myindex].push(key);
                  // console.log(key)
                  }
            for(let key2 in res[index][key]) {
              if (key != 'datetime' && key != 'detail' && key != 'list' ) {
                this.showData[myindex].push({
                  filename: res[index][key][key2]['filename'],
                  data: res[index][key][key2]['data'],
                  score: res[index][key][key2]['score']||'ยังไม่ได้ตรวจ',
                  id: [key],
                  key: [key2]
                })
                }
              }
            myindex++;
          }
       }
    }
 }
    this.spinner.hide()
   for(let key in this.showData){
    var upFiletoList = this.db.database.ref(`Users/` + this.uid + '/courses/' + this.hid+ '/list/data')
    upFiletoList.on('value',(res:any)=>{
      for(let index in res.val()){
              if(res.val()[index].id === this.showData[key][0]){
                this.indexList = index
        }
      }
    })
  }
  })
  
}

showTable(){
  let uid = localStorage.getItem('uid')
  const readdb = this.db.list(`Users/${uid}/courses/${this.hid}/list/data`)
  readdb.valueChanges().subscribe( (res:any) => {
               this.spinner.hide()
               this.tableAll = []
               for(let index in res){      
                   this.tableAll[index] = []
                   for(let key in res[0]){
                     this.tableAll[index][key] = []
                     if(key == 'no'){ this.tableAll[index][0] = res[index][key] }
                     if(key == 'id'){ this.tableAll[index][1] = res[index][key] }
                     if(key == 'flname'){ this.tableAll[index][2] = res[index][key] }   
                     if(key == 'homework'){
                        for(let key2 in res[index][key]){ 
                          if(key2 === this.cc){    
                               if(index === '0'){
                                   this.tableAll[0].push(
                                     res[index][key][key2], 'ส่งเมื่อ'
                                    )
                               } else {
                                let dt = new Date(res[index][key][key2].datetime)
                                let options = { day: 'numeric', month: 'short', year: 'numeric' } 
                                const formatTime = dt.toTimeString()
                                let convertTime = formatTime.split(' ')[0]

                                   this.tableAll[index].push(
                                     res[index][key][key2].score,
                                     (res[index][key][key2].datetime) ? new Date(res[index][key][key2].datetime).toLocaleDateString('th-TH', options) +' เวลา '+ convertTime : ''
                                    )
                               }
                          }
                       } 
                     }
                 }
               }
              //  console.log(this.tableAll)  
  })

}

showFilename(){
  let uid = localStorage.getItem('uid')
  const mypath = `Users/${uid}/courses/${this.hid}/list/data`
  const readdb = this.db.list(mypath)
  readdb.valueChanges().subscribe((res:any) => {
    this.showName = res
    this.tableHW = []
    for(let index in res){      
        this.tableHW[index] = []
        for(let key in res[0]){
          this.tableHW[index][key] = []
          if(key == 'no'){ this.tableHW[index]['no'] = res[index][key] }
          if(key == 'id'){ this.tableHW[index]['id'] = res[index][key] }
          if(key == 'flname'){ this.tableHW[index]['flname'] = res[index][key] }   
          if(key == 'homework'){
             for(let key2 in res[index][key]){ 
              this.tableHW[index][key][key2] = []
               if(key2 === this.cc){    
                    if(index === '0'){   
                        this.tableHW[0].push(
                          res[index][key][key2], 'ส่งเมื่อ'
                         )
                       
                    } else {
                      let dt = new Date(res[index][key][key2].datetime) 
                      let options = { day: 'numeric', month: 'short', year: 'numeric' } 
                      const formatTime = dt.toTimeString()
                      let convertTime = formatTime.split(' ')[0]

                        this.tableHW[index][key2] = {
                          score: res[index][key][key2].score,
                          datetime: (res[index][key][key2].datetime) ? new Date(res[index][key][key2].datetime).toLocaleDateString('th-TH', options) +' เวลา '+ convertTime : '',
                          status: res[index][key][key2].status
                        }
                       
                    }
               }
            } 
          }
      }
    }
    console.log(this.tableHW)
  this.spinner.hide()
  })
}

  open2(content,id){
    let showPDF = this.db.list(`Users/${this.uid}/courses/${this.hid}/${this.idHW}/${id}`)
    showPDF.valueChanges().subscribe( (res:any) =>{
      this.pdfSrc = res[0].data
    })

   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'lg', backdrop: 'static' })
   .result.then(
    result => {
      let checkList = this.db.database.ref(`Users/` + this.uid + '/courses/' + this.hid+ '/list/data');
      checkList.once('value',(res:any)=>{
        for(let index in res.val()){
              if(res.val()[index].id === id){
                 this.saveScoreInHW(index, result.idHW, result.score)
              } 
        }
     })
    },
    reason => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
    }
  )
}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  saveScoreInHW(index,idHW,score){
    var saveScore = this.db.database.ref(`Users/` + this.uid + '/courses/' + this.hid+ '/list/data')
    saveScore.child(`${index}/homework/${idHW}`).update({score:score})
  }


  saveScore(score,id,key){
    const writedb = this.db.database.ref(`Users/${this.uid}/courses/${this.hid}/${this.cc}`)
    writedb.child(`/${id}/${key}`).update({score: score})
     
     this.upDateScore(id,score)
  }

  upDateScore(id,score){

    const checkdb = this.db.database.ref(`Users/${this.uid}/courses/${this.hid}/list/data`)
    checkdb.on('value',(res:any)=>{
       for(let index in res.val()){
               if(res.val()[index].id === id[0]){
               this.index = index
              }
       }
    })
    if (this.index && score) {
           this.saveUpdateScore(this.index,score)
    }    
  }

  saveUpdateScore(index,score){
      this.db.database.ref(`Users/${this.uid}/courses/${this.hid}/list/data/${index}`).update({score: score})
  }

  exportTable(){
   
    let wb = XLSX.utils.table_to_book(document.getElementById('exportTable'));
    let exportfile = XLSX.writeFile(wb, `${this.hid}_${this.cc}.xlsx`);

    //  console.log(test)
  }

}
