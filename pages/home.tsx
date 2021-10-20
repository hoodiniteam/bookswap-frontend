import React, { ReactElement } from 'react'
import { WithAuth } from '../components/withAuth'
import Layout from '../components/layout'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { localesList } from '../helpers/locales'

const Home = () => {
    const { t } = useTranslation(localesList)
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <h1>{t('home')}</h1>
            <div className="flex justify-between items-center w-72 mt-5 px-5" />
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <WithAuth>
            <Layout>{page}</Layout>
        </WithAuth>
    )
}

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, localesList)),
    },
})

export default Home
