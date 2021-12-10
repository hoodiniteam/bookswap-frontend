import React, {ReactElement, useEffect, useState} from "react";
import Layout from "../../components/layout";
import BookWrapper from "../../components/book-wrapper";
import { Book } from '../../types/Book';
import { GetMe } from '../../graphql/GetMe'
import {useQueryWrapper} from "../../helpers/useQueryWrapper";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import { localesList } from "../../helpers/locales";
import Button from '../../components/UI/Button';
import { useMutation } from 'urql';
import { RemoveBookFromMyWaitingList } from '../../graphql/RemoveBookFromMyWaitingList';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';

const Waiting = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [, removeFromMyWaitingList] = useMutation(RemoveBookFromMyWaitingList);
  const {t} = useTranslation('common');

  const [{data}] = useQueryWrapper({
    query: GetMe,
  })

  const removeBookFromList = async (id: string) => {
    await removeFromMyWaitingList({
      id,
    });
  };

  useEffect(()=> {
    if(data) {
      setBooks(data?.me.user.waiting)
    }
  }, [data])

  if(books){
    const activeTradesDict = new Set<string>([]);
    data?.me.user.trades?.filter((trade: any) => (trade.status === "NOTIFIED" || trade.status === "LASTNOTIFICATION")).forEach((activeTrade: any) => {
      activeTradesDict.add(activeTrade.book.edition.id);
    })
    return(
      <>
        <Head>
          <title>
            Подписки
          </title>
        </Head>
        <p className="font-serif sm:text-white font-bold text-lg mb-3">Подписки</p>
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 space-y-4 divide-y">
          {
            books.length === 0 && <div>Пока нет подписок.</div>
          }
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-5">
            {books.map((book) => (
              <div key={book.id}>
                <BookWrapper book={book}/>
                <Button
                  className="w-full mt-2"
                  variant='primaryOutline'
                  onClick={() => {removeBookFromList(book.id)}}
                >
                  {t('remove-from-waiting-list')}
                </Button>
                {
                  activeTradesDict.has(book.id) && <Button className="w-full mt-2">Начать Своп</Button>
                }
              </div>
            ))}
          </ul>
        </div>
      </>
    )
  }
  return null;
}

Waiting.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout title={Waiting.name}>
        {page}
      </Layout>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, localesList),
  },
})

export default Waiting
