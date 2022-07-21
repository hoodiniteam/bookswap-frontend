import React, { ReactElement } from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../helpers/locales';
import { useQueryWrapper } from '../helpers/useQueryWrapper';
import BookWrapper from '../components/BookWrapper';
import { BooksStatus, GetEditionsQuery, GetMeQuery } from '../generated/graphql.d';
import { loader } from 'graphql.macro';
import Link from 'next/link';
import {
  activeSwapsReceive,
  activeSwapsSend,
} from '../helpers/parseActiveSwaps';
import { ChatIcon, HeartIcon } from '@heroicons/react/outline';
const GetMe = loader('../graphql/GetMe.graphql');
const GetEditions = loader('../graphql/GetEditionsQuery.graphql');

const Home = () => {
  const [{ data: meData }] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
  });

  const [{ data }] = useQueryWrapper<GetEditionsQuery>({
    query: GetEditions,
    variables: {
      offset: 0,
      limit: 10,
      status: status ? Array.from(status) : null,
      hasBooks: true,
      recent: true,
    },
  });

  const [{ data: popularData }] = useQueryWrapper<GetEditionsQuery>({
    query: GetEditions,
    variables: {
      offset: 0,
      limit: 10,
      status: status ? Array.from(status) : null,
      hasBooks: true,
      popular: true,
    },
  });

  const { user } = meData?.me || {};
  const editions = data?.getEditions?.editions || [];
  const popularEditions = popularData?.getEditions?.editions || [];

  // const { t } = useTranslation(localesList);

  const stats = [
    {
      name: 'Получить книгу',
      stat: activeSwapsReceive(user || { chatRecipient: [] }).length || 0,
    },
    {
      name: 'Отдать книгу',
      stat: activeSwapsSend(user || { chatSender: [] }).length || 0,
    },
  ];
  return (
    <>
      <Head>
        <title>Главная</title>
      </Head>
      <div className="sm:grid space-y-6 sm:space-y-0 grid-cols-2 gap-5">
        <div>
          <h3 className="flex items-center text-xl leading-6 font-medium sm:text-white text-gray-900">
             <ChatIcon className="h-8 w-8 mr-2" /> Активные свопы
          </h3>
          <dl className="mt-4 grid gap-5 grid-cols-2">
            {stats.map((item) => (
              <Link href="/profile/swaps" key={item.name}>
                <a className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {item.stat}
                  </dd>
                </a>
              </Link>
            ))}
          </dl>
        </div>
      </div>

      <div className="sm:grid mt-6 space-y-6 sm:space-y-0 grid-cols-2 gap-5">
        <div>
          <h3 className="flex items-center text-xl leading-6 font-medium text-gray-900">
            <HeartIcon className="h-8 w-8 mr-2" /> Избранное
          </h3>
          <dl className="mt-4 grid gap-5 grid-cols-2">
            <Link href="/profile/waiting">
              <a className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Доступны для заказа
                </dt>
                {
                  user && <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {user.waiting.reduce((acc, sub) => {
                      const openedBooks = sub.edition.books.filter(
                        (book: any) => book.status === BooksStatus.Open
                      ).length || 0;
                      return acc + openedBooks;
                    }, 0)}
                  </dd>
                }
              </a>
            </Link>
          </dl>
        </div>
      </div>
      <div className="pt-8">
        <div className="text-xl font-medium">Недавно добавленные</div>
        <ul className="-mx-4 sm:mx-auto flex gap-2 snap-x scroll-pl-10 overflow-x-auto py-6">
          {editions.map((edition: any) => (
            <BookWrapper
              className="snap-start"
              size="small"
              key={edition.id}
              book={edition}
            />
          ))}
        </ul>
      </div>
      <div className="pt-8">
        <div className="text-xl font-medium">Популярные</div>
        <ul className="-mx-4 sm:mx-auto flex gap-2 snap-x scroll-pl-10 overflow-x-auto py-6">
          {popularEditions.map((edition: any) => (
            <BookWrapper
              className="snap-start"
              size="small"
              key={edition.id}
              book={edition}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Home;
