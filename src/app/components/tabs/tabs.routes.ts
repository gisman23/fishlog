import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'camera',
        loadComponent: () =>
          import('../../components/camera-tab/camera-tab').then((m) => m.CameraTabComponent),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../logs-tab/logs-tab').then((m) => m.LogsTabComponent),
      },
      {
        path: 'map',
        loadComponent: () =>
          import('../../components/map-tab/map-tab').then((m) => m.MapTabComponent),
      },
      {
        path: '',
        redirectTo: '/tabs/map',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/map',
    pathMatch: 'full',
  },
];
