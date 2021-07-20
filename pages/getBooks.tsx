import React, {useEffect, useState} from "react";
import {useQuery} from "urql";
import withAuth from "../components/HOC";
import {useRouter} from "next/router";
import Pagination from "../components/pagination";

const GetBooksQuery =`
query($search: String, $status: BooksStatus, $offset: Float, $limit: Float){
  getBooks(search: $search, status: $status, offset: $offset, limit: $limit){
    count
    books{
      title
      id
    }
  }
}
`
const GetBooks = () => {
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0)
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const router = useRouter()
  const [result,] = useQuery({
  query: GetBooksQuery,
  variables: {search: search, limit:booksPerPage, offset: currentPage}
})
  useEffect(() => {
    if(result.data){
      setBooks(result.data.getBooks.books)
      setTotal(result.data.getBooks.count)
    }
  }, [result])
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  const onClickHandler = (e: {target: any}) => {
    router.push(`/books/${e.target?.id}`)
  }
    return (
      <div className=" px-5 py-3">
        <h1>Books</h1>
        <div>
          <input onChange={event => setSearch(event.target.value)} value={search} type='text' className="border w-64"/>
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