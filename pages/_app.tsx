import '../styles/globals.css';
import 'tippy.js/dist/tippy.css';
import type { AppProps } from 'next/app';
import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { authExchange } from '@urql/exchange-auth';
import Cookies from 'js-cookie';
import { makeOperation } from 'urql';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import LogOut from '../helpers/LogOut';
import { RefreshMutation } from '@/graphql/RefreshMutation';
import Head from 'next/head';
import schema from '../graphql.schema.json';

const getAuth = async ({ authState, mutate }: any) => {
  if (!authState) {
    const token = Cookies.get('token');
    const refreshToken = Cookies.get('refreshToken');
    console.log('token', token);
    console.log('refreshToken', refreshToken);
    if (token && refreshToken) {
      return { token, refreshToken };
    }
    return null;
  }

  const result = await mutate(RefreshMutation, {
    token: authState!.refreshToken,
  });

  if (result.data?.refreshLogin) {
    Cookies.set('token', result.data.refreshToken.token);
    Cookies.set('refreshToken', result.data.refreshToken.refreshToken);

    return {
      token: result.data.refreshToken.token,
      refreshToken: result.data.refreshToken.refreshToken,
    };
  }

  LogOut();

  return null;
};

const addAuthToOperation = ({ authState, operation }: any) => {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: authState.token ? `Bearer ${authState.token}` : '',
      },
    },
  });
};

const didAuthError = ({ error }: any) => {
  return error.graphQLErrors.some((e: any) =>
    e.message.includes('Access denied!')
  );
};

const client = createClient({
  url: process.env.API_URL || '',
  exchanges: [
    dedupExchange,
    cacheExchange({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      schema,
      keys: {
        BookEdition: (data: any) => data.id,
        Message: (data: any) => data.createdAt,
        Notification: (data: any) => data.createdAt,
        UserResponse: () => null,
        ChatResponse: (data: any) => data.chat.id,
        UserAvatar: () => null,
      },
    }),
    authExchange({
      addAuthToOperation,
      getAuth,
      didAuthError,
    }),
    fetchExchange,
  ],
});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider value={client}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}

export default MyApp;
