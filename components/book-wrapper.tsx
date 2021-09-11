import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Book } from '../types/Book'
import { Badge } from './Badge'

const placeholder = 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80'

const BookWrapper = ({book}: {book: Book}) => {
    const {id, title, image, status} = book;
    const src = image ? image.url : placeholder;
    return (
        <li
            className='col-span-1 flex flex-col justify-between items-center py-5 text-center bg-white rounded-lg shadow '
        >
            <Link href={`/books/${id}`}>
                <a className='p-5'>
                    <div className='relative h-72'>
                        <Image src={src} layout="fill" alt={`${title} poster`} className='object-cover pointer-events-none group-hover:opacity-75' />
                    </div>
                    <div className='px-5'>
                        <h3 className='mt-6 text-gray-900 text-sm font-medium'>{title}</h3>
                    </div>
                </a>
            </Link>
            <Badge status={status} />
        </li>
    )
}
export default BookWrapper
