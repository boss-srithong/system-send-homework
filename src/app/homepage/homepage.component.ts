import { Component, OnInit } from '@angular/core'
import {
  NgbModule,
  NgbModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap'
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import {} from '@ng-bootstrap/ng-bootstrap'
import { Observable } from 'rxjs'
import * as XLSX from 'xlsx'
import { ViewChild, ElementRef } from '@angular/core'
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  closeResult: string
  listCourse = []
  items: Observable<any[]>
  file_name
  files
  showData
  index
  btn_upload
  showName
  checkFileList = []
  showButton = []
  node
  checkList
  constructor(
    public myau: AngularFireAuth,
    public db: AngularFireDatabase,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef
  ) {
    this.myau.auth.onAuthStateChanged(data => {
      // console.log(data);
      if (data != null) {
        this.router.navigate(['/home'])
      } else {
        this.router.navigate(['/login'])
      }
    })
    this.spinner.show()
    let uid = localStorage.getItem('uid')
    this.db
      .list(`Users/${uid}/`)
      .valueChanges()
      .subscribe((data: any) => {
        this.listCourse = []
        // tslint:disable-next-line:forin
        for (var key in data[0]) {
          if (key != 'detail' && key != 'name' && key != 'new') {
            this.listCourse.push(key)
          }
        }
        this.spinner.hide()
        let myindex = 0
        this.checkFileList = []
        for (var key in data[0]) {
          if (key != 'detail' && key != 'name' && key != 'new') {
            this.checkFileList[myindex] = []
            this.checkFileList[myindex].push(key)
          }
          if (key != 'detail' && key != 'name' && key != 'new') {
            this.checkFileList[myindex].push({
              detail: data[0][key]['detail'],
              name: data[0][key]['name'],
              list: data[0][key]['list']
            })
          }
          if (key != 'detail' && key != 'name' && key != 'new') {
            myindex++
          }
        }
        this.spinner.hide();
      })
   
  }
  
  ngOnInit() {

  }

  deletCC(data) {
    console.log(data)
    let uid = localStorage.getItem('uid')
    var course = this.db.database.ref(`Users/${uid}/courses/${data}`)
    course.remove().then(data => {
      //this.router.navigate(['/login']);
    })
  }
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          //this.closeResult = `Closed with: ${result}`;
          let uid = localStorage.getItem('uid')
          var course = this.db.database.ref(`Users/${uid}/courses/${result.id}`)
          course
            .set({
              name: result.name,
              detail: result.detail
            })
            .then(data => {
              //this.router.navigate(['/login']);
            })
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
        }
      )
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC'
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop'
    } else {
      return `with: ${reason}`
    }
  }

  onFileChange(evt: any, index) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target
    if (target.files.length !== 1) throw new Error('Cannot use multiple files')

    const reader: FileReader = new FileReader()
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' })

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0]
      const ws: XLSX.WorkSheet = wb.Sheets[wsname]
      this.file_name = target.files[0].name
     
      /* save data */
      let data = XLSX.utils.sheet_to_json(ws, {
        header: ['no', 'id', 'flname']
      })

      this.index = index
      this.files = data

      this.checkFile(this.file_name, index)
           
    }
    reader.readAsBinaryString(target.files[0])
  }

  checkFile(file,index) {
    var extension = file.substr((file.lastIndexOf('.') +1));
    if (!/(xlsx)$/ig.test(extension)) {
      alert("กรุณาอัปโหลดไฟล์เป็น .xlsx")
      this.node = undefined
    } else {
      this.node = document.getElementById(`btn${index}`).innerHTML = `<button class='btn btn-success' id='btn${index}'>upload</button>`
    }
  }

  open2(content, idcourses) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static' })
    this.showFilename(idcourses)
  }

  showFilename(idcourses) {
    let uid = localStorage.getItem('uid')
    const mypath = `Users/${uid}/courses/${idcourses}/list/data`
    const readdb = this.db.list(mypath)
    
    readdb.valueChanges().subscribe((res: any) => {
      this.showName = res
    })
  }

  upload(idcourses, file, namefile) {
    let uid = localStorage.getItem('uid')
    var listName = this.db.database.ref(`Users/${uid}/courses/${idcourses}/list`)
    listName.set({ filename: namefile, data: file })
  }

 
}
