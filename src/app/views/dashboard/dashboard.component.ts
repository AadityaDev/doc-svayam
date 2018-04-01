import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { ActivatedRoute } from "@angular/router";
import { Upload } from '../../services/upload/upload';
import { UploadService } from '../../services/upload/upload.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	uid=null;
	res=null;
	ref=null;
	task=null;
	uploadProgress=null;
	downloadURL=null;
  selectedFiles: FileList;
  currentUpload: Upload;

  uploads: Observable<Upload[]>;
  showSpinner = true;

  data=null;

  constructor(private afStorage: AngularFireStorage,private route: ActivatedRoute,private upSvc: UploadService) {
  	this.route.queryParams.subscribe(params => {
            this.uid = params["uid"];
            this.res = params["res"];
        });
    // var credential = firebase.auth.TwitterAuthProvider.credential(token, secret);
// firebase.auth().signInWithCredential(credential).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// })

  }
  
  ngOnInit() {
    this.uploads = this.upSvc.getUploads(this.uid);
    console.log(this.uploads);
    this.uploads.subscribe(() => this.showSpinner = false);
  }

  upload(event) {
  const randomId = Math.random().toString(36).substring(2);
  this.ref = this.afStorage.ref(randomId);
  this.task = this.ref.put(event.target.files[0]);
  this.uploadProgress = this.task.percentageChanges();
  this.downloadURL = this.task.downloadURL();
  }

  detectFiles($event: Event) {
      this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  uploadSingle() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.currentUpload = new Upload(file.item(0));
      this.upSvc.pushUpload(this.currentUpload,this.uid);
      this.uploads = this.upSvc.getUploads(this.uid);
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
    this.uploads = this.upSvc.getUploads(this.uid);
  }

}
