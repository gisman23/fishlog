import { Component, ViewChild, ElementRef, effect} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataSignalService } from '../../services/data.service';
import { GoogleMapsModule } from "@angular/google-maps";
import { MarkerClusterer} from "@googlemaps/markerclusterer";

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
  map:any
  marker:  google.maps.marker.AdvancedMarkerElement;
  markers: google.maps.marker.AdvancedMarkerElement[] = [];

  constructor(private dataService: DataSignalService) {
   effect(() => {
      this.DisplayCatches(dataService.selectedCatches());
    }); 
    effect(() => {
      this.DisplayCatches(dataService.catches());
    }); 
  }

  ionViewDidEnter() {
   this.createMap();
 
  }
  
  async createMap()  {
    const { Map} = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

    this.map = new Map(document.getElementById("map"), {
      center: { lat: 39.066, lng: -76.511 },
      zoom: 12,
      mapId: "DEMO_MAP_ID",
    });

  }; 
   

  public async DisplayCatches(catches) {
    const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
 

    this.markers = []

 //   this.featureGroup.clearLayers();
    catches.forEach((x) => {
      this.dateStr = String(x.CatchDate).substring(5,7) + '/' + String(x.CatchDate).substring(8,10) + '/' + String(x.CatchDate).substring(0,4)
      const popupContent = 
        '<div id="infoText">' +
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
      '<b> Water Temp:  </b>' + String(x.WaterTemp) + '<br/></div>';
   /*   if (x.LowTideOffset > 0) {
        popupContent +=
          '<b> Low Tide Offset:  </b>' + String(x.LowTideOffset) + ' mins<br/>';
      }
      if (x.HighTideOffset > 0) {
        popupContent +=
          '<b> High Tide Offset:  </b>' + String(x.HighTideOffset) + ' mins<br/></div>';
      }
    //  popupContent +=
     //   '<br>' + '<img src=' + x.Picture + ' width="128" height="128"></div>';
*/
  const infoWindow = new InfoWindow({
  content: popupContent })
      const map = this.map
      const position = new google.maps.LatLng(x.Loc[1], x.Loc[0])
      const marker = new AdvancedMarkerElement({
          map,
          position, 
       });



       marker.addListener("click", () => {
  //      infoWindow.setContent("Hello how big is this box of text")
        infoWindow.open(
          {map,
          anchor: marker,
          }
        );
      });
      this.markers.push(marker)

  //  this.map.addLayer(this.markers);
 //   if (this.featureGroup.getBounds().isValid()) {
 //     this.map.fitBounds(this.featureGroup.getBounds(), { padding: [50, 50] }); */
    } )
    const map = this.map
    var mkl = this.markers
    new MarkerClusterer({map, markers:mkl})
  
}

 async initMap() {
  const uluru = { lat: -25.363, lng: 131.044 };
  const { Map} = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

  const map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    "sandstone rock formation in the southern part of the " +
    "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    "south west of the nearest large town, Alice Springs; 450&#160;km " +
    "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    "Aboriginal people of the area. It has many springs, waterholes, " +
    "rock caves and ancient paintings. Uluru is listed as a World " +
    "Heritage Site.</p>" +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: "Uluru",
  });
  const marker = new google.maps.Marker({
    position: uluru,
    map,
    title: "Uluru (Ayers Rock)",
  });

  marker.addListener("click", () => {
    infowindow.focus()
    infowindow.open({
      anchor: marker,
      map,
    });
  });
}
}