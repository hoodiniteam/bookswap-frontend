import React, {useEffect, useState} from "react";
import {useQuery} from "urql";
import {useRouter} from "next/router";
import withAuth from "../components/HOC";

const GetMe = `
query{
  me{
    user{
      books{
        id
        title
      }
    }
  }
}
`
type Books = [{
  id: string
  title: string
}]

const MyBooks = () => {
  const [result, ] = useQuery({
    query: GetMe
  })
  const router = useRouter();
  const [myBooks, setMyBooks] = useState<Books | null>(null);
  useEffect(()=>{
    if(result.data){
      setMyBooks(result.data.me.user.books)
    }
  }, [result])
  if(myBooks !== null){
    return(
      <>
        <h1>My books</h1>
        {result.fetching ? <p>Loading...</p>: ''}
        {result.error ? <p>Oh no... {result.error.message}</p>: ''}
        <ul className="border px-3 py-1.5 max-w-min">
          {myBooks.map((item, index)=>{
            return <li key={index}>
                    <a className='cursor-pointer' onClick={() => {router.push(`books/${item.id}`).then()}}>{item.title}</a>
                  </li>
          })}
        </ul>
      </>
    )
  }
  return null;
}
export default withAuth(MyBooks)