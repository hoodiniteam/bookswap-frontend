import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'

type AppProps = {
    booksPerPage: number
    totalBooks: number
    paginate: (type: number | string) => void
    href: (type: number) => string
    current: number
};
const Pagination = ({ booksPerPage, totalBooks, paginate, current }: AppProps) => {
    const router = useRouter()
    const pageNumbers = new Array(Math.ceil(totalBooks / booksPerPage)).fill(true).map((_, idx) => idx + 1);
    return (
        <div className='bg-white px-4 py-3 flex items-center mt-5 justify-between border-gray-200 sm:px-6'>
            <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-center'>
                <div>
                    <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px' aria-label='Pagination'>
                        <button
                            onClick={() => paginate('previous')}
                            className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                        >
                            <span className='sr-only'>Previous</span>
                            <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                        </button>
                        {pageNumbers.map((page, indx) => (
                            <Link
                                href={{
                                    pathname: '/books',
                                    query: { ...router.query, page },
                                }}
                                key={page}>
                                <a className={current === indx + 1 ? 'active pagItem' : 'pagItem'}>
                                    {page}
                                </a>
                            </Link>
                        ))}
                        <button
                            onClick={() => paginate('next')}
                            className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                        >
                            <span className='sr-only'>Next</span>
                            <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default Pagination
