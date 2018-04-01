import { Component, OnInit } from '@angular/core';

import { Upload } from '../../services/upload/upload';
import { UploadService } from '../../services/upload/upload.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  ngOnInit() {
  }

  selectedFiles: FileList | null;
  currentUpload: Upload;
  uid=null;
  res=null;

  constructor(private upSvc: UploadService,private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.uid = params["uid"];
            this.res = params["res"];
        });
  }

  detectFiles($event: Event) {
      this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  uploadSingle() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new Upload(file.item(0));
      this.upSvc.pushUpload(this.currentUpload,this.uid);
    } else {
      console.error('No file found!');
    }
  }

  uploadMulti() {
    const files = this.selectedFiles;
    if (!files || files.length === 0) {
      console.error('No Multi Files found!');
      return;
    }

    Array.from(files).forEach((file) => {
      this.currentUpload = new Upload(file);
      this.upSvc.pushUpload(this.currentUpload,this.uid);
    });
  }
}
