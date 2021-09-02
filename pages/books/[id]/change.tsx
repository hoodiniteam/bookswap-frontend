import React, {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {useMutation, useQuery} from "urql";
import {useRouter} from "next/router";
import { WithAuth } from "../../../components/withAuth";
import Upload from "../../../components/upload-widget";
import {useForm} from "react-hook-form";
import Layout from "../../../components/layout";

const UpdateBookMutation = `
mutation($id: String!, $title: String!, $description: String!, $image: JSONObject!, $condition:BooksCondition! ){
  updateBook(options:{id: $id, title: $title, description: $description, image: $image, condition: $condition }){
    status
    book{
      id
    }
  }
}
`
const GetBook = `
  query($id:String!){
    getBook(id:$id){
      book{
        title
        description
        id
        image{
          asset_id
          public_id
          version
          version_id
          signature
          width
          height
          format
          resource_type
          created_at
         
          
          type
          etag
          placeholder
          url
          secure_url
          access_mode
          original_filename
          api_key
          path
          thumbnail_url
        }
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
enum BooksCondition {
  BAD,
  BRANDNEW,
  GOOD,
  LIKENEW,
  SATISFACTORY,
  TERRIBLE
}

type CloudyImage = {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  access_mode: string
  original_filename: string
  api_key: string
  path: string
  thumbnail_url: string
}

type Book ={
  id: string
  title: string,
  image: CloudyImage
  description: string,
  condition: BooksCondition
}
const Change = () => {
  const router = useRouter();
  const id = router.asPath.slice(7, -7)
  const [result,] = useQuery({
    query: GetBook,
    variables: {id: id}
  })
  const [book, setBook] = useState<Book | null>(null)
  const [image, setImage] = useState<CloudyImage | null>(null)
  const [, updateBook] = useMutation(UpdateBookMutation)
  const {register, handleSubmit, clearErrors, formState: {errors}} = useForm()
  useEffect(()=>{
    if(result.data){
      console.log(result)
      setBook(result.data.getBook.book)
    }
  }, [result])
  const submit = handleSubmit((data, event) => {
    event?.preventDefault();
    if(book){
      const variables = {
        title: book.title,
        description:book.description,
        image: book.image,
        condition: book.condition,
        id: book.id
      };
      updateBook(variables).then(res => {
        console.log(res);
        router.push(`/books/${res.data.updateBook.book.id}`).then()
      })
    }
  })
  const getInfo = (info: any) => {
    if(info){
      setTimeout(() => setImage(info), 100)
    }
  }

  useEffect(() => {
    if(image && book){
      setBook({...book, image: image})
    }
  },[image])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    if (book) {
      setBook({...book, [name]: value})
    }
    clearErrors(name)
  }
  if(book !== null){
    return (
      <>
        <form method="POST" style={{width: '800px', margin: "auto"}}
              onSubmit={submit}
        >
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Editing book</h3>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3">
                  <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <div className="mt-1 rounded-md shadow-sm flex">
                    <input
                      {...register('title', {required: true})}
                      onChange={onChangeHandler}
                      value={book.title}
                      type="text"
                      name="title"
                      id="title"
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 border py-1.5 px-2 rounded-none rounded-md sm:text-sm border-gray-300"
                    />
                  </div>
                  {errors.title ? <span className="text-red-500 text-xs">enter title</span> : ''}
                </div>

                <div className="col-span-3">
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      {...register('description', {required: true})}
                      value={book.description}
                      onChange={onChangeHandler}
                      id="description"
                      name="description"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full py-1.5 px-2 sm:text-sm border border-gray-300 rounded-md"
                    />
                  </div>
                  {errors.description ? <span className="text-red-500 text-xs">enter description</span> : ''}
                </div>

                <div className="col-span-3">
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    Condition
                  </label>
                  <div className="mt-1">
                    <select
                      value={book.condition}
                      onChange={onChangeHandler}
                      id="condition"
                      name="condition"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full py-1.5 px-2 sm:text-sm border border-gray-300 rounded-md"
                    >
                      <option value="BRANDNEW">BRANDNEW</option>
                      <option value="LIKENEW">LIKENEW</option>
                      <option value="GOOD">GOOD</option>
                      <option value="SATISFACTORY">SATISFACTORY</option>
                      <option value="BAD">BAD</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                  <div className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      <Upload
                        getInfo={getInfo}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </>
    )
  }
  return null;
}

Change.getLayout = function getLayout(page: ReactElement) {
  return (
      <WithAuth>
        <Layout>
          {page}
        </Layout>
      </WithAuth>
  )
}

export default Change;