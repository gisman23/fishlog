import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APOLLO_OPTIONS, Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache, from } from '@apollo/client/core';
import * as Realm from 'realm-web';
import { setContext } from '@apollo/client/link/context';
import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
//import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
 //   importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    Apollo,
  ],
};

const { APP_ID, GRAPHQL_URI, API_KEY } = environment;

const app = new Realm.App(APP_ID);

// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  // Guarantee that there's a logged in user with a valid access token
  if (!app.currentUser) {
    //If no user is logged in, log in an anonymous user. The logged in user will have a valid access token.
    const credentials = Realm.Credentials.apiKey(API_KEY);
    // const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
    try {
      await app.logIn(credentials);
    } catch (err) {
      console.error('Failed to log in', err);
    }
  } else {
    // An already logged in user's access token might be stale. To guarantee that the token is
    // valid, we refresh the user's custom data which also refreshes their access token.
    await app.currentUser.refreshCustomData();
  }
  return app.currentUser!.accessToken;
}

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({ uri: GRAPHQL_URI });
  //Create a new ApolloLink that appends the access token to the headers of each GraphQL request.
  const auth = setContext(async () => {
    const token = await getValidAccessToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const link = auth.concat(http);

  return {
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  };
}