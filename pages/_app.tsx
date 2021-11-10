import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import React  from 'react';
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { appWithTranslation } from 'next-i18next';
import { authExchange } from '@urql/exchange-auth';
import Cookies from "js-cookie";
import NotificationProvider  from '../components/UI/NotificationProvider';
import {makeOperation} from "urql";
import { createClient, dedupExchange, cacheExchange, fetchExchange, Provider } from 'urql';
import LogOut from "../helpers/LogOut";
import {RefreshMutation} from "../graphql/RefreshMutation";

const getAuth = async ({ authState, mutate } :any) => {
    if (!authState) {
        const token = Cookies.get('token');
        const refreshToken = Cookies.get('refreshToken');
        console.log("token", token);
        console.log("refreshToken", refreshToken);
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

const addAuthToOperation = ({ authState, operation } :any) => {
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
    return error.graphQLErrors.some((e: any) => e.message.includes('Access denied!'));
};

const client = createClient({
    // url: 'https://bookswap-api-2-627cm.ondigitalocean.app/graphql',
    url: process.env.API_URL || '',
    exchanges: [
        dedupExchange,
        cacheExchange,
        authExchange({
            addAuthToOperation,
            getAuth,
            didAuthError
        }),
        fetchExchange,
    ],
});


type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <Provider value={client}>
            <Script src='https://upload-widget.cloudinary.com/global/all.js' strategy='beforeInteractive' />
            <NotificationProvider>
                {getLayout(<Component {...pageProps} />)}
            </NotificationProvider>
        </Provider>
    )
}


export default appWithTranslation(MyApp);
