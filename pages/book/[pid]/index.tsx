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
import { EyeIcon } from '@heroicons/react/outline';
import {AddBookToMyWaitingListMutation} from "../../../graphql/AddBookToMyWaitingListMutation";
import {RemoveBookFromMyWaitingList} from "../../../graphql/RemoveBookFromMyWaitingList";
import {BooksStatus} from "../../../types/Book";
import {CreateMySwapMutation} from "../../../graphql/CreateMySwapMutation";
import {SetBookOpenMutaion} from "../../../graphql/SetBookOpenMutaion";
import {SetBookHoldMutaion} from "../../../graphql/SetBookHoldMutation";
import {Badge} from "../../../components/Badge";
import Button from '../../../components/UI/Button';
import {useNotification} from '../../../helpers/notificationHelper';
import Image from 'next/image';
import { AvatarComponent } from '../../../components/avatars';
import Tippy from '@tippyjs/react';
import { userName } from '../../../helpers/parseUserName';

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
      const {status} = res.data.createMySwap
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
  const isHolderOfAny = !!edition.books.find((book: any) => book.holder.id === user.id);
  const inMyWaitingList = user.waiting.find((myEdition: any) => myEdition.id === edition.id);

  return (
    <div className="space-y-5">
      <Head>
        <title>{edition.title}</title>
      </Head>
      <div className='grid gap-6 grid-cols-5'>
        <div className="flex bg-white col-span-4 relative shadow font-serif sm:rounded-md border p-6">
          {
            edition.image && (
                <div className='mr-6'>
                  <div className='bg-gray-100 rounded-md py-4 relative w-40 h-40 lg:h-52'>
                    <div className="relative h-full w-full">
                      {edition.image ? (<Image src={edition.image} layout="fill" alt={`${edition.title} poster`} className='object-contain pointer-events-none group-hover:opacity-75' />) : (<div className="h-full w-full bg-gray-100"/>)}
                    </div>
                  </div>
                </div>
            )
          }
          <div>
            <h1 className='text-2xl font-semibold'>{edition.title}</h1>
            {edition.authors && edition.authors.map((author: string, idx: number) => (
                <span key={author} className='text-gray-500 text-sm'>{author}{idx === edition.authors.length - 1 ? '' : ', '}</span>
            ))}
            <p className="absolute text-xs text-gray-400 flex items-center right-4 top-4">
              <EyeIcon className="h-4 w-4 mr-1" />
              {edition.views}
            </p>
            <p className="mt-2.5 text-sm">{edition.description}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="bg-white flex-grow p-4 shadow sm:rounded-md border">
            <p className="font-medium">Подписчики</p>
            {
              edition.expects.length === 0 && (
                  <div className="text-gray-500">Пока нет подписчиков</div>
              )
            }
            <div className="grid grid-cols-4 mt-2">
              {
                edition.expects.map((user: any) => (
                  <div key={user.id}>
                    <Tippy content={`${userName(user)}`}>
                      <div>
                        <AvatarComponent
                            avatarStyle='Circle'
                            {...user.avatar}
                        />
                      </div>
                    </Tippy>
                  </div>
                ))
              }
            </div>
          </div>
            {
              !isHolderOfAny && openBooks.length === 0 && (
                <div className="mt-2">
                  {
                    inMyWaitingList && (
                        <Button
                            className="w-full"
                            variant='primary'
                            onClick={removeBookFromList}
                        >
                          {t('remove-from-waiting-list')}
                        </Button>
                    )
                  }
                  {
                    !inMyWaitingList && (
                        <Button
                            className="w-full"
                            variant='primary'
                            onClick={addBookToList}
                        >
                          {t('add-to-my-waiting-list')}
                        </Button>
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
                <p>Подпишитесь на книгу и тогда она быстрее появится на сервисе.</p>
            </div>
          }
        </div>
        <div>
          <ul role="list" className="grid grid-cols-3 divide-y divide-gray-200">
            {
              edition.books.map((book: any) => (
                <li className="bg-white shadow mt-2 overflow-hidden sm:rounded-md" key={book.id}>
                  <div className="block hover:bg-gray-50">
                    <div className="px-6 py-4 space-y-3">
                      <div className="flex items-center pt-2 justify-between">
                        <p className="flex items-center text-gray-500">
                          Состояние:
                          <span className="ml-0.5 -mb-0.5">{t(book.condition)}</span>
                        </p>
                        <Badge status={book.status}/>
                      </div>
                      {
                        book.description && <div className="text-sm italic mt-2">{book.description}</div>
                      }
                      <div className="flex items-center border-t pt-1 justify-between">
                        <p className="text-sm font-medium text-main-600 truncate">
                          Держатель: {book.holder.id === user.id ? 'Вы' : book.holder.email}
                        </p>
                        <AvatarComponent
                            className="w-10"
                            avatarStyle='Circle'
                            {...book.holder.avatar}
                        />
                      </div>
                      {
                        !isHolderOfAny && book.status === BooksStatus[BooksStatus.OPEN] && <div>
                          <Button
                            className="w-full"
                            variant='primary'
                            onClick={startSwap}
                          >
                            {t('start-swap')}
                          </Button>
                        </div>
                      }
                      {book.holder.id === user.id && (
                          <div>
                            {book.status === BooksStatus[BooksStatus.HOLD] && (
                              <Button variant="secondary" className="w-full" onClick={() => setBookOpen(book.id)}>Сделать доступной для заказа</Button>
                              )}
                            {book.status === BooksStatus[BooksStatus.OPEN] && (
                                <Button variant="secondaryOutline" className="w-full" onClick={() => setBookHold(book.id)}>Убрать из доступных</Button>
                            )}
                          </div>
                      )}
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
