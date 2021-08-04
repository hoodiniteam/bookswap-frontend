import React,{useState, useEffect} from 'react';
import {useQuery} from "urql";
import { useRouter } from 'next/router'
import withAuth from '../../components/HOC'
import SidebarForProfile from "../../components/sidebar-for-profile";
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

type MyBooksType = [{
    title: string,
    id: string
}]

const MyBooks = () => {
  let keyId = 1
  const router = useRouter()
  const [myBooks, setMyBooks] = useState<MyBooksType | null>(null)
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
        <SidebarForProfile>
          <div className="shadow sm:rounded-md sm:overflow-hidden px-5 py-8">
            { result.fetching ? <h1>Loading...</h1> : '' }
            { result.error ? <h1>Opps something went wrong</h1> : '' }
            <ul className="inline-flex flex-col mt-5 p-3">
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
        </SidebarForProfile>
    )
  }
  return null
}

export default withAuth(MyBooks)