import React, { ReactElement } from 'react';
import { useMutation } from 'urql';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import { useQueryWrapper } from '../../../helpers/useQueryWrapper';
import Head from 'next/head';
import { GetEditionQuery } from '../../../graphql/GetEditionQuery';
import { GetMe } from '../../../graphql/GetMe';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../../helpers/locales';
import { getStaticEditions } from '../../../helpers/staticRequest';
import { EyeIcon } from '@heroicons/react/outline';
import { AddBookToMyWaitingListMutation } from '../../../graphql/AddBookToMyWaitingListMutation';
import { RemoveBookFromMyWaitingList } from '../../../graphql/RemoveBookFromMyWaitingList';
import { BooksStatus } from '../../../types/Book';
import { SetBookOpenMutaion } from '../../../graphql/SetBookOpenMutaion';
import { SetBookHoldMutaion } from '../../../graphql/SetBookHoldMutation';
import { Badge } from '../../../components/Badge';
import Button from '../../../components/UI/Button';
import { useNotification } from '../../../helpers/notificationHelper';
import Image from 'next/image';
import { AvatarComponent } from '../../../components/avatars';
import Tippy from '@tippyjs/react';
import { userName } from '../../../helpers/parseUserName';
import { CreateRoomMutation } from '../../../graphql/CreateRoomMutation';

const Book = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [{ data: editionData, fetching: fetchingEdition }] = useQueryWrapper({
    query: GetEditionQuery,
    variables: { id: pid },
    pause: !pid,
  });

  const [{ data: meData, fetching: fetchingMe }] = useQueryWrapper({
    query: GetMe,
  });

  const { t } = useTranslation('common');
  const { errorNotification, successNotification } = useNotification();
  const [, addToMyWaitingList] = useMutation(AddBookToMyWaitingListMutation);
  const [, removeFromMyWaitingList] = useMutation(RemoveBookFromMyWaitingList);
  const [, createRoom] = useMutation(CreateRoomMutation);
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

  const startSwap = async (bookId: string) => {
    await createRoom({
      bookId,
    }).then(res => {
      const {room, status} = res.data.createRoom;
      if (status === 'ERROR') {
        errorNotification(t('error-notification-msg'));
      }
      router.push(`/room/${room.id}`)
    });
  };

  const setBookOpen = async (id: string) => {
    await setBookOpenMutation({
      id,
    });
  };

  const setBookHold = async (id: string) => {
    await setBookHoldMutation({
      id,
    });
  };

  if (fetchingEdition || fetchingMe) return <p>Loading...</p>;
  if (!editionData) return null;

  const { edition } = editionData.getEdition;
  const { user } = meData.me;
  if (!edition) {
    return null;
  }

  const openBooks = edition.books.filter((book: any) => book.status === BooksStatus[BooksStatus.OPEN]);
  const isHolderOfAny = !!edition.books.find((book: any) => book.holder.id === user.id);
  const inMyWaitingList = user.waiting.find((myEdition: any) => myEdition.id === edition.id);

  return (
    <div>
      <Head>
        <title>{edition.title}</title>
      </Head>
      <h1 className='text-2xl text-center text-white font-semibold mb-10'>{edition.title}</h1>
      <div className='sm:grid gap-6 sm:grid-cols-6'>
        <div className='col-span-2 mt-4 sm:mt-0'>
          <div className='bg-white p-4 shadow sm:rounded-md border'>
            <div className='flex justify-center'>
              {
                edition.image && (
                  <div className='mb-4'>
                    <div className='bg-gray-100 rounded-md py-4 relative w-full h-60 sm:w-40 sm:h-40 lg:h-52'>
                      <div className='relative h-full w-full'>
                        {edition.image ? (<Image src={edition.image} layout='fill' alt={`${edition.title} poster`}
                                                 className='object-contain pointer-events-none group-hover:opacity-75' />) : (
                          <div className='h-full w-full bg-gray-100' />)}
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
            <p className='font-medium'>Подписчики</p>
            {
              edition.expects.length === 0 && (
                <div className='text-gray-500'>Пока нет подписчиков</div>
              )
            }
            <div className='grid grid-cols-4 mt-2'>
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
            !isHolderOfAny && (openBooks.length === 0 || edition.expects.length > 0) && (
              <div className='mt-2 relative'>
                {
                  inMyWaitingList && (
                    <Button
                      className='w-full'
                      variant='primaryOutline'
                      onClick={removeBookFromList}
                    >
                      {t('remove-from-waiting-list')}
                    </Button>
                  )
                }
                {
                  !inMyWaitingList && (
                    <>
                      <Button
                        className='w-full'
                        variant='primary'
                        onClick={addBookToList}
                      >
                        Подписаться
                      </Button>
                      <p className='text-gray-500 absolute transform translate-y-2 text-center text-xs top-full'>Чтобы
                        встать в очередь и узнать, когда книга станет доступна</p>
                    </>
                  )
                }
              </div>
            )
          }
        </div>
        <div className='col-span-4 bg-white relative shadow sm:rounded-md border p-6'>
          <div>
            {edition.authors && edition.authors.map((author: string, idx: number) => (
              <span key={author} className='text-gray-500 text-sm'>
                {author}{idx === edition.authors.length - 1 ? '' : ', '}
              </span>
            ))}
            <p className='absolute text-xs text-gray-400 flex items-center right-4 top-4'>
              <EyeIcon className='h-4 w-4 mr-1' />
              {edition.views}
            </p>
            <p className='mt-2.5 text-sm'>{edition.description}</p>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <div className='sm:grid gap-6 sm:grid-cols-6'>
          <div className='col-span-2'>
            <div>
              <p className='text-xl mb-4 font-medium'>Экземпляры книги</p>
              {
                edition.books.length === 0
                &&
                <div>
                  <p>Пока здесь нет доступных книг.</p>
                  <p>Подпишитесь на оповещения и тогда она быстрее появится на сервисе.</p>
                </div>
              }
            </div>
            <div>
              <ul role='list'>
                {
                  edition.books.map((book: any) => (
                    <li className='bg-white shadow mt-2 overflow-hidden sm:rounded-md' key={book.id}>
                      <div className='block hover:bg-gray-50'>
                        <div className='px-6 py-4 space-y-3'>
                          <div className='flex items-center border-b pb-2 justify-between'>
                            <p className='text-sm font-medium text-main-600 truncate'>
                              Держатель: {book.holder.id === user.id ? 'Вы' : userName(book.holder)}
                            </p>
                            <AvatarComponent
                              className='w-10'
                              avatarStyle='Circle'
                              {...book.holder.avatar}
                            />
                          </div>
                          <div className='flex items-center justify-between'>
                            <p className='flex items-center text-gray-500'>
                              Состояние:
                              <span className='ml-0.5 -mb-0.5'>{t(book.condition)}</span>
                            </p>
                            <Badge status={book.status} />
                          </div>
                          {
                            book.description && <div className='text-sm italic mt-2'>{book.description}</div>
                          }
                          {
                            !isHolderOfAny && book.status === BooksStatus[BooksStatus.OPEN] && edition.expects.length === 0 &&
                            <div>
                              <Button
                                className='w-full'
                                variant='primary'
                                onClick={() => startSwap(book.id)}
                              >
                                Начать своп
                              </Button>
                            </div>
                          }
                          {book.holder.id === user.id && (
                            <div>
                              {book.status === BooksStatus[BooksStatus.HOLD] && (
                                <Button variant='secondary' className='w-full' onClick={() => setBookOpen(book.id)}>Сделать
                                  доступной для заказа</Button>
                              )}
                              {book.status === BooksStatus[BooksStatus.OPEN] && (
                                <Button variant='secondaryOutline' className='w-full' onClick={() => setBookHold(book.id)}>Убрать
                                  из доступных</Button>
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
      </div>
    </div>
  );
};

Book.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const editions = await getStaticEditions();
  return {
    paths: editions.data.data.getEditionsStatic.map(editionId => `/book/${editionId}`),
    fallback: true,
  };
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Book;
