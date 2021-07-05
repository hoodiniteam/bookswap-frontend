import React, {FormEvent, useState} from "react";
import {useMutation} from "urql";
import {useRouter} from "next/router";
const CreateBookMutation = `
mutation($title: String!, $description: String!, $image: String!, $conditional:BooksCondition! ){
  createBook(options:{title: $title, description: $description, image: $image, condition: $conditional }){
    status
    book{
      id
    }
  }
}
`
const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [conditional, setConditional] = useState('BRANDNEW')
  const [, createBook] = useMutation(CreateBookMutation)
  const router = useRouter();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const variables = {title: title, description: desc, image: img, conditional: conditional};
    createBook(variables).then(res => {
      router.push(`/books/${res.data.createBook.book.id}`).then()
    })
  }

  return (
    <>
      <form className="border-2 max-w-min p-5 flex flex-col mx-auto mt-32" onSubmit={submit}>
        <h1>CreatingBook Form</h1>
        <input placeholder="title" className="border-2 w-40 my-2" onChange={(e) => setTitle(e.target.value)}/>
        <input placeholder="description" className="border-2 w-40 my-2" onChange={(e) => setDesc(e.target.value)}/>
        <input placeholder="image url" className="border-2 w-40 my-2" onChange={(e) => setImg(e.target.value)}/>
        <select value={conditional} className="border-2 my-2" onChange={event => setConditional(event.target.value)}>
          <option>BRANDNEW</option>
          <option>LIKENEW</option>
          <option>GOOD</option>
          <option>SATISFACTORY</option>
          <option>BAD</option>
          <option>TERRIBLE</option>
        </select>
        <button className="bg-blue-400 text-white">CreateBook</button>
      </form>
    </>
  )
}
export default CreateBook