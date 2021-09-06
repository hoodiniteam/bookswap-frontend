import React, {useState, useEffect, ReactElement} from 'react';
import { WithAuth } from '../../components/withAuth'
import SidebarForProfile from "../../components/sidebar-for-profile";
import Layout from "../../components/layout";
import BookWrapper from "../../components/book-wrapper";
import { Book } from '../../types/Book'
import { GetMe} from "../../graphql/GetMe";
import {useQueryWrapper} from "../../helpers/useQueryWrapper";

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState<Book[]>([])
  const [{data} ] = useQueryWrapper({
    query: GetMe
  })

  useEffect(() => {
    if(data){
        setMyBooks(data.me.user.books)
    }
  }, [data])

  if(myBooks){
    return(
      <div className="shadow sm:rounded-md sm:overflow-hidden px-5 py-8">
        <ul className="grid grid-cols-1 grid-rows-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:grid-rows-1 mt-5">
          {myBooks.map((book) => {
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
      <WithAuth>
        <Layout>
          <SidebarForProfile>{page}</SidebarForProfile>
        </Layout>
      </WithAuth>
  )
}

export default MyBooks;
