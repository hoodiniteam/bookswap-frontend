
import React, { Dispatch, ReactElement, useContext } from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { localesList } from '../helpers/locales';
import { useQueryWrapper } from '../helpers/useQueryWrapper';
import { GetMe } from '../graphql/GetMe';
import {useNotification} from "../helpers/notificationHelper";


const Home = () => {
  const {successNotification} = useNotification();
  const { t } = useTranslation(localesList);
  const [{ data }] = useQueryWrapper({
    query: GetMe,
  });

  const open = () => {
    successNotification("Test");
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>{t('home')}</h1>
      <div className='flex justify-between items-center w-72 mt-5 px-5' />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Home;
