import React, { ReactElement } from 'react'
import { WithAuth } from '../components/withAuth'
import Layout from '../components/layout'
import Head from "next/head";
const Home = () => {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <h1>HomePage</h1>
            <div className='flex justify-between items-center w-72 mt-5 px-5' />
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <WithAuth>
            <Layout>
                {page}
            </Layout>
        </WithAuth>
    )
}
export default Home;