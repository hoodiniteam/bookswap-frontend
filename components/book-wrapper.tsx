import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Book } from '../types/Book'
import { dateParsedYear } from '../helpers/dateTime';

const BookWrapper = ({book}: {book: Book}) => {
  console.log(book);
  const {id, title, image, authors, publishedDate} = book;
  const src = image ? image : '';
  return (
    <li
      className='font-serif col-span-1 flex flex-col justify-between items-center bg-white'
    >
      <Link href={`/book/${id}`}>
        <a className='w-full h-full'>
          <div className='bg-gray-100 rounded-md py-4 relative h-40 lg:h-52'>
            <div className="relative h-full w-full">
              {src ? (<Image src={src} layout="fill" alt={`${title} poster`} className='object-contain pointer-events-none group-hover:opacity-75' />) : (<div className="h-full w-full bg-gray-100"/>)}
            </div>
          </div>
          <div className=''>
            <h3 className='mt-6 text-gray-900 font-semibold'>{title}</h3>
            <div className="flex mt-2">
              {authors && authors.map((author, idx) => (
                <span key={author} className='text-gray-500 text-sm'>{author}{idx === authors.length - 1 ? '' : ', '}</span>
              ))}
            </div>
            {
              publishedDate && (
                <div className='text-gray-500 text-sm'>
                  {dateParsedYear(publishedDate)}
                </div>
              )
            }
          </div>
        </a>
      </Link>
    </li>
  )
}
export default BookWrapper
