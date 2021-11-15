import React, { ReactElement } from 'react';
import SidebarForProfile from "../../components/sidebar-for-profile";
import Layout from "../../components/layout";
import BookWrapper from "../../components/book-wrapper";
import { GetMe} from "../../graphql/GetMe";
import {useQueryWrapper} from "../../helpers/useQueryWrapper";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import { localesList } from '../../helpers/locales';
import { Book } from '../../types/Book';

const MyBooks = () => {
  const [{data} ] = useQueryWrapper({
    query: GetMe
  })

  if (data) {
    const user = data.me.user;
    const myBooks = user.books?.map((book: Book) => ({ book, image: book.edition.image, id: book.edition.id })) || []

    return(
      <div className="shadow sm:rounded-md sm:overflow-hidden px-5 py-8">
        <ul className="grid grid-cols-1 grid-rows-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:grid-rows-1 mt-5">
          {myBooks.map((book: any) => {
            return <BookWrapper key={book.id} book={book} />
          })}
        </ul>
      </div>
    )
  }
  return null
}

MyBooks.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout title={MyBooks.name}>
          <SidebarForProfile>{page}</SidebarForProfile>
      </Layout>
  )
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, localesList),
  },
})

export default MyBooks;
