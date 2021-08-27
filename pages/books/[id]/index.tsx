import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useMutation, useQuery} from "urql";
import {useRouter} from "next/router";
import withAuth from "../../../components/withAuth";
const GetBook = `
  query($id:String!){
    getBook(id:$id){
      book{
        title
        description
        image{
        url
        }
        id
        condition
        status
        creator{
          email
          id
          firstName 
        }
        holder{
          email
          id
          firstName
        }
        expects{
          email
        }
      }
    }
  }
  `
  const GetId = `
  query{
    me{
      user{
        id
      }
    }
  }
  `
  const AddBookInMyWaitingListMutation = `
  mutation($id:String!){
    addBookToMyWaitingList(id: $id){
      status
      errors{
        message
      }
    }
  }
  `

  enum BookStatus{
      DELIVERING,
      EXTRACTED,
      HOLD,
      OPEN
  }

  enum BooksCondition {
    BAD,
    BRANDNEW,
    GOOD,
    LIKENEW,
    SATISFACTORY,
    TERRIBLE
  }
  type UserCreator = {
    email: string
    id: string,
    firstName: string
  }
  type Holder = {
    email: string
    id: string,
    firstName: string
  }

  type ListOfExpects = [{
    email: string
  }]

type CloudinaryImage = {
  url: string
}

  type BookData = {
    description: string
    id: string
    image: CloudinaryImage
    title: string
    condition: BooksCondition
    status: BookStatus
    creator: UserCreator
    holder: Holder
    expects: ListOfExpects
  }

  const Book = () => {
    const router = useRouter();
    // let key = 1;
    const [myIdResult,] = useQuery({
      query: GetId
    })
    const [result,] = useQuery({
      query: GetBook,
      variables: {id: router.query.id}
    });
    const [, addToMyWaitingList] = useMutation(AddBookInMyWaitingListMutation)
    const [book, setBook] = useState<BookData | null>(null)
    const [userId, setUserId] = useState(null)
    useEffect(() => {
      if(result.data){
        console.log(result)
        setBook(result.data.getBook.book)
      }
      if(myIdResult.data){
        setUserId(myIdResult.data.me.user.id)
      }
    }, [result, myIdResult])

    const addBookToList = () => {
      const variables = {
        id: router.query.id
      }
      addToMyWaitingList(variables).then(res => {
        console.log(res);
      })
    }
    if (result.fetching) return <p>Loading...</p>;
    if (result.error) return <p>Oh no... {result.error.message}</p>;
    if(!result.fetching && book !== null && userId !== null){
      return (
        <>
          <button
            type="button"
            className="inline-flex m-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => router.back()}
          >
            Previous
          </button>
          {book.creator.id === userId ?
            <button
              onClick={()=> router.push(`${router.asPath}/change`)}
              type="button"
              className="inline-flex m-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
            : ''}
            {book.creator.id === userId ? "" :
              <button
                type="button"
                className="inline-flex m-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={addBookToList}
              >
                Add to my waiting list
              </button>
            }
          <div className="grid grid-cols-6 grid-rows-1 border p-10">
            <div className="col-span-5">
              <h1 className="text-center text-4xl ">{book.title}</h1>
              <h2 className="text-center mt-8">Creator: {book.creator.email}</h2>
            </div>
            <div className="col-span-1">
              <img src={book.image.url} />
            </div>
          </div>
          <div className="grid grid-cols-6 grid-rows-1 p-8">
            <div className="col-span-5 flex flex-col pr-16">
              <span className="font-bold">Description:</span>
              <span>{book.description}</span>
            </div>
            <div className="col-span-1 flex flex-col">
              <span>status: {book.status}</span>
              <span>condition: {book.condition}</span>
              <span>holder: {book.holder.email}</span>
            </div>
          </div>
        </>
      )
    }
    return null
  }
  export default withAuth(Book)
