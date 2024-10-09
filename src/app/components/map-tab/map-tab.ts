import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from '../../../environments/environment';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-map-tab',
  templateUrl: 'map-tab.html',
  styleUrls: ['map-tab.css'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapTab {

  @ViewChild('map')mapRef:ElementRef;
  map: GoogleMap;

  constructor() {}

  ionViewDidEnter() {
    this.createMap();
  }
  
  async createMap(){
     this.map = await GoogleMap.create({
       id: 'my-map', // Unique identifier for this map instance
       apiKey: environment.mapsKey,
       element: this.mapRef.nativeElement,
       forceCreate: true,
       config: {
          center: {
           lat: 39.066,
           lng: -76.511,
          },
          zoom: 12 
        },
    }) 
  } 
}  