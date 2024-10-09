import {
  Component,
  PLATFORM_ID,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  IonButton,
  IonIcon,
  IonContent,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { StoreImageService } from '../../services/StoreImage.service';

@Component({
  selector: 'app-camera-tab',
  templateUrl: 'camera-tab.html',
  styleUrls: ['camera-tab.css'],
  standalone: true,
  imports: [
    IonFabButton,
    IonFab,
    IonButton,
    IonIcon,
    IonContent,
  ],
})
export class CameraTab {
  @ViewChild('video', { static: true }) video: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement: ElementRef;

  constructor(
    private storeImageService: StoreImageService,
    @Inject(PLATFORM_ID) private _platform: Object
  ) {
    if (isPlatformBrowser(this._platform) && 'mediaDevices' in navigator) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((ms: MediaStream) => {
          const _video = this.video.nativeElement;
          _video.srcObject = ms;
          _video.play();
        });
    }
  }

  async captureImage() {
    if (isPlatformBrowser(this._platform) && 'mediaDevices' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('Coords - ', latitude, longitude);
        },
        () => {
          console.log('Unable to retrieve your location');
        }
      );
    }
    const canvas = this.canvasElement.nativeElement;
    const video = this.video.nativeElement;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64 = canvas.toDataURL('image/jpeg'); // Returns Base64 data URL
    await this.storeImageService.storeImageData(base64);
    console.log("File: ",  this.storeImageService.getPic())
  }
}
