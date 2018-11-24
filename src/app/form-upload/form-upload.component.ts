import { Component, OnInit } from '@angular/core'
import { UploadFileService } from '../uploads/shared/upload.service'
import { FileUpload } from '../uploads/shared/upload'
import { Router, ActivatedRoute } from '@angular/router'
import { AngularFireDatabase } from 'angularfire2/database'
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ViewChild,ElementRef } from '@angular/core';
import * as moment from 'moment'
@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})


export class FormUploadComponent implements OnInit {
  pdfSrc;
  selectedFiles: FileList
  currentFileUpload: FileUpload
  progress: { percentage: number } = { percentage: 0 }
  myuid
  cardid
  myh
  mycid
  upFileOne = true
  canUp = true
  alert = false
  alert2 = false
  fileName
  fileResult
  btn_upload = false
  showData
  iframePdf
  pathHW
  index
  chooseFile = 'Choose file'
 
  constructor(
    private uploadService: UploadFileService,
    routes: ActivatedRoute,
    public db: AngularFireDatabase,
  ) {
    const myuid = routes.snapshot.params['uid']
    const mycid = routes.snapshot.params['cid']
    const myh = routes.snapshot.params['hname']
    const cardid = routes.snapshot.params['cardid']
    this.myuid = myuid
    this.mycid = mycid
    this.myh = myh
    this.cardid = cardid

    const mypath = 'Users/' + this.myuid + '/courses/' + this.mycid + '/' + this.myh + '/datetime'
    const mypath2 = 'Users/' + this.myuid + '/courses/' + this.mycid + '/' + this.myh + '/' + this.cardid

    db.database.ref(mypath).once('value').then(data => {
        let deadlind = data.val() ? new Date(data.val()) : undefined
        console.log('กำหนดส่ง', deadlind)
        let mydate = new Date()
        console.log('วันปัจจุบัน', mydate)

        if (mydate > deadlind) {
          this.alert = true
          this.canUp = true
          console.log('ไม่ได้')
        } else {
            if(!deadlind){
                this.canUp = true
                this.alert2 = true
            } else {
                this.canUp = false
                this.db.list(mypath2).valueChanges().subscribe(res => {
                    if(res.length === 0) {this.canUp = false}
                })
                console.log('ส่งได้')
            }
        }
      })
    
      this.showFileHW()

  }

  ngOnInit() {
   
  }

  upload() {
    const mypath = 'Users/' + this.myuid + '/courses/' + this.mycid + '/' + this.myh + '/' + this.cardid
    this.uploadService.setPath(mypath)
    const file = this.selectedFiles.item(0)
    this.selectedFiles = undefined
    this.currentFileUpload = new FileUpload(file)
    this.uploadService.pushFileToStorage(
      this.currentFileUpload,
      this.progress,
      mypath
    )
  }
  
  onFileChange(file: any) {
    const reader = new FileReader()
   
    if (file) {
      this.btn_upload = true
      reader.onload = () => {
        this.fileName = file.name
        this.fileResult = reader.result
        
        this.chooseFile = file.name
        this.checkFile(file.name)
        
      }
      reader.readAsDataURL(file)
    }
  }

  checkFile(file) {
    var extension = file.substr((file.lastIndexOf('.') +1));
    if (!/(pdf)$/ig.test(extension)) {
      alert("กรุณาอัปโหลดไฟล์เป็น .pdf")
      this.btn_upload = false
      this.chooseFile = 'Choose file'
    }
  }

  @ViewChild('myInput')
  myInputVariable: ElementRef;

  reset() {
    this.myInputVariable.nativeElement.value = ""
  }

  upfile(files,namefile){
    const mypath = `Users/` + this.myuid + '/courses/' + this.mycid + '/' + this.myh + '/' + this.cardid
    let upfileHW = this.db.database.ref(mypath);
    upfileHW.push().set({ filename: namefile, data: files })
    this.canUp= true
    this.btn_upload = false
    this.reset()
    this.chooseFile = 'Choose file'
    
    const checkList = this.db.database.ref(`Users/` + this.myuid + '/courses/' + this.mycid+ '/list/data');
    checkList.once('value',(res:any)=>{
      for(let index in res.val()){
            if(res.val()[index].id === this.cardid){
                this.statusHW(index, this.myh)
            } 
      }
   })
  }

  statusHW(index,idHW){
    const changestatus = this.db.database.ref(`Users/${this.myuid}/courses/${this.mycid}/list/data/${index}/homework/${idHW}`)
    let formateDate = new Date().getTime()
    changestatus.set({ status: true, score: 'รอตรวจ', datetime: formateDate})
  }

  saveUpdateFile(index,files,namefile){
    this.db.database.ref(`Users/${this.myuid}/courses/${this.mycid}/list/data/${index}/homework`).update({
      data:files,
      filename: namefile
    })
}

  showFileHW(){
    const mypath = this.myuid + '/courses/' + this.mycid + '/' + this.myh + '/' + this.cardid
    this.db.list(`Users/`+ mypath).valueChanges().subscribe(res => {
      this.showData = res  
      if(res.length > 0){
            this.canUp = true
      }
    })
  }

}
