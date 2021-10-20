import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Book } from '../types/Book'

const BookWrapper = ({book}: {book: Book}) => {
    const {id, title, image} = book;
    const src = image ? image : '';
    return (
        <li
            className='col-span-1 flex flex-col justify-between items-center text-center bg-white'
        >
            <Link href={`/book/${id}`}>
                <a className='w-full h-full'>
                    <div className='relative h-40'>
                        {src ? (<Image src={src} layout="fill" alt={`${title} poster`} className='object-contain pointer-events-none group-hover:opacity-75' />) : (<div className="h-full w-full bg-gray-100"></div>)} 
                    </div>
                    <div className=''>
                        <h3 className='mt-6 text-gray-900 text-sm font-medium'>{title}</h3>
                    </div>
                </a>
            </Link>
        </li>
    )
}
export default BookWrapper
