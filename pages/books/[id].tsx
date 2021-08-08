import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useMutation, useQuery} from "urql";
import {useRouter} from "next/router";
import withAuth from "../../components/HOC";
const GetBook = `
  query($id:String!){
    getBook(id:$id){
      book{
        title
        description
        image
        id
        condition
        status
        creator{
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

  const UpdateBookMutation = `
  mutation($id:String!, $title:String, $description: String, $image: String, $status: BooksStatus, $condition: BooksCondition){
    updateBook(options:{id:$id, title:$title, description:$description, image: $image, status:$status, condition: $condition}){
      status
      errors {
        message
        field
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
    id: string,
    firstName: string
  }

  type ListOfExpects = [{
    email: string
  }]

  type BookData = {
    description: string
    id: string
    image: string
    title: string
    condition: BooksCondition
    status: BookStatus
    creator: UserCreator
    expects: ListOfExpects
  }

  const Book = () => {
    const router = useRouter();
    let key = 1;
    const [myIdResult,] = useQuery({
      query: GetId
    })
    const [result,] = useQuery({
      query: GetBook,
      variables: {id: router.query.id}
    });
    const [,updateBook] = useMutation(UpdateBookMutation)
    const [, addToMyWaitingList] = useMutation(AddBookInMyWaitingListMutation)
    const [book, setBook] = useState<BookData | null>(null)
    const [userId, setUserId] = useState(null)
    useEffect(() => {
      if(result.data){
        setBook(result.data.getBook.book)
      }
      if(myIdResult.data){
        setUserId(myIdResult.data.me.user.id)
      }
    }, [result, myIdResult])
    if (result.fetching) return <p>Loading...</p>;
    if (result.error) return <p>Oh no... {result.error.message}</p>;
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
      const {name, value} = e.target;
      if(book){
        setBook({...book, [name]: value})
      }
    }
    const addBookToList = () => {
      const variables = {
        id: router.query.id
      }
      addToMyWaitingList(variables).then(res => {
        console.log(res);
      })
    }
    const onSubmitHandler = (e: FormEvent<HTMLElement>) => {
      e.preventDefault();
      if(book){
        const variables = {
          id: router.query.id,
          title: book.title,
          description: book.description,
          image: book.image,
          status: book.status,
          condition: book.condition
        }
        updateBook(variables).then(res=>{
          console.log(res);
        })
      }

    }
    if(!result.fetching && book !== null && userId !== null){
      return (
        <>
          <form className="flex flex-col border-2 p-5 max-w-min" onSubmit={onSubmitHandler}>
            <div className='flex justify-between my-1.5'>
              Creator Name:
              <h2 className="font-bold">{book.creator.firstName}</h2>
            </div>
            <div className='flex justify-between my-1.5'>
              Title:
              <input className="border" name="title" value={book.title} onChange={onChangeHandler}/>
            </div>
            <div className='flex justify-between my-1.5'>
              Description:
              <input className="border" name="description" value={book.description} onChange={onChangeHandler}/>
            </div>
            <div className='flex justify-between my-1.5'>
              Image:
              <input className="border" name="image" value={book.image} onChange={onChangeHandler}/>
            </div>
            <div className='flex justify-between my-1.5'>
              Status:
              <select name="status" value={book.status} onChange={onChangeHandler}>
                <option value="HOLD">HOLD</option>
                <option value="OPEN">OPEN</option>
              </select>
            </div>
            <div className='flex justify-between my-1.5'>
              Condition:
              <select name="condition" value={book.condition} onChange={onChangeHandler}>
                <option value="BRANDNEW">BRANDNEW</option>
                <option value="LIKENEW">LIKENEW</option>
                <option value="GOOD">GOOD</option>
                <option value="SATISFACTORY">SATISFACTORY</option>
                <option value="BAD">BAD</option>
                <option value="TERRIBLE">TERRIBLE</option>
              </select>
            </div>
            <div className='flex justify-between my-1.5'>
              Expects:
             <div>
               {book.expects.map(user => {
                 return <span key={key+=1}>{user.email}</span>
               })}
             </div>
            </div>
            {book.creator.id === userId ? <button type="submit">Save</button> : ''}
          </form>
          <div className="flex justify-between w-72">
            <button onClick={() => router.back()}>Previous</button>
            {book.creator.id === userId ? "" : <button onClick={addBookToList}>Add to my waiting list</button>}
          </div>
        </>
      )
    }
    return null;
  }
  export default withAuth(Book)
