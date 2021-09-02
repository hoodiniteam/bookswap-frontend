import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'urql'
import { client } from '../src/UrqlClient'
import Script from 'next/script'
import React from 'react'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <Provider value={client}>
            <Script src='https://upload-widget.cloudinary.com/global/all.js' strategy='beforeInteractive' />
            {getLayout(<Component {...pageProps} />)}
        </Provider>
    )
}