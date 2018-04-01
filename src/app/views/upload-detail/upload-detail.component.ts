import { Component, OnInit, Input } from '@angular/core';

import { Upload } from '../../services/upload/upload';
import { UploadService } from '../../services/upload/upload.service';

@Component({
  selector: 'app-upload-detail',
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.css']
})
export class UploadDetailComponent implements OnInit {

  @Input() upload: Upload;
  userId = null;

  constructor(private upSvc: UploadService) { }

  deleteUpload() {
    this.upSvc.deleteUpload(this.upload,this.userId);
  }

  ngOnInit() {
  }

}
