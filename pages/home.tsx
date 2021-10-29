import React, {ReactElement} from 'react'
import Layout from '../components/layout'
import Head from 'next/head'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {useTranslation} from 'next-i18next'
import {localesList} from '../helpers/locales'
import Button from '../components/UI/Button';

const Home = () => {
    const {t} = useTranslation(localesList)

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <h1>{t('home')}</h1>
            <Button variant='primary'>Something</Button>
            <div className="flex justify-between items-center w-72 mt-5 px-5"/>
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>{page}</Layout>
    )
}

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, localesList)),
    },
})

export default Home
