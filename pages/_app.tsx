import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import React, { useContext } from 'react';
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { appWithTranslation } from 'next-i18next';
import { withUrqlClient } from 'next-urql';
import Cookies from "js-cookie";
import NotificationProvider, { NotificationContext } from '../components/UI/NotificationProvider';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const contextValue = useContext(NotificationContext)

    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <>
            <Script src='https://upload-widget.cloudinary.com/global/all.js' strategy='beforeInteractive' />
            <NotificationProvider>
                {getLayout(<Component {...pageProps} />)}
            </NotificationProvider>
        </>
    )
}

export default withUrqlClient((_ssrExchange, ctx) => ({
    // url: 'https://bookswap-api-2-627cm.ondigitalocean.app/graphql',
    url: process.env.API_URL || '',
    fetchOptions: () => {
        const token = Cookies.get('token');
        return {
            headers: { authorization: token ? `Bearer ${token}` : '' },
        };
    },
}))(appWithTranslation(MyApp));
