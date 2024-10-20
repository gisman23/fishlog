import { Component, ViewChild, ElementRef, effect} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataSignalService } from '../../services/data.service';
import { GoogleMapsModule } from "@angular/google-maps";
//import { MarkerClusterer } from "@googlemaps/markerclusterer";

@Component({
  selector: 'app-map-tab',
  templateUrl: 'map-tab.html',
  styleUrls: ['map-tab.css'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, GoogleMapsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MapTab
{ 
  dateStr = ''
  map: google.maps.Map;
  marker:  google.maps.marker.AdvancedMarkerElement;
  markers: google.maps.marker.AdvancedMarkerElement[] = [];

  constructor(private dataService: DataSignalService) {
 /*  effect(() => {
      this.DisplayCatches(dataService.selectedCatches());
    }); */
    effect(() => {
      this.DisplayCatches(dataService.catches());
    }); 
  }

  ionViewDidEnter() {
   this.createMap();
  }
  
  async createMap()  {
    const { Map, InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    this.map = new Map(document.getElementById("map"), {
      center: { lat: 39.066, lng: -76.511 },
      zoom: 12,
      mapId: "DEMO_MAP_ID",
    });

 
     // Handle marker click
   //  await this.map.setOnMarkerClickListener((event) => {...});
   } 

  public DisplayCatches(catches) {
    console.log("catches - ",catches)
    this.markers = []

 //   this.featureGroup.clearLayers();
    catches.forEach((x) => {
      this.dateStr = String(x.CatchDate).substring(5,7) + '/' + String(x.CatchDate).substring(8,10) + '/' + String(x.CatchDate).substring(0,4)
      console.log(x.Loc[1], x.Loc[0])
      var popupContent =
        '<div>' +
        '<b>' + String(this.dateStr) + '</b> - ' + String(x.CatchTime) + 
        '<br/> ' +
        '<b> Fishermen:  </b> ' +
        String(x.Fisherman) +
        '<br/>' +
        '<b> Type Fish:  </b>' +
        String(x.Species) +
        '<br/>' +
        '<b> Air Temp:  </b>' +
        String(x.AirTemp) +
        '<br/>' +
      '<b> Water Temp:  </b>' + String(x.WaterTemp) + '<br/>';
      if (x.LowTideOffset > 0) {
        popupContent +=
          '<b> Low Tide Offset:  </b>' + String(x.LowTideOffset) + ' mins<br/>';
      }
      if (x.HighTideOffset > 0) {
        popupContent +=
          '<b> High Tide Offset:  </b>' + String(x.HighTideOffset) + ' mins<br/>';
      }
      popupContent +=
        '<br>' + '<img src=' + x.Picture + ' width="128" height="128"></div>';

      const map = this.map
      const position = new google.maps.LatLng(x.Loc[1], x.Loc[0])
      this.marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position, 
       });

  //  this.map.addLayer(this.markers);
 //   if (this.featureGroup.getBounds().isValid()) {
 //     this.map.fitBounds(this.featureGroup.getBounds(), { padding: [50, 50] }); */
    } )
  }
}
