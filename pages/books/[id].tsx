import React from "react";
import {useQuery} from "urql";
import {useRouter} from "next/router";
const GetBook = `
query($id:String!){
  getBook(id:$id){
    book{
      title
      description
      id
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
     <div className="flex flex-col border-2 p-5 max-w-min">
       <span>Title: {data?.getBook.book.title}</span>
       <span>Description: {data?.getBook.book.description}</span>
       <span className="whitespace-nowrap">ID: {data?.getBook.book.id}</span>
     </div>
    </>
 )
}
export default Book