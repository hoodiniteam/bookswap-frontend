import React, {FormEvent, useEffect} from "react";
import { useQuery} from "urql";
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
    }
  }
}
`
// const UpdateBookMutation = `
// mutation($id:String!, $title:String, $description: String, $image: String, $status:BooksStatus){
//   updateBook(options:{id:$id, title:$title, description:$description, image: $image, status:$status}){
// \t\t    status
//   }
// }
// `

// enum BooksStatus {
//   DELIVERING,
//   EXTRACTED,
//   HOLD,
//   OPEN
// }
//
// enum BooksCondition {
//   BRANDNEW,
//   LIKENEW,
//   GOOD,
//   SATISFACTORY,
//   BAD,
//   TERRIBLE,
// }
//
// type BookData = {
//   condition: BooksCondition
//   description: string
//   id: string
//   image: string
//   status: BooksStatus
//   title: string
// }

const Book = () => {
  // const [book, setBook] = useState<BookData | null>(null)
  const router = useRouter();
  const [result,] = useQuery({
    query: GetBook,
    variables: {id: router.query.id}
  });
  // const [,updateBook] = useMutation(UpdateBookMutation)

  const {data, fetching, error} = result;
  useEffect(() => {
  }, [])
  const onChangeHandler = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) =>{
    console.log(e.target);
  }
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <>
      <form className="flex flex-col border-2 p-5 max-w-min">
        <div className='flex justify-between my-1.5'>
          Title:
          <input className="border" name="title" defaultValue={data.updateBook.book.title} onChange={onChangeHandler}/>
        </div>
        <div className='flex justify-between my-1.5'>
          Description:
          <input className="border" name="description" defaultValue={data.updateBook.book.description} onChange={onChangeHandler}/>
        </div>
        <div className='flex justify-between my-1.5'>
          Image:
          <input className="border" name="image" defaultValue={data.updateBook.book.image} onChange={onChangeHandler}/>
        </div>
        <div className='flex justify-between my-1.5'>
          Title:
          <select defaultValue={data.updateBook.book.condition} name="condition" className="border w-44" onChange={onChangeHandler}>
            <option>BRANDNEW</option>
            <option>LIKENEW</option>
            <option>GOOD</option>
            <option>SATISFACTORY</option>
            <option>BAD</option>
            <option>TERRIBLE</option>
          </select>
        </div>
        <button type="submit">Change</button>
      </form>
      <button onClick={() => router.push('/getBooks')}>Previous</button>
    </>
  )
}
export default Book