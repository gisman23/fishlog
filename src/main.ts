import { enableProdMode, importProvidersFrom, ModuleWithProviders} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules, withComponentInputBinding  } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { isDevMode } from '@angular/core';

import { environment } from './environments/environment';
import { provideServiceWorker } from '@angular/service-worker';
import { IonicModule } from '@ionic/angular';
import { provideHttpClient} from '@angular/common/http';
import { graphqlProvider } from './app/graphql.provider';
// Add the import
import { defineCustomElements } from '@ionic/pwa-elements/loader';

if (environment.production) {
  enableProdMode();
}


// Call the loader
defineCustomElements(window);

bootstrapApplication(AppComponent, {
  providers: [

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({innerHTMLTemplatesEnabled: true})),
    provideIonicAngular(),
    provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules)), provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideHttpClient(),
   graphqlProvider,
],
});


