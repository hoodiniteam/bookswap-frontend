import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import React from 'react'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { appWithTranslation } from 'next-i18next';
import { withUrqlClient } from 'next-urql';
import Cookies from "js-cookie";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <>
            <Script src='https://upload-widget.cloudinary.com/global/all.js' strategy='beforeInteractive' />
            {getLayout(<Component {...pageProps} />)}
        </>
    )
}

export default withUrqlClient((_ssrExchange, ctx) => ({
    url: 'http://localhost:4000/graphql',
    fetchOptions: () => {
        const token = Cookies.get('token');
        return {
            headers: { authorization: token ? `Bearer ${token}` : '' },
        };
    },
}))(appWithTranslation(MyApp));
