import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import {Disclosure, Menu, Transition} from '@headlessui/react';
import {SearchIcon} from '@heroicons/react/solid';
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline';
import Image from 'next/image';
import LogOut from '../helpers/LogOut';
import {useRouter} from 'next/router';
import {useClient, useMutation} from 'urql';
import Head from 'next/head';
import {useTranslation} from 'next-i18next';
import {GetEditionsQuery} from "../graphql/GetEditionsQuery";
import {CreateEmptyEditionMutation} from "../graphql/CreateEmptyEditionMutation";
import {Logo} from "./Logo";
import {useQueryWrapper} from "../helpers/useQueryWrapper";
import {GetMe} from "../graphql/GetMe";

const Layout = ({children, title}: any) => {
  const router = useRouter();
  const [searchString, setSearchString] = useState('');
  const [books, setBooks] = useState<any[]>([]);
  const [navigation, setNavigation] = useState([
    {title: 'books', href: '/books', current: false},
  ]);
  const myRef = useRef();
  const [, createEdition] = useMutation(CreateEmptyEditionMutation);

  const [{data: meData, fetching: fetchingMe}] = useQueryWrapper({
    query: GetMe,
  });

  const client = useClient();
  const timer = useRef<any>();

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

  const inputSearchHandler = (e: any) => {
    const search = e.target.value;
    setSearchString(search);
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

  if (meData.me) {
    const {user} = meData.me;

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <div className="min-h-screen bg-gray-100">
          <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-red-400 pb-32">
            <Disclosure
              as="nav"
              className="border-b border-main-300 border-opacity-25 lg:border-none"
            >
              {({open}) => (
                <>
                  <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                    <div
                      className="relative h-16 flex items-center justify-between lg:border-b lg:border-main-400 lg:border-opacity-25">
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
                            className="relative text-gray-400 flex flex-col focus-within:text-gray-600"
                          >
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
                            {books.length > 0 && (
                              <div style={{maxHeight: 250}}
                                   className="dropDown overflow-auto bg-white absolute w-full shadow-md top-11 z-20 flex flex-col border rounded-md p-4">
                                {books.map(
                                  (
                                    edition,
                                    index
                                  ) => (
                                    <>
                                      {
                                        edition.virtual ? (
                                          <div onClick={() => createEmptyAndGo(edition)} key={edition.id}
                                               className="flex bg-white hover:bg-gray-100 py-1 cursor-pointer items-center border-b">
                                            <div className="mr-2 bg-gray-100">
                                              <div className="w-10">
                                                <img
                                                  className="h-12 w-10 object-contain"
                                                  src={edition?.image}
                                                />
                                              </div>
                                            </div>
                                            {edition.title}
                                          </div>
                                        ) : (
                                          <Link href={`/book/${edition.id}`} key={edition.id}>
                                            <a
                                              className="flex bg-white hover:bg-gray-100 py-1 cursor-pointer items-center border-b">
                                              <div className="mr-2 bg-gray-100">
                                                <div className="w-10">
                                                  <img
                                                    className="h-12 w-10 object-contain"
                                                    src={edition?.image}
                                                  />
                                                </div>
                                              </div>
                                              {edition.title}
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
                      <div className="flex lg:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button
                          className="bg-main-600 p-2 rounded-md inline-flex items-center justify-center text-main-200 hover:text-white hover:bg-main-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-600 focus:ring-white">
                                                <span className="sr-only">
                                                    Open main menu
                                                </span>
                          {open ? (
                            <XIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <MenuIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                      <div className="hidden lg:block lg:ml-4">
                        <div className="flex items-center">
                          <button
                            className="bg-main-600 flex-shrink-0 rounded-full p-1 text-main-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-600 focus:ring-white">
                                                    <span className="sr-only">
                                                        View notifications
                                                    </span>
                            <BellIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>

                          {/* Profile dropdown */}
                          <Menu
                            as="div"
                            className="ml-3 relative flex-shrink-0"
                          >
                            {({open}) => (
                              <>
                                <div>
                                  <Menu.Button
                                    className="bg-main-600 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-600 focus:ring-white">
                                    <span className="sr-only"> Open user menu</span>
                                    <Image
                                      className="rounded-full"
                                      height={
                                        '40px' as any
                                      }
                                      width={
                                        '40px' as any
                                      }
                                      src={
                                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' as any
                                      }
                                      alt=""
                                    />
                                  </Menu.Button>
                                </div>
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
                                  <Menu.Items
                                    static
                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                  >
                                    <Menu.Item>
                                      <div className="block overflow-hidden border-b overflow-ellipsis py-2 px-4 text-sm text-gray-700">
                                        Книжный лимит: {user.points}
                                      </div>
                                    </Menu.Item>
                                    <Menu.Item>
                                      <Link href="/profile">
                                        <a className="block overflow-hidden overflow-ellipsis py-2 px-4 text-sm text-gray-700">
                                          {t("profile")} <span className="italic text-gray-500">({user.email})</span>
                                        </a>
                                      </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                    <span
                                      className="block py-2 px-4 text-sm text-gray-700"
                                      onClick={LogOut}
                                    >
                                      {t("sign-out")}
                                    </span>
                                    </Menu.Item>
                                  </Menu.Items>
                                </Transition>
                              </>
                            )}
                          </Menu>
                        </div>
                      </div>
                    </div>
                    <div className="py-4 flex justify-between">
                      <div className="flex">
                        <div className="hidden lg:block">
                          <div className="flex space-x-4">
                            {navigation.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                              >
                                <a
                                  className={
                                    item.current
                                      ? 'bg-main-700 text-white hover:bg-main-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium'
                                      : 'text-white hover:bg-main-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium'
                                  }
                                >
                                  {t(item.title)}
                                </a>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          router.push('/books/create')
                        }
                        type="button"
                        className="inline-flex items-center px-4 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500"
                      >
                        {t('create')}
                      </button>
                    </div>
                  </div>

                  <Disclosure.Panel className="lg:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                      {navigation.map((item, itemIdx) =>
                        itemIdx === 0 ? (
                          <Fragment key={item.title}>
                            {/* Current: "bg-main-700 text-white", Default: "text-white hover:bg-main-500 hover:bg-opacity-75" */}
                            <a
                              href="#"
                              className="bg-main-700 text-white block rounded-md py-2 px-3 text-base font-medium"
                            >
                              {item}
                            </a>
                          </Fragment>
                        ) : (
                          <a
                            key={item.title}
                            href="#"
                            className="text-white hover:bg-main-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium"
                          >
                            {item}
                          </a>
                        )
                      )}
                    </div>
                    <div className="pt-4 pb-3 border-t border-main-700">
                      <div className="px-5 flex items-center">
                        <div className="flex-shrink-0">
                          <Image
                            height={'80px' as any}
                            width={'80px' as any}
                            src={
                              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' as any
                            }
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium text-white">
                            Tom Cook
                          </div>
                          <div className="text-sm font-medium text-main-300">
                            tom@example.com
                          </div>
                        </div>
                        <button
                          className="ml-auto bg-main-600 flex-shrink-0 rounded-full p-1 text-main-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-600 focus:ring-white">
                                                <span className="sr-only">
                                                    View notifications
                                                </span>
                          <BellIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <div className="mt-3 px-2 space-y-1">
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
          <main className="-mt-32">
            <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
              {/* Replace with your content */}
              <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }
  return null;
};

export default Layout;
