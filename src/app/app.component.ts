import { Component,EnvironmentInjector} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(public environmentInjector: EnvironmentInjector)
  {
  }

}
