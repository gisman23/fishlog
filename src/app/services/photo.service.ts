import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../environments/environment.prod';
import * as ExifReader from 'exifreader';
import { PhotoExifData } from '../models/PhotoExifData.model';
import piexif from "piexifjs";
import exifr from 'exifr'
import * as EXIF from 'exif-js'

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: UserPhoto[] = [];

  constructor() {}

  public async addNewToGallery() {


/*
    const stream = await navigator.mediaDevices.getUserMedia({ video : true });
    const track = stream.getVideoTracks()[0];
    let imageCapture = new ImageCapture(track);
    imageCapture.takePhoto().then((blob) => {
        const newFile = new File([blob], "MyJPEG.jpg", { type: "image/jpeg" });
        const tags =  ExifReader.load(newFile);
        console.log("tags- ", tags)
       });
    



*/

    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      width: 600,
      height: 600,
    });

; // Your Base64 image

   // const exifData = exifr.parse(capturedPhoto.webPath)
 //  console.log("data -", capturedPhoto.webPath)
   // let exifData = await exifr.parse(capturedPhoto.base64String, ['ISO', 'Orientation', 'LensModel'])
   // console.log("xz  ",exifData);
   console.log(capturedPhoto.format)
    const tags =  ExifReader.load(capturedPhoto.path);
    console.log("tags- ", tags)

    //const base64Data = this.readAsBase64(capturedPhoto);
    //console.log(base64Data)
    //const exifObj = piexif.load(base64Data);


    console.log(capturedPhoto.format)
    //console.log(exifObj)
    // Save the picture and add it to photo collection
   // const savedImageFile = await this.savePicture(capturedPhoto);
   // this.photos.unshift(savedImageFile);
  }
/*
  private async savePicture(photo: Photo) {
    //convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);
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
    });

    // Write the file to the directory
    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    }; 
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return blob;
  }

  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    })
*/
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  exif: any;
  format: string;
}
