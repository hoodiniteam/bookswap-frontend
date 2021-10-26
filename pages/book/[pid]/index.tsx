import React, {ReactElement, useState} from 'react'
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

const InitialMySwapMutation = `
mutation($bookId: String!){
   createMySwap(bookId: $bookId){
    status
  }
}
`

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

    const [, addToMyWaitingList] = useMutation(AddBookToMyWaitingListMutation)
    const [, removeFromMyWaitingList] = useMutation(RemoveBookFromMyWaitingList)
    const [, initialSwap] = useMutation(InitialMySwapMutation)

    const addBookToList = async () => {
        const variables = {
            id: pid,
        }
        await addToMyWaitingList(variables);
    };

    const removeBookFromList = async () => {
        const variables = {
            id: pid,
        }
        await removeFromMyWaitingList(variables);
    };

    const createSwap = () => {
        const variables = {
            bookId: pid,
        }
        initialSwap(variables).then(res => console.log(res))
    }

    if (fetchingEdition || fetchingMe) return <p>Loading...</p>
    console.log(fetchingEdition, fetchingMe);
    const {edition} = editionData.getEdition;
    const {user} = meData.me;
    console.log(user);
    return (
        <div className="space-y-5">
            <Head>
                <title>{edition.title}</title>
            </Head>
            {/* {book.creator.id === userId ?
          <button
            onClick={() => router.push(`${router.asPath}/change`)}
            type='button'
            className='inline-flex m-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-main-600 hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500'
          >
            Edit
          </button>
          : ''}
        */}
            {/* {
           book.swaps.length < 1 ?
            <button
              type='button'
              className='inline-flex m-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-main-600 hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500'
              onClick={createSwap}
            >
              Initial swap
            </button> : <div className="px-5 inline-flex py-3 rounded-full mb-5 bg-gray-200 text-gray-500 font-bold">Added to swap</div>
        } */}
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
                        (
                            <div className="flex justify-end">
                                <button
                                    type='button'
                                    className='inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-main-600 hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500'
                                    onClick={removeBookFromList}
                                >
                                    Remove from waiting list
                                </button>
                                <button
                                    type='button'
                                    className='inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-main-600 hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500'
                                    onClick={addBookToList}
                                >
                                    Add to my waiting list
                                </button>
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
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-main-600 truncate">
                                                    Держатель: {book.holder.email}
                                                </p>
                                                <div className="ml-2 flex-shrink-0 flex items-center">
                                                    <p className="flex items-center text-sm text-gray-500 mr-2">
                                                        <ClipboardListIcon className="w-6 h-6"/>
                                                        {t(book.condition)}
                                                    </p>
                                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {book.status}
                                                    </p>
                                                </div>
                                            </div>
                                            {
                                                book.description &&
                                                <div className="text-sm italic mt-2">{book.description}</div>
                                            }
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
