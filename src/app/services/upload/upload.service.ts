import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Upload } from './upload';

@Injectable()
export class UploadService {

  basePath = 'uploads/users/';
  uploadsRef: AngularFireList<Upload>;
  uploads: Observable<Upload[]>;

  constructor(private db: AngularFireDatabase) { }

  getUploads(userId:string)  {
    this.basePath+=userId+'/';
    this.uploads = this.db.list(this.basePath)
    .snapshotChanges()
    .map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        console.log('data: '+JSON.stringify(data));
        console.log('key: '+$key);
        return { $key, ...data };
      });
    });
    return this.uploads;
  }

  deleteUpload(upload: Upload, userId: string) {
    this.deleteFileData(upload.$key,userId)
    .then( () => {
      this.deleteFileStorage(upload.name,userId);
    })
    .catch((error) => console.log(error));
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: Upload,userId: string) {
    this.basePath+=userId+'/';
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          this.saveFileData(upload,userId);
          return;
        } else {
          console.error('No download URL!');
        }
      },
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload,userId: string) {
    this.basePath+=userId+'/';
    this.db.list(`${this.basePath}/`).push(upload);
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string,userId: string) {
    this.basePath+=userId+'/';
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string,userId: string) {
    this.basePath+=userId+'/';
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

}
