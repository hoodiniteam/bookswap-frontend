import React, { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, Transition, Popover, Dialog } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import {
  BookmarkIcon,
  BookOpenIcon,
  ChevronUpIcon,
  PlusCircleIcon,
  RefreshIcon,
  SupportIcon,
  BellIcon, MenuIcon, PlusIcon, PlusSmIcon, ChatIcon, HeartIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useClient, useMutation } from 'urql';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { Logo } from './Logo';
import { useQueryWrapper } from '../helpers/useQueryWrapper';
import { AvatarComponent } from './avatars';
import { userName } from '../helpers/parseUserName';
import { usePopper } from 'react-popper';
import Button from './Button';
import { AddBookModal } from './AddBookModal';
import { CreateBookModal } from './CreateBookModal';
import { loader } from 'graphql.macro';
import {
  BooksStatus,
  ClearNotificationsMutation,
  GetMeQuery,
  SwapStatus,
} from '../generated/graphql.d';
import { UserNotification } from './UserNotification';
import OutsideClickHandler from 'react-outside-click-handler';
import classNames from 'classnames';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BookSearch } from './BookSearch';
import { Loading } from './loading';
import {
  activeSwapsReceive,
  activeSwapsSend,
} from '../helpers/parseActiveSwaps';

const GetMe = loader('../graphql/GetMe.graphql');
const ClearNotifications = loader(
  '../graphql/ClearNotificationsMutation.graphql'
);

const Layout = ({ children, title, showBookHead = false }: any) => {
  const router = useRouter();
  const [navMenu, setNavMenu] = useState(false);
  const [navMenuMobile, setNavMenuMobile] = useState(false);
  const [notificationsMobile, setNotificationsMobile] = useState(false);
  const [, setSearchString] = useState('');
  const [addModal, setAddModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [, setBooks] = useState<any[]>([]);
  const [newBookName, setNewBookName] = useState('');

  const [navigation, setNavigation] = useState([
    {
      title: 'Популярные',
      href: '/books',
      params: 'popular=true',
      current: false,
    },
    {
      title: 'Недавно добавленные',
      href: '/books',
      params: 'recent=true',
      current: false,
    },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    const setMobileHeightListener = () => document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    setMobileHeightListener();
    window.addEventListener("resize", setMobileHeightListener);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
      window.removeEventListener("resize", setMobileHeightListener);
    }
  });

  // const [, createEdition] = useMutation(CreateEmptyEditionMutation);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const createEdition = (args: any): any => {};
  const [, clearNotifications] =
    useMutation<ClearNotificationsMutation>(ClearNotifications);

  const [{ data: meData, fetching: fetchingMe }] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
  });

  const client = useClient();
  const timer = useRef<any>();

  const onClearNotifications = async () => {
    await clearNotifications();
  };

  const { t } = useTranslation(['nav', 'common']);

  useEffect(() => {
    const handleRouteChange = () => {
      setNavMenu(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  const searchHandler = async (newValue: {
    title: string;
    image?: string;
    authors: string[];
    description?: string;
    isbn_13?: string | null;
    isbn_10?: string | null;
    publishedDate: string;
    booksCount: number;
    id: string;
    relatedEditionId?: string;
    virtual: boolean;
  }) => {
    console.log(newValue);
    if (newValue.relatedEditionId) {
      await router.push(`/book/${newValue.relatedEditionId}`);
    }
  };

  const createEmptyAndGo = (edition: any) => {
    createEdition({
      title: edition.title || '',
      description: edition.description || '',
      image: edition.image || '',
    }).then((res: any) => {
      router
        .push(`/book/${res.data.createEmptyEdition.edition.id}`)
        .then(() => {
          setSearchString('');
          setBooks([]);
        });
    });
  };

  useEffect(() => {
    const newArr = navigation.map((item) => {
      return {
        ...item,
        current:
          router.asPath.includes(item.href) &&
          router.asPath.includes(item.params),
      };
    });
    setNavigation(newArr);
  }, [router.asPath]);

  const closeAddModal = () => {
    setAddModal(false);
  };

  const closeCreateModal = () => {
    setCreateModal(false);
  };

  const addNewBookHandler = (name: string) => {
    closeAddModal();
    setNewBookName(name);
    setTimeout(() => {
      setCreateModal(true);
    }, 300);
  };

  if (fetchingMe) {
    return null;
  }
  if (!meData) {
    return null;
  }

  if (meData?.me) {
    const { user } = meData.me;
    if (!user) return null;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <div className="min-h-screen bg-gray-100">
          <div className="mobile-layout bg-gradient-to-r from-orange-400 to-pink-500 sm:pb-32">
            <nav>
              <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative space-x-4 h-16 flex items-center justify-between border-b">
                  <div className="px-2 flex items-center lg:px-0">
                    <div style={{ width: 54 }} className="flex-shrink-0">
                      {loading && <Loading />}
                      {!loading && (
                        <Link href="/home">
                          <a>
                            <Logo />
                          </a>
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <Link href="/books">
                      <a
                        className={classNames(
                          {
                            'bg-main-700 text-white border border-main-700 hover:border-main-500 hover:bg-main-500 hover:bg-opacity-75 transition duration-300 rounded-md py-2 px-3 text-sm font-medium':
                              router.asPath.includes('/books'),
                            'text-white border border-white hover:border-main-500 hover:bg-main-500 hover:bg-opacity-75 transition duration-300 rounded-md py-2 px-3 text-sm font-medium':
                              !router.asPath.includes('/books'),
                          },
                          'flex items-center space-x-2'
                        )}
                      >
                        <BookOpenIcon className="h-5 w-5" />
                        <span>Все книги</span>
                      </a>
                    </Link>
                  </div>
                  <div className="flex-1 flex justify-center lg:justify-end">
                    <div className="w-full">
                      <BookSearch
                        placeholder={'Поиск книги'}
                        onChange={searchHandler}
                      />
                    </div>
                  </div>
                  <div
                    onClick={() => setAddModal(true)}
                    className="hidden sm:flex cursor-pointer flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500"
                  >
                    <PlusCircleIcon className="h-5 w-5 mr-1" />
                    {t('create')}
                  </div>
                  <div className="hidden sm:block">
                    <div className="flex items-center">
                      <div className="relative">
                        {!!user.notifications.length && (
                          <div className="absolute ring-1 ring-offset-2 ring-offset-orange-400 ring-red-100 h-2 w-2 left-0 bg-white top-0 z-10 rounded-full"></div>
                        )}
                        <OutsideClickHandler
                          onOutsideClick={() => {
                            setNavMenu(false);
                          }}
                        >
                          <div
                            onClick={() => setNavMenu(!navMenu)}
                            className={`${
                              navMenu ? '' : 'text-opacity-90'
                            } select-none cursor-pointer text-white relative group bg-black bg-opacity-10 px-3 pl-14 py-2 rounded-md inline-flex items-center text-sm font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                          >
                            <AvatarComponent
                              className="w-10 absolute left-2 bottom-1"
                              avatarStyle="Circle"
                              {...user.avatar}
                            />
                            <span>{userName(user)}</span>
                            <ChevronDownIcon
                              className={`${
                                navMenu ? '' : 'text-opacity-70'
                              } ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                              aria-hidden="true"
                            />
                          </div>
                          {navMenu && (
                            <div className="absolute top-14 right-0 flex z-10 w-screen max-w-2xl mt-3 transform">
                              <>
                                <div
                                  style={{ width: 300 }}
                                  className="rounded-lg shadow-lg bg-white mr-1 ring-1 ring-black ring-opacity-5"
                                >
                                  <div className="h-full flex flex-col">
                                    <div className="p-6">
                                      <div className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                          <BellIcon
                                            className="h-10 w-10 text-green-600"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <div className="ml-4">
                                          <p className="text-sm font-bold text-gray-900">
                                            Уведомления
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {user.notifications.length > 0
                                              ? user.notifications.length
                                              : 'Нет уведомлений'}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ maxHeight: 316 }}
                                      className="flex-grow overflow-auto"
                                    >
                                      <div className="">
                                        {user.notifications
                                          .reverse()
                                          .map((notification, idx) => (
                                            <UserNotification
                                              key={idx}
                                              notification={notification}
                                            />
                                          ))}
                                      </div>
                                    </div>
                                    {user.notifications.length !== 0 && (
                                      <div className="p-4">
                                        <Button
                                          variant="secondary"
                                          className="w-full"
                                          onClick={onClearNotifications}
                                        >
                                          Очистить
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="overflow-hidden flex-grow rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                  <div className="relative grid gap-8 bg-white p-7">
                                    <Link href="/profile/books">
                                      <a className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                          <BookOpenIcon
                                            className="h-10 w-10 text-amber-400"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <div className="ml-4">
                                          <p className="text-sm font-bold text-gray-900">
                                            Мои книги ({user.books.length})
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {user.points} BST
                                          </p>
                                        </div>
                                      </a>
                                    </Link>
                                    <Link href="/profile">
                                      <a className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                          <AvatarComponent
                                            className="w-10"
                                            avatarStyle="Circle"
                                            {...user.avatar}
                                          />
                                        </div>
                                        <div className="ml-4">
                                          <p className="text-sm font-bold text-gray-900">
                                            Профиль
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {userName(user)}
                                          </p>
                                        </div>
                                      </a>
                                    </Link>
                                    <Link href="/profile/swaps">
                                      <a className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                          <ChatIcon
                                            className="h-10 w-10 text-green-600"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <div className="ml-4">
                                          <p className="text-sm font-bold text-gray-900">
                                            Активные свопы
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {`${
                                              activeSwapsReceive(user).length
                                            } получить / ${
                                              activeSwapsSend(user).length
                                            } отдать`}
                                          </p>
                                        </div>
                                      </a>
                                    </Link>
                                    <Link href="/profile/waiting">
                                      <a className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                          <HeartIcon
                                            className="h-10 w-10 text-red-400"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <div className="ml-4">
                                          <p className="text-sm font-bold text-gray-900">
                                            Избранное ({user.waiting.reduce((acc, sub) => {
                                            const openedBooks = sub.edition.books.filter(
                                              (book: any) => book.status === BooksStatus.Open
                                            ).length || 0;
                                            return acc + openedBooks;
                                          }, 0)}) / {user.waiting.length}
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            Книги которые вы ждете
                                          </p>
                                        </div>
                                      </a>
                                    </Link>
                                    <Link href="https://t.me/joinchat/jOVQHloO7ApiMDIy">
                                      <a className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                          <SupportIcon
                                            className="h-10 w-10 text-blue-500"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <div className="ml-4">
                                          <p className="text-sm font-bold text-gray-900">
                                            Поддержка
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            Ссылка на Телеграмм чат
                                          </p>
                                        </div>
                                      </a>
                                    </Link>
                                  </div>
                                  <div className="p-4 bg-gray-50">
                                    <a
                                      href="#"
                                      className="flow-root px-5 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                    >
                                      <span className="flex items-center">
                                        <span className="text-sm font-bold text-gray-900">
                                          О проекте
                                        </span>
                                      </span>
                                      <span className="block text-sm text-gray-500">
                                        Как мы работаем? Зачем все это нужно?
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </>
                            </div>
                          )}
                        </OutsideClickHandler>
                      </div>
                    </div>
                  </div>
                </div>
                {showBookHead && (
                  <div className="hidden py-3 sm:flex items-center justify-between">
                    <div className="flex space-x-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.title}
                          href={`${item.href}?${item.params}`}
                        >
                          <a
                            className={
                              item.current
                                ? 'bg-main-700 text-white border border-main-700 hover:border-main-500 hover:bg-main-500 hover:bg-opacity-75 transition duration-300 rounded-md py-1 px-2 text-xs font-medium'
                                : 'text-white border border-white hover:border-main-500 hover:bg-main-500 hover:bg-opacity-75 transition duration-300 rounded-md py-1 px-2 text-xs font-medium'
                            }
                          >
                            {t(item.title)}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
          <div className="z-10 sm:hidden shadow border-t fixed flex items-center justify-between w-full h-14 bg-white left-0 bottom-0">
            <div className="grid divide-x grid-cols-4 flex-grow">
              <Link href="/books">
                <a className="flex flex-col text-xs items-center justify-center">
                  <BookOpenIcon className="w-6 h-6 text-gray-500" />
                  Книги
                </a>
              </Link>

              <div>
                <button
                  onClick={() => setAddModal(true)} className="w-full flex flex-col text-xs items-center justify-center">
                  <PlusSmIcon className="w-6 h-6 text-gray-500" />
                  Новая книга
                </button>
              </div>

              <OutsideClickHandler
                onOutsideClick={() => {
                  setNotificationsMobile(false);
                }}
              >
                <div>
                  <button
                    onClick={() => setNotificationsMobile(!notificationsMobile)} className="w-full flex flex-col text-xs items-center justify-center">
                    <BellIcon className="w-6 h-6 text-gray-500" />
                    Уведомления
                  </button>
                  {
                    notificationsMobile && <div className="inset-x-4 bottom-14 fixed overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative grid gap-4 bg-white p-4 py-6">
                        <div className="mx-2">
                          <Button
                            onClick={onClearNotifications}
                            variant="primaryOutline"
                            className="w-full"
                          >
                            Очистить
                          </Button>
                        </div>
                        <div
                          style={{ maxHeight: 316 }}
                          className="flex-grow overflow-auto"
                        >
                          <div className="">
                            {user.notifications
                              .reverse()
                              .map((notification, idx) => (
                                <UserNotification
                                  key={idx}
                                  notification={notification}
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </OutsideClickHandler>
              <OutsideClickHandler
                onOutsideClick={() => {
                  setNavMenuMobile(false);
                }}
              >
                <div>
                  <button
                    onClick={() => setNavMenuMobile(!navMenuMobile)}
                    className="w-full flex flex-col text-xs items-center justify-center"
                  >
                    <MenuIcon className="w-6 h-6 text-gray-500" />
                    <span>Меню</span>
                  </button>
                  {navMenuMobile && <div className="inset-x-4 bottom-14 fixed overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-8 bg-white p-7">
                      <Link href="/profile/books">
                        <a className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                            <BookOpenIcon
                              className="h-10 w-10 text-amber-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-bold text-gray-900">
                              Мои книги ({user.books.length})
                            </p>
                            <p className="text-sm text-gray-500">
                              {user.points} BST
                            </p>
                          </div>
                        </a>
                      </Link>
                      <Link href="/profile">
                        <a className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                            <AvatarComponent
                              className="w-10"
                              avatarStyle="Circle"
                              {...user.avatar}
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-bold text-gray-900">
                              Профиль
                            </p>
                            <p className="text-sm text-gray-500">
                              {userName(user)}
                            </p>
                          </div>
                        </a>
                      </Link>
                      <Link href="/profile/swaps">
                        <a className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                            <ChatIcon
                              className="h-10 w-10 text-green-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-bold text-gray-900">
                              Активные свопы
                            </p>
                            <p className="text-sm text-gray-500">
                              {`${
                                activeSwapsReceive(user).length
                              } получить / ${
                                activeSwapsSend(user).length
                              } отдать`}
                            </p>
                          </div>
                        </a>
                      </Link>
                      <Link href="/profile/waiting">
                        <a className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                            <HeartIcon
                              className="h-10 w-10 text-red-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-bold text-gray-900">
                              Избранное ({user.waiting.reduce((acc, sub) => {
                              const openedBooks = sub.edition.books.filter(
                                (book: any) => book.status === BooksStatus.Open
                              ).length || 0;
                              return acc + openedBooks;
                            }, 0)}) / {user.waiting.length}
                            </p>
                            <p className="text-sm text-gray-500">
                              Книги которые вы ждете
                            </p>
                          </div>
                        </a>
                      </Link>
                      <Link href="https://t.me/joinchat/jOVQHloO7ApiMDIy">
                        <a className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                            <SupportIcon
                              className="h-10 w-10 text-blue-500"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-bold text-gray-900">
                              Поддержка
                            </p>
                            <p className="text-sm text-gray-500">
                              Ссылка на Телеграмм чат
                            </p>
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="p-4 bg-gray-50">
                      <a
                        href="#"
                        className="flow-root px-5 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                                <span className="flex items-center">
                                  <span className="text-sm font-bold text-gray-900">
                                    О проекте
                                  </span>
                                </span>
                        <span className="block text-sm text-gray-500">
                                  Как мы работаем? Зачем все это нужно?
                                </span>
                      </a>
                    </div>
                  </div>}
                </div>
              </OutsideClickHandler>
            </div>
          </div>
          <main className="sm:-mt-32">
            <div className="max-w-7xl mx-auto pb-16 pt-20 sm:pt-4 sm:pb-12 p-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
        <Transition appear show={addModal} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeAddModal}
          >
            <div className="min-h-screen px-4 text-center bg-black bg-opacity-30">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-screen-sm p-6 mt-4 mb-14 text-left align-top transition-all transform bg-violet-50 shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between items-center text-lg font-medium text-gray-900 mb-2"
                  >
                    Добавить свою книгу
                    <button
                      onClick={closeAddModal}
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    >
                      Закрыть
                    </button>
                  </Dialog.Title>
                  <AddBookModal
                    onAddNewBook={addNewBookHandler}
                    onClose={closeAddModal}
                  />
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
        <Transition appear show={createModal} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeCreateModal}
          >
            <div className="min-h-screen px-4 text-center bg-black bg-opacity-30">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-screen-sm p-6 my-8 text-left align-top transition-all bg-white transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between items-center text-lg font-medium text-gray-900 mb-2"
                  >
                    Создать новую книгу
                    <button
                      onClick={closeCreateModal}
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    >
                      Закрыть
                    </button>
                  </Dialog.Title>
                  <CreateBookModal
                    newBookName={newBookName}
                    onClose={closeCreateModal}
                  />
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
        <ToastContainer />
      </>
    );
  }
  return null;
};

export default Layout;
