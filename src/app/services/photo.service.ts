import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import * as S3 from 'aws-sdk/clients/s3';
import {environment} from '../../environments/environment.prod'
@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  public photos: UserPhoto[] = [];

  constructor() { }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      width: 600,
      height: 600,
    });
  
  // Save the picture and add it to photo collection
  const savedImageFile = await this.savePicture(capturedPhoto);
  this.photos.unshift(savedImageFile);
}

private async savePicture(photo: Photo) {
  //convert photo to base64 format, required by Filesystem API to save
  const base64Data = await this.readAsBase64(photo)
  var promise: any = new Promise((resolve, reject) => {
    const params = {
      Bucket: 'fishapppics',
      Key: '2024/12/' + Date.now() + '.jpeg',
      Body: base64Data,
    };

    const bucket = new S3({
      accessKeyId: environment.KEY_ID,
      secretAccessKey: environment.AWS_KEY,
      region: 'us-east-1',
      signatureVersion: 'v4',
    });

    bucket.upload(params, (err: any, data: any) => {
      if (err) {
        console.log('ERROR: ', JSON.stringify(err));
      } else {
        return resolve(data['Location']);
      }
    });
  })

  // Write the file to the directory
  const fileName= Date.now() + '.jpeg';
  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data
  })

  // Use webPath to display the new image instead of base64 since it's
  // already loaded into memory
  return {
    filepath: fileName,
    webviewPath: photo.webPath
  };
}
 
private async readAsBase64(photo: Photo) {
  // Fetch the photo, read as a blob, then convert to base64 format
  const response = await fetch(photo.webPath!);
  const blob = await response.blob();
  return blob
}

private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
    resolve(reader.result);
  };
  reader.readAsDataURL(blob)
});

}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
