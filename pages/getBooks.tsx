import React, { useState } from "react";
import {useQuery} from "urql";
import withAuth from "../components/HOC";
import {useRouter} from "next/router";

const GetBooksQuery =`
query($search: String){
  getBooks(search: $search){
    books{
      title
      id
    }
  }
}
`

const GetBooks = () => {
const [search, setSearch] = useState('');
  const router = useRouter()
  const [result,] = useQuery({
  query: GetBooksQuery,
  variables: {search: search},
})
  const {data, fetching, error} = result;
  const onClickHandler = (e: {target: any}) => {
    router.push(`/books/${e.target?.id}`)
  }
    return (
      <div className=" px-5 py-3">
        <h1>Books</h1>
        <div>
          <input onChange={event => setSearch(event.target.value)} value={search} type='text' className="border w-64"/>
        </div>
        { fetching ? <h1>Loading...</h1> : '' }
        { error ? <h1>Opps something went wrong</h1> : '' }
        <div className="flex flex-col">
        {data?.getBooks.books ? data?.getBooks.books.map(( item: any, indx: number  ) => {
          return <span className="cursor-pointer" onClick={onClickHandler} id={item.id} key={indx}>{item.title}</span>
        }) : ''}
        </div>
      </div>
    )
}

export default withAuth(GetBooks)