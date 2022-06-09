import '../styles/globals.css'
import 'tippy.js/dist/tippy.css';
import type { AppProps } from 'next/app'
import React  from 'react';
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { appWithTranslation } from 'next-i18next';
import { authExchange } from '@urql/exchange-auth';
import Cookies from "js-cookie";
import {makeOperation} from "urql";
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import LogOut from "../helpers/LogOut";
import {RefreshMutation} from "../graphql/RefreshMutation";
import Head from 'next/head';
import { loader } from 'graphql.macro';
import { GetRoomQuery, SendMessageMutationVariables } from '../generated/graphql';
const GetRoom = loader("../graphql/GetRoom.graphql");
import schema from '../graphql.schema.json';

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
        cacheExchange({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            schema,
            keys: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                Message: data => data.createdAt,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                Notification: data => data.createdAt,
                UserResponse: () => null,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                RoomResponse: data => data.room.id,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                RoomMessagesResponse: data => data.room.id,
                Avatar: () => null,
            },
            optimistic: {
                sendMessage: ({id, message, date}: SendMessageMutationVariables, cache) => {
                    const messagesCache = cache.readQuery<GetRoomQuery>({
                        query: GetRoom,
                        variables: {
                            id,
                        },
                    })?.getRoom?.room?.messages || [];

                    const newMessage = {
                        __typename: "Message" as const,
                        userId: "PENDING",
                        createdAt: date,
                        isRead: false,
                        message: `${message}`,
                    };
                    messagesCache.push(newMessage);

                    return {
                        __typename: "RoomMessagesResponse",
                        status: "SUCCESS",
                        errors: null,
                        room: {
                            __typename: "RoomMessages",
                            id,
                            messages: messagesCache,
                        },
                    }
                },
            },
        }),
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
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
                <link rel="manifest" href="/favicon/site.webmanifest"/>
                <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
                <meta name="msapplication-TileColor" content="#da532c"/>
                <meta name="theme-color" content="#ffffff"/>
            </Head>
            {/*<Script src='https://upload-widget.cloudinary.com/global/all.js' strategy='beforeInteractive' />*/}
            {getLayout(<Component {...pageProps} />)}
        </Provider>
    )
}

export default appWithTranslation(MyApp);
