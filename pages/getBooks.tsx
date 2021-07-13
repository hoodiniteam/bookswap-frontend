import React, { useState } from "react";
import {useQuery} from "urql";

const GetBooksQuery =`
query($search: String){
  getBooks(search: $search){
    books{
      title
    }
  }
}
`

const GetBooks = () => {
  let id = 1;
const [search, setSearch] = useState('');
  const [result,] = useQuery({
  query: GetBooksQuery,
  variables: {search: search},
})
  const {data, fetching, error} = result;
  if(fetching) return <h1>Loading...</h1>
  if(error) return <h1>Opps something went wrong</h1>

    const {books} = data.getBooks
    return (
      <div className=" px-5 py-3">
        <h1>Books</h1>
        <div>
          <input onChange={event => setSearch(event.target.value)} value={search} type='text' className="border w-64"/>
        </div>
          <div className="flex flex-col">
            {books.map((item: any, index: number)=>{
              console.log(index)
             return <span key={id=id+1}>{item.title}</span>
            })}
          </div>
      </div>
    )
}

export default GetBooks