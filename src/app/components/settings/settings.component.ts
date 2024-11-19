import { Component} from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { IonItem, IonList, IonSelectOption, IonSelect, IonButton, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports:[ IonList, IonItem, IonSelect, IonSelectOption, IonButton, IonText]
})
export class SettingsComponent {

  constructor(private modalCtrl: ModalController) { }

  dismissModal() {
    this.modalCtrl.dismiss()
  }

}
