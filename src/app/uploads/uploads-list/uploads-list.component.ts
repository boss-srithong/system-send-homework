import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UploadFileService } from '../shared/upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-uploads-list',
  templateUrl: './uploads-list.component.html',
  styleUrls: ['./uploads-list.component.css']
})
export class UploadsListComponent implements OnInit {
  fileUploads: any[];
  myuid;
  cardid;
  myh;
  mycid;
  pdfSrc
  showData
  showKey
  listData
  index
  indexList
  constructor(private uploadService: UploadFileService,
    routes: ActivatedRoute,
    public db: AngularFireDatabase,
    config: NgbModalConfig, 
    private modalService: NgbModal
  ) {
    const myuid = routes.snapshot.params['uid'];
    const mycid = routes.snapshot.params['cid'];
    const myh = routes.snapshot.params['hname'];
    const cardid = routes.snapshot.params['cardid'];
    this.myuid = myuid;
    this.mycid = mycid;
    this.myh = myh;
    this.cardid = cardid;

  }

  ngOnInit() {
    // Use snapshotChanges().pipe(map()) to store the key
    const mypath = 'Users/' + this.myuid + '/courses/' + this.mycid + '/' + this.myh + '/' + this.cardid;
    this.uploadService.setPath(mypath);
    this.uploadService.getFileUploads(6).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });

    this.showFileHW()

  }

  showFileHW(){
    const mypath = this.myuid + '/courses/' + this.mycid + '/' + this.myh + '/' + this.cardid
    this.db.list(`Users/`+ mypath).valueChanges().subscribe( (res:any) => {
      this.showData = res
      // console.log(this.showData)
    })
   
  }

  delFileHW(index){
    // console.log(index)
    const mypath = this.myuid + '/courses/' + this.mycid + '/' + this.myh + '/' + this.cardid
    this.db.database.ref(`Users/`+ mypath).once("value").then( (res:any) => {
        this.remove(Object.keys(res.val())[index])
    })

    const upStatus = this.db.database.ref(`Users/` + this.myuid + '/courses/' + this.mycid+ '/list/data');
    upStatus.once('value',(res:any)=>{
      for(let index in res.val()){
              if(res.val()[index].id === this.cardid){
                this.changeStatus(index, this.myh) 
              }
      }  
    })

   
  }

  remove(key){
    const mypath = this.myuid + '/courses/' + this.mycid + '/' + this.myh + '/' + this.cardid
    let removeKey = this.db.database.ref(`Users/`+ mypath+ '/' + key)
    removeKey.remove()
  }

  changeStatus(index,idHW){
    const changestatus = this.db.database.ref(`Users/${this.myuid}/courses/${this.mycid}/list/data/${index}/homework/${idHW}`)
    changestatus.set({ score: '', datetime: '', status: false })
  }

  open(content,data) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static' })
    this.pdfSrc = data
  }

}
