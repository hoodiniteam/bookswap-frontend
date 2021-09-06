import React, {useState, useEffect, ReactElement} from 'react';
import {useQuery} from "urql";
import { WithAuth } from '../../components/withAuth'
import SidebarForProfile from "../../components/sidebar-for-profile";
import Layout from "../../components/layout";
import BookWrapper from "../../components/book-wrapper";
import { Book } from '../../types/Book'
import { GetMe} from "../../graphql/GetMe";

const source = 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80'
const MyBooks = () => {
  const [myBooks, setMyBooks] = useState<Book[]>([])
  const [result, ] = useQuery({
    query: GetMe
  })

  useEffect(()=>{
    if(result.data){
        setMyBooks(result.data.me.user.books)
    }
  }, [result])

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
