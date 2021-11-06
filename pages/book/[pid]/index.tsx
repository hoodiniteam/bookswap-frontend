import React, { ReactElement } from 'react';
import {useMutation} from 'urql'
import {useRouter} from 'next/router'
import Layout from '../../../components/layout'
import {useQueryWrapper} from "../../../helpers/useQueryWrapper"
import Head from 'next/head'
import {GetEditionQuery} from '../../../graphql/GetEditionQuery'
import {GetMe} from '../../../graphql/GetMe'
import {useTranslation} from 'react-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {localesList} from '../../../helpers/locales'
import {getStaticEditions} from '../../../helpers/staticRequest'
import {ClipboardListIcon} from '@heroicons/react/outline';
import {AddBookToMyWaitingListMutation} from "../../../graphql/AddBookToMyWaitingListMutation";
import {RemoveBookFromMyWaitingList} from "../../../graphql/RemoveBookFromMyWaitingList";
import {BooksStatus} from "../../../types/Book";
import {CreateMySwapMutation} from "../../../graphql/CreateMySwapMutation";
import {SetBookOpenMutaion} from "../../../graphql/SetBookOpenMutaion";
import {SetBookHoldMutaion} from "../../../graphql/SetBookHoldMutation";
import {Badge} from "../../../components/Badge";
import Button from '../../../components/UI/Button';
import {useNotification} from '../../../helpers/notificationHelper';

const Book = () => {
  const router = useRouter()
  const {pid} = router.query;

  const [{data: editionData, fetching: fetchingEdition}] = useQueryWrapper({
    query: GetEditionQuery,
    variables: {id: pid},
    pause: !pid,
  })

  const [{data: meData, fetching: fetchingMe}] = useQueryWrapper({
    query: GetMe,
  });

  const {t} = useTranslation('common');
  const {errorNotification, successNotification} = useNotification()
  const [, addToMyWaitingList] = useMutation(AddBookToMyWaitingListMutation);
  const [, removeFromMyWaitingList] = useMutation(RemoveBookFromMyWaitingList);
  const [, createSwap] = useMutation(CreateMySwapMutation);
  const [, setBookOpenMutation] = useMutation(SetBookOpenMutaion);
  const [, setBookHoldMutation] = useMutation(SetBookHoldMutaion);

  const addBookToList = async () => {
    await addToMyWaitingList({
      id: pid,
    });
  };

  const removeBookFromList = async () => {
    await removeFromMyWaitingList({
      id: pid,
    });
  };

  const startSwap = async () => {
    await createSwap({
      editionId: pid,
    }).then(res => {
      const {status} = res.data.createSwap
      if(status === 'ERROR') {
        errorNotification(t('error-notification-msg'))
      }
      if(status === 'SUCCESS') {
        successNotification(t('success-notification-msg'))
      }
    })
  }

  const setBookOpen = async (id: string) => {
    await setBookOpenMutation({
      id,
    });
  }

  const setBookHold = async (id: string) => {
    await setBookHoldMutation({
      id,
    });
  }

  if (fetchingEdition || fetchingMe) return <p>Loading...</p>

  const {edition} = editionData.getEdition;
  const {user} = meData.me;
  if (!edition) {
    return null;
  }

  const openBooks = edition.books.filter((book: any) => book.status === BooksStatus[BooksStatus.OPEN]);
  const isOwnerOfAny = !!edition.books.find((book: any) => book.holder.id === user.id);

  return (
    <div className="space-y-5">
      <Head>
        <title>{edition.title}</title>
      </Head>
      <div className='grid gap-6 grid-cols-5 grid-rows-1 border p-10'>
        <div className='col-span-1'>
          <img src={edition.image} alt={edition.title}/>
        </div>
        <div className='col-span-5'>
          <h1 className='text-2xl'>{edition.title}</h1>
          <p>{edition.views}</p>
          <p className="mt-2 text-sm">{edition.description}</p>
          {/* <h2 className='text-center mt-8'>Creator: {book.creator.email}</h2> */}
        </div>
        <div className="col-span-6">
          {
            !isOwnerOfAny && (
              <div className="flex justify-center">
                {
                  openBooks.length > 0 && <Button
                      variant='primary'
                      onClick={startSwap}
                  >
                    {t('start-swap')}
                  </Button>
                }
                {
                  openBooks === 0 && (
                    <>
                      <Button
                        variant='primary'
                        onClick={removeBookFromList}
                      >
                        {t('remove-from-waiting-list')}
                      </Button>
                      <Button
                        variant='primary'
                        onClick={addBookToList}
                      >
                        {t('add-to-my-waiting-list')}
                      </Button>
                    </>
                  )
                }

              </div>
            )
          }
        </div>
      </div>
      <div>
        <div className="px-4">
          <p className="text-lg font-medium">Книги</p>
          {
            edition.books.length === 0
            &&
            <div>
                <p>Пока здесь нет доступных книг.</p>
                <p>Добавьтесь в список ожидания и тогда книга быстрее появится на сервисе.</p>
            </div>
          }
        </div>
        <div className="bg-white shadow mt-2 overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {
              edition.books.map((book: any) => (
                <li key={book.id}>
                  <div className="block hover:bg-gray-50">
                    <div className="px-6 py-4">
                      <div className="flex items-center pt-2 justify-between">
                        <div className="flex-shrink-0 flex items-center">
                          <Badge status={book.status}/>
                          <p className="flex items-center text-gray-500">
                            <ClipboardListIcon className="w-6 h-6"/>
                            <span className="ml-0.5 -mb-0.5">{t(book.condition)}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-main-600 truncate">
                            Держатель: {book.holder.id === user.id ? 'Вы' : book.holder.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between border-t mt-2 pt-2">
                        {
                          book.description && <div className="text-sm italic mt-2">{book.description}</div>
                        }
                        <div>
                          {book.holder.id === user.id && (
                            <>
                              {book.status === BooksStatus[BooksStatus.HOLD] && (
                                <button
                                  type='button'
                                  className='inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500'
                                  onClick={() => setBookOpen(book.id)}
                                >Сделать доступной для заказа</button>
                              )}
                              {book.status === BooksStatus[BooksStatus.OPEN] && (
                                <button
                                  type='button'
                                  className='inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500'
                                  onClick={() => setBookHold(book.id)}
                                >Убрать из доступных</button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

Book.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const editions = await getStaticEditions();
  return {
    paths: editions.data.data.getEditionsStatic.map(editionId => `/book/${editionId}`),
    fallback: true,
  }
}

export const getStaticProps = async ({locale}: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Book;
