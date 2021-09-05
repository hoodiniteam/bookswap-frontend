import React, {ReactElement, useEffect, useState} from "react";
import {useQuery} from "urql";
import {WithAuth} from "../../components/withAuth";
import Layout from "../../components/layout";
import SidebarForProfile from "../../components/sidebar-for-profile";
import BookWrapper from "../../components/book-wrapper";
import { Book } from '../../types/Book'
import { GetMe } from '../../graphql/GetMe'

const WaitingList = () => {
  const [books, setBooks] = useState<Book[]>([])

  const [result, reexecuteQuery] = useQuery({
    query: GetMe,
    requestPolicy: "network-only"
  })

  useEffect(()=> {
    if(result.data) {
      setBooks(result.data?.me.user.waiting)
    }

  }, [result.data, reexecuteQuery])

  useEffect(() => {
    console.log(books);
  }, [books])

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
        <Layout>
          <SidebarForProfile>{page}</SidebarForProfile>
        </Layout>
      </WithAuth>
  )
}

export default WaitingList

