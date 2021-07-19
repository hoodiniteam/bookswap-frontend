import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useMutation, useQuery} from "urql";
import {useRouter} from "next/router";
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

const UpdateBookMutation = `
mutation($id:String!, $title:String, $description: String, $image: String, $status:BooksStatus){
  updateBook(options:{id:$id, title:$title, description:$description, image: $image, status:$status}){
    status
    errors {
      message
      field
    }
  }
}
`
// eslint-disable-next-line no-unused-vars
enum BookStatus{
  // eslint-disable-next-line no-unused-vars
    DELIVERING,
    // eslint-disable-next-line no-unused-vars
    EXTRACTED,
    // eslint-disable-next-line no-unused-vars
    HOLD,
    // eslint-disable-next-line no-unused-vars
    OPEN
}

type UserCreator = {
  id: string,
  email: string
}

type BookData = {
  description: string
  id: string
  image: string
  title: string
  status: BookStatus
  creator: UserCreator
}

const Book = () => {
  const router = useRouter();
  const [myIdResult,] = useQuery({
    query: GetId
  })
  const [result,] = useQuery({
    query: GetBook,
    variables: {id: router.query.id}
  });
  const [,updateBook] = useMutation(UpdateBookMutation)
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
  const onSubmitHandler = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if(book){
      const variables = {
        id: router.query.id,
        title: book.title,
        description: book.description,
        image: book.image,
        status: book.status
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
            Title:
            <input className="border" name="title" defaultValue={book.title} onChange={onChangeHandler}/>
          </div>
          <div className='flex justify-between my-1.5'>
            Description:
            <input className="border" name="description" defaultValue={book.description} onChange={onChangeHandler}/>
          </div>
          <div className='flex justify-between my-1.5'>
            Image:
            <input className="border" name="image" defaultValue={book.image} onChange={onChangeHandler}/>
          </div>
          <div className='flex justify-between my-1.5'>
            Status:
            <select name="status" defaultValue={book.status} onChange={onChangeHandler}>
              <option value="DELIVERING">DELIVERING</option>
              <option value="EXTRACTED">EXTRACTED</option>
              <option value="HOLD">HOLD</option>
              <option value="OPEN">OPEN</option>
            </select>
          </div>
          {book.creator.id === userId ? <button type="submit">Change</button> : ''}

        </form>
        <button onClick={() => router.push('/getBooks')}>Previous</button>
      </>
    )
  }
  return null;
}
export default Book