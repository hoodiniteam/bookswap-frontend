import React, {useEffect, useState} from "react"
import Link from 'next/link'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import Image from "next/image";
import LogOut from "../helpers/LogOut"
import {useRouter} from "next/router";
import {useQuery} from "urql";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Books = `
query($search: String, $limit: Float,){
  getBooks(search: $search, limit: $limit){
    status
    books{
      title
   
    }
  }
}
`

type Books = [{
  title: string
}]
const Layout = ({children}: any) => {
  const router = useRouter();
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [books, setBooks] = useState<Books | []>([])
  const [navigation, setNavigation] = useState([
    {title: 'Home', href: '/home', current: true},
    {title: 'Profile', href: '/profile', current: false},
    {title: 'Books', href: '/books', current: false}
  ])

  const [result, ] = useQuery({
    query: Books,
    variables:{
      search: search,
      limit: 5
    }
  })

  const onFocus = () => {
    setShow(true)
  }
  const onBlur = () => {
    setShow(false)
  }

  useEffect(() => {
    if(result.data){
      setBooks(result.data.getBooks.books)
    }
    console.log(result)
  })

  const booksToShow = books.slice(0, 5)

  useEffect(() => {
    const newArr = [...navigation]
    navigation.map((item, index) => {
      item.current  = false;

      if(router.route.includes(item.href)){
        newArr.splice(index, 1, {...item, current: true})
        setNavigation(newArr)
      }
    })
  },[router.asPath])

  const onHandlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if(e.target.value.length >= 3){
      setSearch(searchTerm)
      setShow(true)
    }else{
      setSearch('')
      setShow(false)
    }
  }
  const profile = [{title: 'Your Profile', href: '/profile'}, {title: 'Settings'}, {title: 'Sign out', function: LogOut}]
  return (
        <>
          <div className="min-h-screen bg-gray-100">
            <div className="bg-indigo-600 pb-32">
              <Disclosure as="nav" className="bg-indigo-600 border-b border-indigo-300 border-opacity-25 lg:border-none">
                {({ open }) => (
                  <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                      <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                        <div className="px-2 flex items-center lg:px-0">
                          <div className="flex-shrink-0">
                          </div>
                          <div className="hidden lg:block lg:ml-10">
                            <div className="flex space-x-4">
                              {navigation.map(item =>
                                  <Link
                                    key={item.title}
                                    href={item.href}
                                  >
                                    <a
                                      className={ item.current ? "bg-indigo-700 text-white hover:bg-indigo-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium" :
                                        "text-white hover:bg-indigo-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"}
                                    >
                                      {item.title}
                                    </a>
                                  </Link>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                          <button
                            onClick={()=>router.push('/books/create')}
                            type="button"
                            className="inline-flex items-center px-4 py-1.5 mr-5 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Create book
                          </button>
                          <div className="max-w-lg w-full lg:max-w-xs">
                            <label htmlFor="search" className="sr-only">
                              Search
                            </label>
                            <div className="relative text-gray-400 focus-within:text-gray-600">
                              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                <SearchIcon className="h-5 w-5" aria-hidden="true" />
                              </div>
                              <input
                                onBlur={onBlur}
                                onFocus={onFocus}
                                onChange={onHandlerSearch}
                                className="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white focus:border-white sm:text-sm"
                                placeholder="Search"
                                type="search"
                              />
                            </div>
                            {show ? <div className="bg-white fixed flex flex-col w-80 border rounded-md p-4">
                              {booksToShow.map((book, index) => {
                                return <span key={index + 1}>{book.title}</span>
                              })}
                            </div> : ''}
                          </div>
                        </div>
                        <div className="flex lg:hidden">
                          {/* Mobile menu button */}
                          <Disclosure.Button className="bg-indigo-600 p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                              <XIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                            )}
                          </Disclosure.Button>
                        </div>
                        <div className="hidden lg:block lg:ml-4">
                          <div className="flex items-center">
                            <button className="bg-indigo-600 flex-shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                              <span className="sr-only">View notifications</span>
                              <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button>

                              {/* Profile dropdown */}
                              <Menu as="div" className="ml-3 relative flex-shrink-0">
                                {({ open }) => (
                                  <>
                                    <div>
                                      <Menu.Button className="bg-indigo-600 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                                        <span className="sr-only">Open user menu</span>
                                        <Image
                                          className="rounded-full"
                                          height={'40px' as any}
                                          width={'40px' as any}
                                          src={"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" as any}
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
                                        {profile.map((item) => (
                                          <Menu.Item key={item.title}>
                                            {({ active }) => (
                                              <Link
                                                href={item.href ? item.href : '#'}
                                              >
                                                <a
                                                  onClick={item.function}
                                                  className={classNames(
                                                      active ? 'bg-gray-100' : '',
                                                      'block py-2 px-4 text-sm text-gray-700'
                                                  )}
                                                >
                                                  {item.title}
                                                </a>
                                              </Link>
                                            )}
                                          </Menu.Item>
                                        ))}
                                      </Menu.Items>
                                    </Transition>
                                  </>
                                )}
                              </Menu>
                            </div>
                        </div>
                      </div>
                    </div>

                      <Disclosure.Panel className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                          {navigation.map((item, itemIdx) =>
                            itemIdx === 0 ? (
                              <Fragment key={item.title}>
                                {/* Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" */}
                                <a
                                  href="#"
                                  className="bg-indigo-700 text-white block rounded-md py-2 px-3 text-base font-medium"
                                >
                                  {item}
                                </a>
                              </Fragment>
                            ) : (
                              <a
                                key={item.title}
                                href="#"
                                className="text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium"
                              >
                                {item}
                              </a>
                              )
                          )}
                        </div>
                        <div className="pt-4 pb-3 border-t border-indigo-700">
                          <div className="px-5 flex items-center">
                            <div className="flex-shrink-0">
                              <Image
                                height={'80px' as any}
                                width={'80px' as any}
                                src={"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" as any}
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <div className="text-base font-medium text-white">Tom Cook</div>
                              <div className="text-sm font-medium text-indigo-300">tom@example.com</div>
                            </div>
                            <button className="ml-auto bg-indigo-600 flex-shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                              <span className="sr-only">View notifications</span>
                              <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        <div className="mt-3 px-2 space-y-1">
                          {profile.map((item) => (
                            <a
                              key={item.title}
                              href="#"
                              className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
          </Disclosure>
            <header className="py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white">{
                  navigation.map(item => {
                   if(item.current){
                     return item.title
                   }
                  })
                }</h1>
              </div>
            </header>
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
};

export default Layout
