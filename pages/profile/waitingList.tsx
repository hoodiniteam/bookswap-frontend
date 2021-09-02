import React, {ReactElement, useEffect, useState} from "react";
import {useQuery} from "urql";
import {WithAuth} from "../../components/withAuth";
import Layout from "../../components/layout";
import SidebarForProfile from "../../components/sidebar-for-profile";
import BookWrapper from "../../components/book-wrapper";
import Pagination from "../../components/pagination";
import {useRouter} from "next/router";

const GetMe = `
query{
  me{
    user{
      waiting{
        title
        id
      }
    }
  }
}
`

type WaitingListType = [{
  title: string
  id: string
}]
const source = 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80'

const WaitingList = () => {
  const [books, setBooks] = useState<WaitingListType | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage,] = useState(3)
  const router = useRouter()
  const [result,] = useQuery({
    query: GetMe
  })
  useEffect(()=> {
    if(result.data)
      setBooks(result.data?.me.user.waiting)
  })
  const href = (page: number) => {
    return `/profile/waitingList?page=${page}`
  }
  const paginate = (page: number | string) => {
    if(books){
      let current = currentPage;
      if(page === 'previous' && currentPage > 1){
        current--
        setCurrentPage(current)
        router.push(`${href(current)}`)
      }if(page === 'next' && currentPage < books.length/booksPerPage ){
        current++
        setCurrentPage(current)
        router.push(`${href(current)}`)
      }else if(!isNaN(page as number)){
        setCurrentPage(page as number)
      }
    }
  }
  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = books?.slice(indexOfFirstBook, indexOfLastBook)

  useEffect(() => {
    if(router.query.page && result.data){
      setCurrentPage(+router.query.page)
      const arr = document.querySelectorAll('.pagItem')
      arr.forEach((item, indx, arr) => {
        item.classList.remove('active')
        arr[currentPage - 1].classList.add('active');
      })
    }
  }, [currentPage, router.query, result] )

  const onClickHandler = (e: {target: any}) => {
    router.push(`/books/${e.target?.id}`).then()
  }

  if(books !== null && currentBooks){
    return(
      <>
        <div className="shadow sm:rounded-md sm:overflow-hidden px-5 py-8">
          { result.fetching ? <h1>Loading...</h1> : '' }
          { result.error ? <h1>Opps something went wrong</h1> : '' }
          <ul className="grid grid-cols-1 grid-rows-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:grid-rows-1 mt-5">
            {currentBooks.map((book: any, index) => {
              return <BookWrapper
                key={index + 1}
                src={source}
                title={book.title}
                id={book.id}
                onClickHandler={onClickHandler}
              />
            })}
          </ul>
            <Pagination
              href={href}
              booksPerPage={booksPerPage}
              totalBooks={books.length}
              paginate={paginate}
            />
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