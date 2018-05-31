import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Upload } from './Upload';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private localstorge: LocalStorageService) { }

  private basePath = '/uploads';
  uploads: any;

  upload(upload: Upload) {
    const owner_id = this.localstorge.get('userUid');
    upload.owner_id = owner_id.toString();
    this.verify_upload(upload);
    const storageRef = firebase.storage().ref();
    const path = `${this.basePath}/${upload.owner_id}/${upload.project_id}/${upload.file.name}`;
    const uploadTask = storageRef.child(path).put(upload.file);
    return uploadTask;
  }

  verify_upload(upload: Upload) {
    if (!upload.owner_id || upload.file.type !== 'image/jpeg' || upload.file.size > 1048576) {
      throw new Error('File not an image or too big');
    }
  }
}
