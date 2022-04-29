import React, { ReactElement } from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { localesList } from '../helpers/locales';
import { useQueryWrapper } from '../helpers/useQueryWrapper';
import { GetEditionsQuery } from '../graphql/GetEditionsQuery';
import BookWrapper from '../components/BookWrapper';

const Home = () => {

  const [{data}] = useQueryWrapper({
    query: GetEditionsQuery,
    variables: {
      offset: 0,
      limit: 5,
      status: status ? Array.from(status) : null,
      hasBooks: true,
      recent: true,
    }
  })

  const [{data: popularData}] = useQueryWrapper({
    query: GetEditionsQuery,
    variables: {
      offset: 0,
      limit: 5,
      status: status ? Array.from(status) : null,
      hasBooks: true,
      popular: true,
    }
  })

  const editions = data?.getEditions?.editions || [];
  const popularEditions = popularData?.getEditions?.editions || [];

  const { t } = useTranslation(localesList);
  const stats = [
    { name: 'Забрать', stat: '0' },
    { name: 'Отдать', stat: '0' },
  ]
  return (
    <>
      <Head>
        <title>Главная</title>
      </Head>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <h3 className="text-xl leading-6 font-medium sm:text-white text-gray-900">Активные свопы</h3>
          <dl className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {stats.map((item) => (
              <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className="text-xl leading-6 font-medium sm:text-white text-gray-900">Подписки</h3>
          <dl className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {stats.map((item) => (
              <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="pt-6">
        <div className="text-xl font-medium">Недавно добавленные</div>
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-5 mt-4">
          {editions.map((edition: any) => (
            <BookWrapper size="small" key={edition.id} book={edition}/>
          ))}
        </ul>
      </div>
      <div className="pt-6">
        <div className="text-xl font-medium">Популярные</div>
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-5 mt-4">
          {popularEditions.map((edition: any) => (
            <BookWrapper size="small" key={edition.id} book={edition}/>
          ))}
        </ul>
      </div>
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
