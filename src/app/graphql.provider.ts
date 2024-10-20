import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const uriPath= 'https://worthy-bear-42.hasura.app/v1/graphql'; // <-- add the URL of the GraphQL server here

export function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);
  const http = httpLink.create({ uri: uriPath });
  const auth = setContext(async () => {
    return {
      headers: {
        'x-hasura-admin-secret':
        "HINCMOtg8j9unPjz7iB90GNltB67pE9EgNZ6S5DXnNGuL4B90wHZV12lVmRC2406",
        'Access-Control-Allow-Origin': '*',
      },
    };
  });

  const link = auth.concat(http);

  return {
    link,
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];