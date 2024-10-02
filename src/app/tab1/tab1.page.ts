import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
//import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonHeader, IonButton, IonIcon, IonImg, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, CommonModule, IonHeader, IonButton, IonIcon, IonImg,  IonToolbar, IonTitle, IonContent],
})
export class Tab1Page {

constructor(public photoService: PhotoService) { }

addPhotoToGallery() {
  this.photoService.addNewToGallery();
}
}
