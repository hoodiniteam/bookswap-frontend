import React, { ReactElement } from 'react';
import { useMutation } from 'urql';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import { useQueryWrapper } from '../../../helpers/useQueryWrapper';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../../helpers/locales';
import { getStaticEditions } from '../../../helpers/staticRequest';
import { Badge } from '../../../components/Badge';
import Button from '../../../components/Button';
import { AvatarComponent } from '../../../components/avatars';
import Tippy from '@tippyjs/react';
import { userName } from '../../../helpers/parseUserName';
import { loader } from 'graphql.macro';
import {
  AddToMyWaitingListMutation,
  AddToMyWaitingListMutationVariables,
  BooksStatus,
  CreateChatMutation,
  CreateChatMutationVariables,
  GetEditionQuery,
  GetMeQuery,
  RemoveFromMyWaitingListMutation,
  RemoveFromMyWaitingListMutationVariables,
  UpdateBookStatusMutation,
  UpdateBookStatusMutationVariables,
} from '../../../generated/graphql.d';
import BookBigWrapper from '../../../components/BookBigWrapper';
import classNames from 'classnames';
import { toast } from 'react-toastify';
const GetMe = loader('../../../graphql/GetMe.graphql');
const CreateChat = loader('../../../graphql/CreateChatMutation.graphql');
const GetEdition = loader('../../../graphql/GetEdition.graphql');
const UpdateBookStatus = loader(
  '../../../graphql/UpdateBookStatusMutation.graphql'
);
const AddToMyWaitingList = loader(
  '../../../graphql/AddToMyWaitingListMutation.graphql'
);
const RemoveFromMyWaitingList = loader(
  '../../../graphql/RemoveFromMyWaitingListMutation.graphql'
);

const Book = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [{ data: editionData }, reexecuteEditionQuery] =
    useQueryWrapper<GetEditionQuery>({
      query: GetEdition,
      variables: { id: pid },
      pause: !pid,
    });

  const [{ data: meData }] = useQueryWrapper<GetMeQuery>({
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

  const { t } = useTranslation('common');
  const [, createChat] = useMutation<
    CreateChatMutation,
    CreateChatMutationVariables
  >(CreateChat);

  const [, addToMyWaitingList] = useMutation<
    AddToMyWaitingListMutation,
    AddToMyWaitingListMutationVariables
  >(AddToMyWaitingList);

  const [, removeFromMyWaitingList] = useMutation<
    RemoveFromMyWaitingListMutation,
    RemoveFromMyWaitingListMutationVariables
  >(RemoveFromMyWaitingList);

  const addBookToList = async () => {
    if (typeof pid === 'string') {
      await addToMyWaitingList({
        editionId: pid,
      });
      await reexecuteEditionQuery();
      toast('⏰ Книга добавлена в подписки!', {
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

  const removeBookFromList = async () => {
    if (typeof pid === 'string' && meData?.me?.user?.id) {
      await removeFromMyWaitingList({
        userId: meData?.me?.user?.id,
        editionId: pid,
      });
      await reexecuteEditionQuery();
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

  const startSwap = async (bookId: string) => {
    await createChat({
      bookId,
    }).then((res) => {
      const { chat } = res.data?.createChat || {};
      if (chat) {
        router.push(`/profile/swaps/${chat.id}`);
      }
    });
  };

  const { user } = meData?.me || {};
  const { edition } = editionData?.getEdition || {};

  const openBooks = edition?.books.filter(
    (book: any) => book.status === BooksStatus.Open
  );
  const isHolderOfAny = !!edition?.books.find(
    (book: any) => book.holder.id === user?.id
  );
  const inMyWaitingList = user?.waiting?.find(
    ({ edition: myEdition }) => myEdition.id === edition?.id
  );

  return (
    <div>
      <Head>
        <title>{edition?.title}</title>
      </Head>
      <h1 className="text-2xl text-center text-white font-semibold my-8">
        {edition?.title}
      </h1>
      <div className="sm:flex">
        <div className="">
          <div className="bg-white p-4 shadow sm:rounded-md border">
            {edition && <BookBigWrapper book={edition} />}
          </div>
        </div>

        <div className="bg-white sm:ml-6 flex-grow relative shadow rounded-md border p-6">
          <div>
            <div>
              <p className="text-xl mb-4 font-medium">Экземпляры книги</p>
              {edition?.books.length === 0 && (
                <div>
                  <p>Пока здесь нет доступных книг.</p>
                  <p>
                    Подпишитесь на оповещения и тогда она быстрее появится на
                    сервисе.
                  </p>
                </div>
              )}
            </div>
            <div>
              <ul className="grid grid-cols-1 xl:grid-cols-2 gap-6" role="list">
                {(edition?.books || []).map((book: any) => (
                  <li
                    className={classNames(
                      book.holder.id === user?.id ? 'bg-sky-50' : 'bg-lime-50',
                      'shadow mt-2 overflow-hidden sm:rounded-md transition duration-300 hover:bg-gray-50'
                    )}
                    key={book.id}
                  >
                    <div className="block">
                      <div className="px-6 py-4 space-y-3">
                        <div className="flex items-center border-b pb-2 justify-between">
                          <p className="text-sm font-medium text-main-600 truncate">
                            Держатель:{' '}
                            {book.holder.id === user?.id
                              ? 'Вы'
                              : userName(book.holder)}
                          </p>
                          <AvatarComponent
                            className="w-10"
                            avatarStyle="Circle"
                            {...book.holder.avatar}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="flex text-sm items-center text-gray-500">
                            Состояние:
                            <span className="ml-0.5 -mb-0.5">
                              {t(book.condition)}
                            </span>
                          </p>
                          <Badge status={book.status} />
                        </div>
                        {book.description && (
                          <div className="text-sm italic mt-2">
                            {book.description}
                          </div>
                        )}
                        {!isHolderOfAny && book.status === BooksStatus.Open && (
                          <div>
                            <Button
                              className="w-full"
                              variant="primary"
                              onClick={() => startSwap(book.id)}
                            >
                              Начать своп
                            </Button>
                          </div>
                        )}
                        {book.holder.id === user?.id && (
                          <div>
                            {book.status === BooksStatus.Hold && (
                              <Button
                                variant="secondary"
                                className="w-full"
                                onClick={() => setBookOpen(book.id)}
                              >
                                Сделать доступной для заказа
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
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white divide-y space-y-4 mt-8 relative shadow rounded-md border p-6">
        <div>
          <p className="font-medium">Подписчики</p>
          {edition?.expects?.length === 0 && (
            <div className="text-gray-500">Пока нет подписчиков</div>
          )}
          <div className="grid grid-cols-4 mt-2">
            {(edition?.expects || []).map(({ user }) => (
              <div key={user.id}>
                <Tippy content={`${userName(user)}`}>
                  <div>
                    <AvatarComponent avatarStyle="Circle" {...user.avatar} />
                  </div>
                </Tippy>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-4">
          <div className=" max-w-sm mx-auto">
            {!isHolderOfAny &&
              (openBooks?.length === 0 ||
                (edition?.expects && edition.expects.length > 0)) && (
                <div className="mt-2 relative">
                  {inMyWaitingList && (
                    <Button
                      className="w-full"
                      variant="primaryOutline"
                      onClick={removeBookFromList}
                    >
                      {t('remove-from-waiting-list')}
                    </Button>
                  )}
                  {!inMyWaitingList && (
                    <>
                      <Button
                        className="w-full"
                        variant="primary"
                        onClick={addBookToList}
                      >
                        Подписаться
                      </Button>
                      <p className="text-gray-500 mt-2 text-center text-xs top-full">
                        Чтобы встать в очередь и узнать, когда книга станет
                        доступна
                      </p>
                    </>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

Book.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths = async () => {
  const editions = await getStaticEditions();
  return {
    paths: editions.data.data.getEditionsStatic.map(
      (editionId) => `/book/${editionId}`
    ),
    fallback: true,
  };
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Book;
