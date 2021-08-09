import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider} from 'urql'
import {client} from "../src/UrqlClient";
import Script from "next/script";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout || ((page: any) => page)

  return getLayout(
    <Provider value={client}>
      <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="beforeInteractive"/>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
