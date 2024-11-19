import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab } from '@ionic/angular/standalone';

import { Observable, Subject } from 'rxjs';
import * as ExifReader from 'exifreader'
import { decode } from "base64-arraybuffer";

@Component({
  selector: 'app-logs-tab',
  templateUrl: 'logs-tab.html',
  styleUrls: ['logs-tab.css'],
  standalone: true,
  imports: [IonFab,  CommonModule, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class LogsTabComponent {


  
}