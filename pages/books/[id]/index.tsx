import React, {ReactElement} from 'react'
import {useRouter} from 'next/router'
import Layout from '../../../components/layout'
import {useQueryWrapper} from "../../../helpers/useQueryWrapper"
import Head from 'next/head'
import {GetBook} from "../../../graphql/GetBookQuery";
import {getStaticBooks} from "../../../helpers/staticRequest";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {localesList} from "../../../helpers/locales";

const Book = () => {
  const router = useRouter();
  const {id} = router.query;

  const [{data, fetching, error}] = useQueryWrapper({
    query: GetBook,
    variables: {id},
    pause: !id,
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>
  console.log(data);
  if (data) {
    const book = data.getBook.book;
    return (
      <>
        <Head>
          <title>{book.title}</title>
        </Head>
        <div className='grid grid-cols-6 grid-rows-1 border p-10'>
          <div className='col-span-5'>
            <h1 className='text-center text-4xl '>{book.title}</h1>
            <h2 className='text-center mt-8'>Creator: {book.creator.email}</h2>
          </div>
          <div className='col-span-1'>
            <img src={book.edition?.image} alt={'image'}/>
          </div>
        </div>
        <div className='grid grid-cols-6 grid-rows-1 p-8'>
          <div className='col-span-5 flex flex-col pr-16'>
            <span className='font-bold'>Description:</span>
            <span>{book.description}</span>
          </div>
          <div className='col-span-1 flex flex-col'>
            <span>status: {book.status}</span>
            <span>condition: {book.condition}</span>
            <span>holder: {book.holder.email}</span>
          </div>
        </div>
      </>
    )
  }
  return null;
}

Book.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}

export const getStaticPaths = async () => {
  const books = await getStaticBooks();
  return {
    paths: books.data.data.getBooksStatic.map(bookId => `/books/${bookId}`),
    fallback: true,
  }
}

export const getStaticProps = async ({locale}: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Book;
