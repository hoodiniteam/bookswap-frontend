import React, { ReactElement } from 'react';
import Layout from '../../components/layout';
import BookWrapper from '../../components/BookWrapper';
import { useQueryWrapper } from '../../helpers/useQueryWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../helpers/locales';
import Button from '../../components/Button';
import { useMutation } from 'urql';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { loader } from 'graphql.macro';
import {
  BooksStatus,
  GetMeQuery,
  RemoveFromMyWaitingListMutation,
  RemoveFromMyWaitingListMutationVariables,
} from '../../generated/graphql.d';
import { BookOpenIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { toast } from 'react-toastify';

const GetMe = loader('../../graphql/GetMe.graphql');
const RemoveBookFromMyWaitingList = loader(
  '../../graphql/RemoveFromMyWaitingListMutation.graphql'
);

const Waiting = () => {
  const [, removeFromMyWaitingList] = useMutation<
    RemoveFromMyWaitingListMutation,
    RemoveFromMyWaitingListMutationVariables
  >(RemoveBookFromMyWaitingList);
  const { t } = useTranslation('common');

  const [{ data }] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
  });

  const removeBookFromList = async (editionId: string) => {
    const userId = data?.me?.user?.id;
    if (userId) {
      await removeFromMyWaitingList({
        editionId,
        userId,
      });
      toast('❌ Книга удалена из подписок!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const books = data?.me?.user?.waiting;

  const OpenedBooksCounter = ({ length }: { length: number }) => {
    const openedBookClass =
      length > 0 ? 'text-green-500 ml-1' : 'text-red-500 ml-1';
    return <span className={openedBookClass}>({length})</span>;
  };

  if (books) {
    return (
      <>
        <Head>
          <title>Избранное</title>
        </Head>
        <p className="sm:text-white font-bold text-lg mb-3">Избранное</p>
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 space-y-4 divide-y">
          {books.length === 0 && <div>Пока нет подписок.</div>}
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-5">
            {books.map((book) => {
              const openedBooksLength =
                book.edition.books.filter(
                  (book: any) => book.status === BooksStatus.Open
                ).length || 0;
              return (
                <div className="relative" key={book.edition.id}>
                  <BookWrapper book={book.edition} />
                  <Button
                    className="w-full mt-2"
                    variant="primaryOutline"
                    onClick={async () => {
                      await removeBookFromList(book.edition.id);
                    }}
                  >
                    {t('remove-from-waiting-list')}
                  </Button>
                  {book.edition && !!openedBooksLength && (
                    <Link href={`/book/${book.edition.id}`}>
                      <Button className="w-full mt-2">Перейти к книге</Button>
                    </Link>
                  )}
                  <div className="bg-white rounded-md shadow flex items-center p-2 absolute right-1 top-1">
                    <BookOpenIcon className="h-5 w-5 mr-2" />
                    {book.edition.books.length}
                    <OpenedBooksCounter length={openedBooksLength} />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
  return null;
};

Waiting.getLayout = function getLayout(page: ReactElement) {
  return <Layout title={Waiting.name}>{page}</Layout>;
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Waiting;
