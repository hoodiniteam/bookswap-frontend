import React, { ReactElement, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'urql'
import { useRouter } from 'next/router'
import { WithAuth } from '../../../components/withAuth'
import Layout from '../../../components/layout'
import { BooksCondition, BooksStatus } from '../../../types/Book'
import { CloudinaryImage } from '../../../types/CloudinaryImage'
import {useQueryWrapper} from "../../../helpers/useQueryWrapper"
import Head from 'next/head'

const GetBook = `
query($id: String!){
  getBook(id: $id){
    book{
      description
        id
        image{
          url
        }
        title
        condition
        status
        creator{
          id  
          email
        }
        holder{
          id  
          email
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
        waiting{
          id
        }
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
const RemoveBookFromMyWaitingList = `
   mutation($id:String!){
    removeBookFromMyWaitingList(id: $id){
      status
      errors{
        message
      }
    }
  }
  `

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

type BookData = {
    description: string
    id: string
    image: CloudinaryImage
    title: string
    condition: BooksCondition
    status: BooksStatus
    creator: UserCreator
    holder: Holder
    expects: ListOfExpects
}

type Waiting = [{
    id: string
}]

const Book = ({title}: any) => {
    const router = useRouter()
    const [waiting, setWaiting] = useState<Waiting | null>(null)
    const [inList, setList] = useState<boolean | null>(null)
    const [myIdResult, reexecuteQuery] = useQueryWrapper({
        query: GetId,
    })
    const [result] = useQuery({
        query: GetBook,
        variables: { id: router.query.id },
    })
    const [, addToMyWaitingList] = useMutation(AddBookInMyWaitingListMutation)
    const [, removeFromMyWaitingList] = useMutation(RemoveBookFromMyWaitingList)
    const [book, setBook] = useState<BookData | null>(null)
    const [userId, setUserId] = useState(null)
    useEffect(() => {
        if (result.data) {
            setBook(result.data.getBook.book)
        }
        if (myIdResult.data) {
            setUserId(myIdResult.data.me.user.id)
            setWaiting(myIdResult.data.me.user.waiting)
        }
    }, [result, myIdResult])

    useEffect(() => {
        if (waiting) {
            for (let i = 0; i < waiting.length; i++) {
                if (waiting[i].id === router.query.id) {
                    setList(true)
                }else {
                    setList(false)
                }
            }
            if(waiting.length < 1) {
                setList(false)
            }
        }
    }, [waiting, router.query.id])

    const refresh = () => {
        reexecuteQuery({ requestPolicy: 'network-only' })
    }

    const addBookToList = () => {
        const variables = {
            id: router.query.id,
        }
        addToMyWaitingList(variables).then(refresh)
    }
    const removeBookFromList = () => {
        const variables = {
            id: router.query.id,
        }
        removeFromMyWaitingList(variables).then(refresh)
    }

    if (result.fetching) return <p>Loading...</p>
    if (result.error) return <p>Oh no... {result.error.message}</p>
    if (!result.fetching && book !== null && userId !== null) {
        return (
            <>
                <Head>
                    <title>{book.title}</title>
                </Head>
                <button
                    type='button'
                    className='inline-flex m-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    onClick={() => router.back()}
                >
                    Previous
                </button>
                {book.creator.id === userId ?
                    <button
                        onClick={() => router.push(`${router.asPath}/change`)}
                        type='button'
                        className='inline-flex m-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                        Edit
                    </button>
                    : ''}

                {book.creator.id !== userId ?
                    inList ?
                        <button
                            type='button'
                            className='inline-flex m-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            onClick={removeBookFromList}
                        >
                            Remove from waiting list
                        </button> :
                        <button
                            type='button'
                            className='inline-flex m-5 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            onClick={addBookToList}
                        >
                            Add to my waiting list
                        </button> : ''
                }
                <div className='grid grid-cols-6 grid-rows-1 border p-10'>
                    <div className='col-span-5'>
                        <h1 className='text-center text-4xl '>{book.title}</h1>
                        <h2 className='text-center mt-8'>Creator: {book.creator.email}</h2>
                    </div>
                    <div className='col-span-1'>
                        <img src={book.image.url} alt={'image'} />
                    </div>
                </div>
                <div className='grid grid-cols-6 grid-rows-1 p-8'>
                    <div className='col-span-5 flex flex-col pr-16'>
                        <span className='font-bold'>Description:</span>
                        <span>{book.description}</span>
                    </div>
                    <div className='col-span-1 flex flex-col'>
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

Book.getLayout = function getLayout(page: ReactElement) {
    return (
        <WithAuth>
            <Layout>
                {page}
            </Layout>
        </WithAuth>
    )
}

export default Book;
