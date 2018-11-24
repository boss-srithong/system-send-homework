import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx'
import { ViewChild,ElementRef } from '@angular/core';
@Component({
  selector: 'app-export-file',
  templateUrl: './exportFile.component.html',
  styleUrls: ['./exportFile.component.css']
})

export class ExportFile implements OnInit {
  hid
  cc
  uid
  idHW
  tableAll = []
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
    this.spinner.show()
    this.showTable()
  }

  @ViewChild('mytd')
  mytd: ElementRef;

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
                     
                            if(index === '0'){
                                this.tableAll[0].push(
                                  res[index][key][key2]
                                 )
                            } else {
                                this.tableAll[index].push(
                                  res[index][key][key2].score
                                 )
                            }
                      //  console.log(key2)
                    } 
                  }
              }
            }
              // console.log( this.tableAll)   
  })

}

  exportTable(){
    var wb = XLSX.utils.table_to_book(document.getElementById('exportTableALL'));
    var test = XLSX.writeFile(wb, `${this.hid}.xlsx`);
  }

}
