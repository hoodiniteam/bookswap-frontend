import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import {Menu, Transition, Popover} from '@headlessui/react';
import {SearchIcon, ChevronDownIcon} from '@heroicons/react/solid';
import {
  BookmarkIcon, BookOpenIcon, ChevronUpIcon,
  MailIcon,
  PlusCircleIcon,
  RefreshIcon,
  SupportIcon,
} from '@heroicons/react/outline';
import {useRouter} from 'next/router';
import {useClient, useMutation} from 'urql';
import Head from 'next/head';
import {useTranslation} from 'next-i18next';
import {GetEditionsQuery} from "../graphql/GetEditionsQuery";
import {CreateEmptyEditionMutation} from "../graphql/CreateEmptyEditionMutation";
import {Logo} from "./Logo";
import {useQueryWrapper} from "../helpers/useQueryWrapper";
import {GetMe} from "../graphql/GetMe";
import {AvatarComponent} from "./avatars";
import { userName } from '../helpers/parseUserName';
import { usePopper } from 'react-popper';
import format from 'date-fns/format';
import { NotificationLinkParser } from '../helpers/notificationLinkParser';
import Button from './UI/Button';
import { ClearNotificationsMutation } from '../graphql/ClearNotificationsMutation';
import { dateParsedYear, dateTimeToHuman } from '../helpers/dateTime';

const Layout = ({children, title}: any) => {
  const router = useRouter();
  const [searchString, setSearchString] = useState('');
  const [books, setBooks] = useState<any[]>([]);
  const [navigation, setNavigation] = useState([
    {title: 'books', href: '/books', current: false},
    {title: 'Популярные', href: '/books', current: false},
    {title: 'Недавно добавленные', href: '/books', current: false},
  ]);
  const myRef = useRef();

  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
  });

  const [, createEdition] = useMutation(CreateEmptyEditionMutation);
  const [, clearNotifications] = useMutation(ClearNotificationsMutation);

  const [{data: meData, fetching: fetchingMe}] = useQueryWrapper({
    query: GetMe,
  });

  const client = useClient();
  const timer = useRef<any>();

  const onClearNotifications = async () => {
    await clearNotifications();
  }

  const {t} = useTranslation(['nav', 'common']);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);

    function handleClick(e: any) {
      if (myRef && myRef.current) {
        const ref: any = myRef.current;
        if (!ref.contains(e.target)) {
          setSearchString('');
          setBooks([]);
        }
      }
    }
  }, []);

  const createEmptyAndGo = (edition: any) => {
    createEdition({
      title: edition.title || '',
      description: edition.description || '',
      image: edition.image || '',
    }).then((res) => {
      router.push(`/book/${res.data.createEmptyEdition.edition.id}`).then(() => {
        setSearchString('');
        setBooks([])
      });
    })
  };

  useEffect(() => {
    const newArr = [...navigation];
    navigation.map((item, index) => {
      item.current = false;

      if (router.route.includes(item.href)) {
        newArr.splice(index, 1, {...item, current: true});
        setNavigation(newArr);
      }
    });
  }, [router.asPath]);

  const notificationAmount = (arr: {isRead: boolean, message: string, createdAt: string}[]) => arr.filter(item => !item.isRead).length

  const inputSearchHandler = (e: any) => {
    const search = e.target.value;
    setSearchString(search);
    if (search.length === 0) {
      setBooks([]);
    }
    if (search.length > 3) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        console.log('called - ', search);
        client
          .query(GetEditionsQuery, {
            search: search,
          })
          .toPromise()
          .then((res) => {
            const result = res.data?.getEditions?.editions;
            if (result) {
              const editions = result.map((edition: any) => ({
                title: edition.title,
                image: edition?.image,
                description: edition?.description,
                authors: edition?.authors.join(', '),
                publishedDate: edition?.publishedDate,
                id: edition?.id,
                virtual: edition?.virtual,
              }));
              console.log(editions);
              setBooks(editions || []);
            }
          })
          .catch(() => {
            setBooks([]);
          });
      }, 800);
    }
  }

  if (fetchingMe) {
    return null;
  }
  if (!meData) {
    return null;
  }

  if (meData?.me) {
    const {user} = meData.me;
    if (!user) return null;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <div className="min-h-screen bg-gray-100">
          <div className="mobile-layout bg-gradient-to-r from-orange-400 to-pink-500 sm:pb-32">
            <nav
              className="border-b border-main-300 border-opacity-25 lg:border-none"
            >
              <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-gray-100 lg:border-opacity-25">
                  <div className="px-2 flex items-center lg:px-0">
                    <div className="flex-shrink-0">
                      <Link href="/home">
                        <a>
                          <Logo/>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                    <div className="w-full">
                      <label
                        htmlFor="search"
                        className="sr-only"
                      >
                        {t('book-search', {ns: 'common'})}
                      </label>
                      <div
                        ref={myRef as any}
                        className="sm:relative text-gray-400 flex flex-col focus-within:text-gray-600"
                      >
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <SearchIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            className="layout-search-input block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-600 focus:ring-white focus:border-white sm:text-sm"
                            placeholder={t('book-search', {ns: 'common'})}
                            type="search"
                            value={searchString}
                            onInput={inputSearchHandler}
                          />
                        </div>
                        {books.length > 0 && (
                          <div
                               className="overflow-auto divide-y max-h-96 bg-white absolute w-full shadow-md left-0 top-14 sm:top-11 z-20 flex flex-col border rounded-md p-4">
                            {books.map(
                              (
                                edition,
                              ) => (
                                <>
                                  {
                                    edition.virtual ? (
                                      <div onClick={() => createEmptyAndGo(edition)} key={edition.id}
                                           className="flex bg-white hover:bg-gray-100 py-1 cursor-pointer items-center">
                                        <div className="mr-2 bg-gray-100">
                                          <div className="w-10">
                                            <img
                                              className="h-12 w-10 object-contain"
                                              src={edition?.image}
                                            />
                                          </div>
                                        </div>
                                        <div>
                                          <p className="leading-5">{edition.title}</p>
                                          <span className="text-xs">{edition.authors}, {dateParsedYear(edition.publishedDate)}</span>
                                        </div>
                                      </div>
                                    ) : (
                                      <Link href={`/book/${edition.id}`} key={edition.id}>
                                        <a
                                          className="flex bg-white hover:bg-gray-100 py-1 cursor-pointer items-center">
                                          <div className="mr-2 bg-gray-100">
                                            <div className="w-10">
                                              <img
                                                className="h-12 w-10 object-contain"
                                                src={edition?.image}
                                              />
                                            </div>
                                          </div>
                                          <div>
                                            <p>{edition.title}</p>
                                            <span className="text-xs">{edition.authors}, {dateParsedYear(edition.publishedDate)}</span>
                                          </div>
                                        </a>
                                      </Link>
                                    )
                                  }
                                </>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block lg:ml-4">
                    <div className="flex items-center">

                      <Popover className="relative">
                        {({open}) => (
                          <>
                            <Popover.Button
                              className={`${open ? '' : 'text-opacity-90'} text-white relative group bg-black bg-opacity-10 px-3 pl-14 py-2 rounded-md inline-flex items-center text-sm font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                              <AvatarComponent
                                className="w-10 absolute left-2 bottom-1"
                                avatarStyle='Circle'
                                {...user.avatar}
                              />
                              <span>{userName(user)}</span>
                              <ChevronDownIcon
                                className={`${open ? '' : 'text-opacity-70'} ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                                aria-hidden="true"
                              />
                            </Popover.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel
                                className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                                <div
                                  className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                  <div className="relative grid gap-8 bg-white p-7">
                                    <Link href="/profile/books">
                                      <a
                                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                      >
                                        <div
                                          className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                          <img className="w-10" src="/images/origami-c.png"/>
                                        </div>
                                        <div className="ml-4">
                                          <p className="font-serif text-sm font-bold text-gray-900">
                                            Мои книги
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {user.points} BST
                                          </p>
                                        </div>
                                      </a>
                                    </Link>
                                    <Link href="/profile">
                                      <a
                                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                      >
                                        <div
                                          className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                          <AvatarComponent
                                            className="w-10"
                                            avatarStyle='Circle'
                                            {...user.avatar}
                                          />
                                        </div>
                                        <div className="ml-4">
                                          <p className="font-serif text-sm font-bold text-gray-900">
                                            Профиль
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {userName(user)}
                                          </p>
                                        </div>
                                      </a>
                                    </Link>
                                    <Link href="/profile/swaps">
                                      <a
                                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                      >
                                        <div
                                          className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                          <RefreshIcon
                                            className="h-10 w-10 text-green-600"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <div className="ml-4">
                                          <p className="font-serif text-sm font-bold text-gray-900">
                                            Активные свопы
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            {user.swaps.length} получить / {user.sends.length} отдать
                                          </p>
                                        </div>
                                      </a>
                                    </Link>
                                    <Link href="/profile/waiting">
                                      <a
                                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                      >
                                        <div
                                          className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                          <BookmarkIcon
                                            className="h-10 w-10 text-orange-400"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <div className="ml-4">
                                          <p className="font-serif text-sm font-bold text-gray-900">
                                            Подписки
                                          </p>
                                          <p className="text-sm text-gray-500">
                                            Книги которые вы ждете
                                          </p>
                                        </div>
                                      </a>
                                    </Link>
                                    <Link href="https://t.me/joinchat/jOVQHloO7ApiMDIy">
                                      <a
                                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                      >
                                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                          <SupportIcon
                                            className="h-10 w-10 text-blue-500"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <div className="ml-4">
                                          <p className="font-serif text-sm font-bold text-gray-900">
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
                                      className="flow-root px-5 py-2 font-serif transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
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
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>

                      <Popover
                        as="div"
                        className="ml-3 relative flex items-center flex-shrink-0"
                      >
                        {({open}) => (
                          <>
                            <Popover.Button className="bg-main-600 flex-shrink-0 rounded-full p-1 text-main-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-600 focus:ring-white">
                              <span className="sr-only">Уведомления</span>
                              <MailIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </Popover.Button>
                            {
                              notificationAmount(user.notifications) > 0 && <span className="absolute -right-1 -bottom-1 flex justify-center items-center text-xs w-4 h-4 -my-1 rounded-full bg-white text-red-600 font-medium">{notificationAmount(user.notifications)}</span>
                            }
                            <Transition
                              show={open}
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Popover.Panel className="notifications-panel fixed flex flex-col right-3 top-3 font-serif z-10 rounded-md rounded-md w-full bg-gray-50 shadow-md max-w-xs p-6 bg-white ">
                                <div className="flex-grow overflow-auto">
                                  <div className="font-medium mb-4">Уведомления</div>
                                  <div className="space-y-3 divide-y">
                                    {
                                      user.notifications.length > 0 ?
                                        user.notifications.map((notification: {isRead: boolean, message: string, createdAt: string}) => (
                                          <NotificationLinkParser message={notification.message} key={notification.createdAt} className="text-sm space-y-1 pt-3">
                                            <div className="text-gray-500 text-xs">{dateTimeToHuman(notification.createdAt)}</div>
                                          </NotificationLinkParser>
                                        )):
                                        <div className="text-center">Нет сообщений</div>
                                    }
                                  </div>
                                </div>
                                <div className="text-center">
                                  <Button onClick={onClearNotifications} variant="primaryOutline" className="">Очистить</Button>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    </div>
                  </div>
                </div>
                <div className="hidden py-4 sm:flex items-center justify-between">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                      >
                        <a
                          className={
                            item.current
                              ? 'bg-main-700 text-white border border-main-700 hover:border-main-500 hover:bg-main-500 hover:bg-opacity-75 transition duration-300 rounded-md py-2 px-3 text-sm font-medium'
                              : 'text-white border border-white hover:border-main-500 hover:bg-main-500 hover:bg-opacity-75 transition duration-300 rounded-md py-2 px-3 text-sm font-medium'
                          }
                        >
                          {t(item.title)}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <Link href='/books/create'>
                    <a
                      className="flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500"
                    >
                      <PlusCircleIcon className="h-5 w-5 mr-1"/>
                      {t('create')}
                    </a>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
          <div className="z-10 sm:hidden shadow border-t fixed flex items-center justify-between w-full h-14 bg-white left-0 bottom-0">
            <div className="grid divide-x grid-cols-2 flex-grow">
              <Link href="/books">
                <a className="flex flex-col text-xs items-center justify-center">
                  <BookOpenIcon className="w-6 h-6 text-gray-500" />
                  Книги
                </a>
              </Link>
              <Menu
                as={Fragment}
              >
                {({open}) => (
                  <>
                    <Menu.Button className="flex flex-col text-xs items-center justify-center">
                      <MailIcon className="w-6 h-6 text-gray-500" />
                      Сообщ.
                    </Menu.Button>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <div className="notifications-panel font-serif z-10 border rounded-md rounded-md w-full bg-gray-50 shadow-md max-w-xs p-6 bg-white fixed right-2 bottom-16 overflow-auto">
                        <div className="font-medium mb-4">Уведомления</div>
                        <Button onClick={onClearNotifications} variant="primaryOutline" className="absolute right-5 top-4">Очистить</Button>
                        <div className="space-y-2 divide-y">
                          {
                            user.notifications.length > 0 ?
                              user.notifications.map((notification: {isRead: boolean, message: string, createdAt: string}) => (
                                <div key={notification.createdAt} className="text-sm py-2">
                                  <div className="text-gray-500">{notification.message}</div>
                                  <div className="text-gray-500">{notification.createdAt}</div>
                                </div>
                              )):
                              <div className="text-center">Нет сообщений</div>
                          }
                        </div>
                      </div>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
            <div className="px-2">
              <Popover className="relative">
                {({open}) => (
                  <>
                    <Popover.Button
                      ref={setReferenceElement}
                      className={`${open ? '' : 'text-opacity-90'} text-white relative group bg-gradient-to-r from-orange-400 to-pink-500 px-3 pl-14 py-2 rounded-md inline-flex items-center text-sm font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <AvatarComponent
                        className="w-10 absolute left-2 bottom-1"
                        avatarStyle='Circle'
                        {...user.avatar}
                      />
                      <span>{userName(user)}</span>
                      <ChevronUpIcon
                        className={`${open ? '' : 'text-opacity-70'} ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                        aria-hidden="true"
                      />
                    </Popover.Button>
                    <Popover.Panel
                      ref={setPopperElement}
                      style={styles.popper}
                      {...attributes.popper}
                    >
                      <div
                        className="-top-3.5 w-screen relative overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-7">
                          <Link href="/profile/books">
                            <a
                              className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <div
                                className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                <img className="w-10" src="/images/origami-c.png"/>
                              </div>
                              <div className="ml-4">
                                <p className="font-serif text-sm font-bold text-gray-900">
                                  Мои книги
                                </p>
                                <p className="text-sm text-gray-500">
                                  {user.points} BST
                                </p>
                              </div>
                            </a>
                          </Link>
                          <Link href="/profile">
                            <a
                              className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <div
                                className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                <AvatarComponent
                                  className="w-10"
                                  avatarStyle='Circle'
                                  {...user.avatar}
                                />
                              </div>
                              <div className="ml-4">
                                <p className="font-serif text-sm font-bold text-gray-900">
                                  Профиль
                                </p>
                                <p className="text-sm text-gray-500">
                                  {userName(user)}
                                </p>
                              </div>
                            </a>
                          </Link>
                          <Link href="/profile/swaps">
                            <a
                              className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <div
                                className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                <RefreshIcon
                                  className="h-10 w-10 text-green-600"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-4">
                                <p className="font-serif text-sm font-bold text-gray-900">
                                  Активные свопы
                                </p>
                                <p className="text-sm text-gray-500">
                                  {user.swaps.length} получить / {user.sends.length} отдать
                                </p>
                              </div>
                            </a>
                          </Link>
                          <Link href="/profile/waiting">
                            <a
                              className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <div
                                className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                <BookmarkIcon
                                  className="h-10 w-10 text-orange-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-4">
                                <p className="font-serif text-sm font-bold text-gray-900">
                                  Подписки
                                </p>
                                <p className="text-sm text-gray-500">
                                  Книги которые вы ждете
                                </p>
                              </div>
                            </a>
                          </Link>
                          <Link href="https://t.me/joinchat/jOVQHloO7ApiMDIy">
                            <a
                              className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                <SupportIcon
                                  className="h-10 w-10 text-blue-500"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-4">
                                <p className="font-serif text-sm font-bold text-gray-900">
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
                            className="flow-root px-5 py-2 font-serif transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
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
                    </Popover.Panel>
                  </>
                )}
              </Popover>
            </div>
          </div>
          <main className="sm:-mt-32">
            <div className="max-w-7xl mx-auto pb-24 pt-20 sm:pt-4 sm:pb-12 p-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </>
    );
  }
  return null;
};

export default Layout;
