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
          import('../../components/camera-tab/camera-tab').then((m) => m.CameraTab),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'map',
        loadComponent: () =>
          import('../../components/map-tab/map-tab').then((m) => m.MapTab),
      },
      {
        path: '',
        redirectTo: '/tabs/camera',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/camera',
    pathMatch: 'full',
  },
];
