import { Component, OnInit, Input } from '@angular/core';
import { UploadFileService } from '../shared/upload.service';
import { FileUpload } from '../shared/upload';
@Component({
  selector: 'app-upload-detail',
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.css']
})
export class UploadDetailComponent implements OnInit {
  @Input()
  fileUpload: FileUpload;
  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }

  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }
}
