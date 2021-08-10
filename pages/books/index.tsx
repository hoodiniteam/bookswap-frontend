import React, {ChangeEvent, useEffect, useState} from "react";
import {useQuery} from "urql";
import withAuth from "../../components/withAuth";
import {useRouter} from "next/router";
import Pagination from "../../components/pagination";
import LogOut from "../../helpers/LogOut";
import {SearchIcon} from "@heroicons/react/solid";

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
    }
  }
}
`
const source = 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80'
type Books = [{
  title: string,
  description: string
  id: string
}]
const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('OPEN');
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
  const [result,] = useQuery({
  query: GetBooksQuery,
  variables: variables()
  })
  useEffect(() => {
    if(result.data){
        if(result.error?.message.includes('Access denied!')){
            LogOut()
        }else{
            setBooks(result.data.getBooks.books)
            setTotal(result.data.getBooks.count)
        }
    }
  }, [result])
  const paginate = (page: number | string) => {
    let current = currentPage;
    if(page === 'previous' && currentPage > 1){
      current--
      setCurrentPage(current)
    }if(page === 'next' && currentPage <= total/booksPerPage ){
      current++
      setCurrentPage(current)
    }else if(!isNaN(page as number)){
          setCurrentPage(page as number)
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
  const onHandlerSelect = (e: ChangeEvent<HTMLSelectElement>) => {
      setStatus(e.target.value)
      setCurrentPage(1)
  }

  useEffect(()=>{
    document.querySelectorAll('.pagItem').forEach((item, indx, arr)=> {
      item.classList.remove('active')
      arr[currentPage - 1].classList.add('active');
      setOffset((currentPage - 1) * booksPerPage)
    })
  },[currentPage])
  const onClickHandler = (e: {target: any}) => {
    router.push(`/books/${e.target?.id}`).then()
  }
  if(books !== null){
      return (
        <>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="col-span-2 flex justify-between">
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
                      defaultValue={'OPEN'}
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
            { result.fetching ? <h1>Loading...</h1> : '' }
            { result.error ? <h1>Opps something went wrong</h1> : '' }
            {books.map((book, index) => (
              <li
                key={1+index}
                className="col-span-3 col-start-2  flex flex-col text-center bg-white rounded-lg shadow "
              >
                <h3 className="mt-6 text-gray-900 text-sm font-medium">{book.title}</h3>
                <div className="grid grid-cols-3 col-span-3 p-5">
                  <div className="col-span-1">
                  <img src={source} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                  </div>
                  <div className="col-span-2 ml-5 px-5 break-words">
                    <span>{book.description}</span>
                  </div>
                </div>
                <div className="mx-auto my-6 flex">
                  <button
                    id={book.id}
                    onClick={onClickHandler}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Show book
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Pagination booksPerPage={booksPerPage} totalBooks={total} paginate={paginate} />
        </>
      )
  }
  return null;
}
export default withAuth(Index)
