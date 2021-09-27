import React, {ReactElement, useEffect, useState} from "react";
import {WithAuth} from "../../components/withAuth";
import Layout from "../../components/layout";
import SidebarForProfile from "../../components/sidebar-for-profile";
import BookWrapper from "../../components/book-wrapper";
import { Book } from '../../types/Book'
import { GetMe } from '../../graphql/GetMe'
import {useQueryWrapper} from "../../helpers/useQueryWrapper";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const WaitingList = () => {
  const [books, setBooks] = useState<Book[]>([])

  const [{data}] = useQueryWrapper({
    query: GetMe,
    requestPolicy: "network-only"
  })

  useEffect(()=> {
    if(data) {
      setBooks(data?.me.user.waiting)
    }
  }, [data])

  if(books){
    return(
        <>
          <div className="shadow sm:rounded-md sm:overflow-hidden px-5 py-8">
            <ul className="grid grid-cols-1 grid-rows-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:grid-rows-1 mt-5">
              {books.map((book) => {
                return <BookWrapper key={book.id} book={book}/>
              })}
            </ul>
          </div>
        </>
    )
  }
  return null;
}

WaitingList.getLayout = function getLayout(page: ReactElement) {
  return (
      <WithAuth>
        <Layout title={WaitingList.name}>
          <SidebarForProfile>{page}</SidebarForProfile>
        </Layout>
      </WithAuth>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'nav']),
  },
})

export default WaitingList
