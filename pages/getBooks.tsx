import React, {useEffect, useState} from "react";
import {useQuery} from "urql";
import withAuth from "../components/HOC";
import {useRouter} from "next/router";
import Pagination from "../components/pagination";

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
const GetBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0)
  const [books, setBooks] = useState([]);
  const [booksPerPage] = useState(10);
  const [offset, setOffset] = useState(0)
  const router = useRouter()
  const [result,] = useQuery({
  query: GetBooksQuery,
  variables: {search: search, offset:offset, limit: booksPerPage}
})
  useEffect(() => {
    if(result.data){
      setBooks(result.data.getBooks.books)
      setTotal(result.data.getBooks.count)
    }
  }, [result])
  const paginate = (pageNumber: number) => {
    setOffset((pageNumber - 1) * booksPerPage)
  }
  const onHandlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
      if(e.target.value.length >= 3){
        setSearch(searchTerm)
      }else{
        setSearch('')
      }
  }

  const onClickHandler = (e: {target: any}) => {
    router.push(`/books/${e.target?.id}`)
  }
    return (
      <div className=" px-5 py-3">
        <h1>Books</h1>
        <div>
          <input onChange={onHandlerSearch} value={searchTerm} type='text' className="border w-64"/>
        </div>
        { result.fetching ? <h1>Loading...</h1> : '' }
        { result.error ? <h1>Opps something went wrong</h1> : '' }
        <div className="flex flex-col">
          {!result.fetching && books !== null ? books.map(( item: any, indx: number  ) => {
            return <span className="cursor-pointer" onClick={onClickHandler} id={item.id} key={indx}>{item.title}</span>
          }) : null}
        </div>
          <ul className="flex justify-between w-20">
           <Pagination booksPerPage={booksPerPage} totalBooks={total} paginate={paginate} />
          </ul>
      </div>
    )
}
export default withAuth(GetBooks)