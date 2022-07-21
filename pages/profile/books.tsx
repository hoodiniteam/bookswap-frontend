import React, { ReactElement } from 'react';
import Layout from '../../components/layout';
import BookWrapper from '../../components/BookWrapper';
import { useQueryWrapper } from '../../helpers/useQueryWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../helpers/locales';
import { Badge } from '../../components/Badge';
import Button from '../../components/Button';
import { useMutation } from 'urql';
import Head from 'next/head';
import { loader } from 'graphql.macro';
import {
  BooksStatus,
  GetMeQuery,
  UpdateBookStatusMutation,
  UpdateBookStatusMutationVariables,
} from '../../generated/graphql.d';

const GetMe = loader('../../graphql/GetMe.graphql');
const UpdateBookStatus = loader(
  '../../graphql/UpdateBookStatusMutation.graphql'
);

const MyBooks = () => {
  const [{ data }] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
  });

  const [, updateBookStatus] = useMutation<
    UpdateBookStatusMutation,
    UpdateBookStatusMutationVariables
  >(UpdateBookStatus);

  const setBookOpen = async (id: string) => {
    await updateBookStatus({
      bookId: id,
      status: BooksStatus.Open,
    });
  };

  const setBookHold = async (id: string) => {
    await updateBookStatus({
      bookId: id,
      status: BooksStatus.Hold,
    });
  };

  if (data && data.me && data.me.user) {
    const user = data.me.user;
    const myBooks = user.books || [];
    return (
      <>
        <Head>
          <title>Мои книги</title>
        </Head>
        <p className="sm:text-white font-bold text-lg mb-3">
          Мои книги
        </p>
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 space-y-4 divide-y">
          <div>
            <div className="flex font-medium items-center">
              <div className="text-2xl">Баланс:</div>
              <div className="ml-2 flex items-center text-lg">
                <img className="w-8" src="/images/origami-c.png" />
                {user.points} BST (Bookswap Token)
              </div>
            </div>
          </div>
          <div className="pt-4">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-5">
              {myBooks.map((book) => (
                <div key={book.id} className="relative flex flex-col">
                  <div className="flex-grow">
                    <BookWrapper book={book} />
                    <Badge
                      className="absolute right-2 top-2"
                      status={book.status}
                    />
                  </div>
                  <div className="mt-2">
                    {book.status === BooksStatus.Hold && (
                      <Button
                        variant="secondary"
                        className="w-full"
                        onClick={() => setBookOpen(book.id)}
                      >
                        Сделать доступной
                      </Button>
                    )}
                    {book.status === BooksStatus.Open && (
                      <Button
                        variant="secondaryOutline"
                        className="w-full"
                        onClick={() => setBookHold(book.id)}
                      >
                        Убрать из доступных
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
  return null;
};

MyBooks.getLayout = function getLayout(page: ReactElement) {
  return <Layout title={MyBooks.name}>{page}</Layout>;
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default MyBooks;
