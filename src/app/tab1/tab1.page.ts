import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
//import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonHeader, IonButton, IonIcon, IonImg, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { PhotoService } from '../services/photo.service';

import { WebcamModule } from 'ngx-webcam';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import * as ExifReader from 'exifreader'
import { decode } from "base64-arraybuffer";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, CommonModule, WebcamModule,IonHeader, IonButton, IonIcon, IonImg,  IonToolbar, IonTitle, IonContent],
})
export class Tab1Page {

  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  btnLabel: string = 'Capture image';
  constructor (){
    this.checkPermissions();
  }

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  snapshot(event: WebcamImage) {
    console.log("EVENT-", event.imageAsBase64);
    this.previewImage = event.imageAsDataUrl;
    this.btnLabel = 'Re capture image';



    const buffer = decode(event.imageAsBase64);

    const tags =  ExifReader.load(buffer);
    console.log("tags- ", tags)

  }

  checkPermissions() {
    navigator.mediaDevices.getUserMedia({
      video: {
    //    width: 500,
    //    height: 500
      }
    }).then((res) => {
      this.stream = res;
      this.status = 'My camera is accessing';
      this.btnLabel = 'Capture image';
    }).catch(err => {
      console.log(err);
      if(err?.message === 'Permission denied') {
        this.status = 'Permission denied please try again by approving the access';
      } else {
        this.status = 'You may not having camera system, Please try again ...';
      }
    })
  }

  captureImage() {
    this.trigger.next();
  }

  proceed() {
    console.log(this.previewImage);
  }
}
