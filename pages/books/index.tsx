import React, {ChangeEvent, useEffect, useState} from "react";
import withAuth from "../../components/withAuth";
import {useRouter} from "next/router";
import Pagination from "../../components/pagination";
import {SearchIcon} from "@heroicons/react/solid";
import BookWrapper from "../../components/book-wrapper";
import useQueryWrapper from "../../helpers/useQueryWrapper";

const GetBooksQuery =`
query($search: String, $status: BooksStatus, $offset: Float, $limit: Float,){
  getBooks(search: $search, status: $status, offset: $offset, limit: $limit){
    count
    status
    books{
      title
      description
      id
      status
      image{
        url
      }
    }
  }
}
`

type CloudinaryImage = {
  url: string
}
const source = 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80'
type Books = [{
  title: string,
  description: string
  id: string
  image: CloudinaryImage
}]
const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState<string>('');
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0)
  const [books, setBooks] = useState<Books | []>([]);
  const [booksPerPage] = useState(5);
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
  const [data, fetching, error] = useQueryWrapper({
    query: GetBooksQuery,
    variables: variables()
  })

  useEffect(() => {
    if(data){
      console.log(data);
      setBooks(data.getBooks.books)
      setTotal(data.getBooks.count)
      setCurrentPage(1)
      setStatus('OPEN')
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
    }else if(!isNaN(page as number)){
          setCurrentPage(page as number)
    }
  }
  useEffect(() => {
    console.log(currentPage);
  }, [currentPage])
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
      const arr = document.querySelectorAll('.pagItem')
        arr.forEach((item, indx, arr)=> {
        item.classList.remove('active')
        arr[currentPage - 1].classList.add('active');
      })
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

  const onClickHandler = (e: {target: any}) => {
    router.push(`/books/${e.target?.id}`).then()
  }
  if(books !== null){
      return (
        <>
          <div className="col-span-2 flex justify-between">
            { fetching ? <h1>Loading...</h1> : '' }
            { error ? <h1>Opps something went wrong</h1> : '' }
            <div className="flex-1 flex justify-center mr-5">
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
            </div>
            <select name="status"
                    value={status}
                    className="block bg-white py-2 px-3 border border-gray-400 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white focus:border-white sm:text-sm"
                    onChange={onHandlerSelect}
            >
              <option value=''>ALL</option>
              <option value="DELIVERING">DELIVERING</option>
              <option value="EXTRACTED">EXTRACTED</option>
              <option value="HOLD">HOLD</option>
              <option value="OPEN">OPEN</option>
            </select>
          </div>
          <ul className="grid grid-cols-1 grid-rows-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:grid-rows-1 mt-5">
            {books.map((book, index) => (
              <BookWrapper
                key={ 1+index }
                src={book.image !== undefined && book.image !== null ? book.image.url : source}
                title={book.title}
                id={book.id}
                onClickHandler={onClickHandler}
              />
            ))}
          </ul>
          <Pagination
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
export default withAuth(Index)
