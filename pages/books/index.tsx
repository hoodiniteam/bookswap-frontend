import React, {ChangeEvent, ReactElement, useEffect, useState} from "react";
import  {WithAuth} from "../../components/withAuth";
import {useRouter} from "next/router";
import Pagination from "../../components/pagination";
import {SearchIcon} from "@heroicons/react/solid";
import Layout from "../../components/layout";
import BookWrapper from "../../components/book-wrapper";
import { Book } from '../../types/Book'
import { GetBooksQuery } from '../../graphql/GetBooksQuery'
import {useQueryWrapper} from "../../helpers/useQueryWrapper";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState<string>('OPEN');
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0)
  const [books, setBooks] = useState<Book[]>([]);
  const [booksPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const router = useRouter()
  const variables = () => {
      const obj = {
          search: search,
          offset: offset,
          limit: booksPerPage,
      }
      if(status){
          return {...obj, status: status}
      }else{
          return obj
      }
  }
  const href = (page: number) => {
    if(status === ''){
      return `books?page=${page}`
    }else{
      return `books?page=${page}&status=${status}`
    }
  }

  const [{data}] = useQueryWrapper({
  query: GetBooksQuery,
  variables: variables()
  })
  useEffect(() => {
    if(data){
      setBooks(data.getBooks.books)
        setTotal(data.getBooks.count)

    }
  }, [data])
  const paginate = (page: number | string) => {
    let current = currentPage;
    if(page === 'previous' && currentPage > 1){
      current--
      setCurrentPage(current)
      router.push(`${href(current)}`)
    }if(page === 'next' && currentPage <= total/booksPerPage ){
      current++
      setCurrentPage(current)
      router.push(`${href(current)}`)
    }
  }

  const onHandlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
      if(e.target.value.length >= 3){
        setSearch(searchTerm)
        setOffset(0)
      }else{
        setSearch('')
        setOffset((currentPage - 1) * booksPerPage)
      }
  }

  useEffect(()=>{
    if(router.query.page && data){
      setCurrentPage(+router.query.page)
      setStatus(`${router.query.status || ''}`)
    }
    setOffset((currentPage - 1) * booksPerPage)
  }, [router.query, data, currentPage, booksPerPage])

  const onHandlerSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if(!e.target.value){
      router.push({
        pathname: router.route,
        query: {
          page: 1,
        }
      }).then()
    }else{
      router.push({
        pathname: router.route,
        query: {
          page: 1,
          status: e.target.value,
        }
      }).then()
    }
  }

  if(books !== null){
      return (
        <>
          <div className="col-span-2 flex justify-between">
          <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                   </div>
                  <input
                      onChange={onHandlerSearch}
                      value={searchTerm}
                      id="search"
                      className="block w-full bg-white py-2 pl-10 pr-3 border border-gray-400 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white focus:border-white sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                  />
              </div>
          </div>
            <select name="status"
                    value={status}
                    className="block bg-white py-2 px-3 border border-gray-400 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white focus:border-white sm:text-sm"
                    onChange={onHandlerSelect}
            >
              <option value=''>ALL</option>
              <option value="SWAPPING">SWAPPING</option>
              <option value="EXTRACTED">EXTRACTED</option>
              <option value="HOLD">HOLD</option>
              <option value="OPEN">OPEN</option>
            </select>
          </div>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
            {books.map((book) => (
              <BookWrapper key={book.id} book={book} />
            ))}
          </ul>
          <Pagination
            current={currentPage}
            href={href}
            booksPerPage={booksPerPage}
            totalBooks={total}
            paginate={paginate}
          />
        </>
      )
  }
  return null;
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
      <WithAuth>
        <Layout>
          {page}
        </Layout>
      </WithAuth>
  )
}
export default Index;
