import React from "react";
import {useQuery} from "urql";
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

const Book = () => {
  const router = useRouter();
  const [result, ] = useQuery({
    query: GetBook,
    variables: {id: router.query.id}
  });
  const {data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return(
    <>
     <form className="flex flex-col border-2 p-5 max-w-min">
       <div className='flex justify-between my-1.5'>
         Title:
         <input className="border" defaultValue={data?.getBook.book.title}/>
       </div>
       <div className='flex justify-between my-1.5'>
         Description:
         <input className="border" defaultValue={data?.getBook.book.description}/>
       </div>
       <div className='flex justify-between my-1.5'>
         Image:
         <input className="border" defaultValue={data?.getBook.book.image}/>
       </div>
       <div className='flex justify-between my-1.5'>
       Title:
       <select defaultValue={data?.getBook.book.conditional} className="border w-44">
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
      <button onClick={()=>router.push('/getBooks')}>Previous</button>
    </>
 )
}
export default Book