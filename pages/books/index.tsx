import React, {ChangeEvent, useEffect, useState} from "react";
import {useQuery} from "urql";
import withAuth from "../../components/HOC";
import {useRouter} from "next/router";
import Pagination from "../../components/pagination";
import LogOut from "../../helpers/LogOut";

const GetBooksQuery =`
query($search: String, $status: BooksStatus, $offset: Float, $limit: Float,){
  getBooks(search: $search, status: $status, offset: $offset, limit: $limit){
    count
    status
    books{
      title
      id
      status
    }
  }
}
`
const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState();
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0)
  const [books, setBooks] = useState([]);
  const [booksPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const router = useRouter()
  const variables = () => {
      let obj = {
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
  const paginate = (pageNumber: number, e: MouseEvent | ChangeEvent) => {
      document.querySelectorAll('.pagItem').forEach((item, indx, arr)=> {
          item.classList.remove('active')
          arr[pageNumber - 1].classList.add('active');
      })
      // @ts-ignore
      e.target.classList.add('active')
      setCurrentPage(pageNumber)
      setOffset((pageNumber - 1) * booksPerPage)
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
          // @ts-ignore
          setStatus(e.target.value)
  }

  const onClickHandler = (e: {target: any}) => {
    router.push(`/books/${e.target?.id}`).then()
  }
  if(books !== null){
      return (
          <div className=" px-5 py-3">
              <div className="inline-flex w-96 justify-between">
                  <h1>Books</h1>
                  <button onClick={() => router.push('/home')}>To HomePage</button>
              </div>
              <div className="flex w-96 justify-between">
                  <div>
                      <input onChange={onHandlerSearch} value={searchTerm} type='text' className="border w-60"/>
                  </div>
                  <select name="status" className="border w-32" onChange={onHandlerSelect}>
                      <option value=''>ALL</option>
                      <option value="DELIVERING">DELIVERING</option>
                      <option value="EXTRACTED">EXTRACTED</option>
                      <option value="HOLD">HOLD</option>
                      <option value="OPEN">OPEN</option>
                  </select>
              </div>
              { result.fetching ? <h1>Loading...</h1> : '' }
              { result.error ? <h1>Opps something went wrong</h1> : '' }
              <div className="flex flex-col">
                  {!result.fetching && books ? books.map(( item: any, indx: number  ) => {
                      return <span className="cursor-pointer" onClick={onClickHandler} id={item.id} key={indx}>{item.title}</span>
                  }) : null}
              </div>
              <ul className="flex justify-between w-20">
                  <Pagination booksPerPage={booksPerPage} totalBooks={total} paginate={paginate} />
              </ul>
          </div>
      )
  }
  return null;
}
export default withAuth(Index)