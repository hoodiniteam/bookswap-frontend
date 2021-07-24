import React,{useState, useEffect} from 'react';
import {useQuery} from "urql";
import { useRouter } from 'next/router'
import withAuth from '../../components/HOC'
const GetMe = `
query{
  me{
    user{
      books{
        title
        id
      }
    }
  }
}
`

type MyBooks = [{
    title: string,
    id: string
}]

const Books = () => {
  let keyId = 1
  const router = useRouter()
  const [myBooks, setMyBooks] = useState<MyBooks | null>(null)
  const [result, ] = useQuery({
    query: GetMe
  })
  useEffect(()=>{
    if(result.data){
        setMyBooks(result.data.me.user.books)
    }
  }, [result])

  if(myBooks !== null){
    return(
        <div className="px-8 py-8">
          <h1>My Books</h1>
          { result.fetching ? <h1>Loading...</h1> : '' }
          { result.error ? <h1>Opps something went wrong</h1> : '' }
          <ul className="inline-flex flex-col mt-5 border-2 p-3">
            {myBooks.map((book: any) => {
              return <ul
                        className="cursor-pointer"
                        onClick={() => router.push(`/books/${book.id}`)}
                        key={keyId+=1}
                        >
                        {book.title}
                    </ul>
            })}
          </ul>
        </div>
    )
  }
  return null
}

export default withAuth(Books)