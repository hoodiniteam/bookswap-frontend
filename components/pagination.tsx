import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router';
const Pagination = ({ limit, total }: any) => {
    const router = useRouter();
    const {query, pathname} = router;
    const currentPage = query.page ? Number(query.page) : 1;
    const max = Math.ceil(total / limit);
    const pages = new Array(max).fill(true).map((_, idx) => idx + 1);
    return (
        <div className='bg-white mt-4 rounded-lg shadow px-5 py-6 sm:px-6'>
            <div className='sm:flex-1 sm:flex sm:items-center sm:justify-center'>
                <div>
                    <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px' aria-label='Pagination'>
                        {
                            currentPage > 1 && <Link
                                href={`${pathname}?page=${currentPage - 1}`}>
                                <a
                                    className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                                >
                                    <span className='sr-only'>Previous</span>
                                    <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                                </a>
                            </Link>
                        }
                        <div>
                            {pages.map((page) => (
                                <Link
                                    href={`${pathname}?page=${page}`}
                                    key={page}>
                                    <a className={`pagItem${currentPage === page ? ' active' : ''}`}>
                                        {page}
                                    </a>
                                </Link>
                            ))}
                        </div>
                        {
                            currentPage < max && <Link
                                href={`${pathname}?page=${currentPage + 1}`}>
                                <a
                                    className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                                >
                                    <span className='sr-only'>Next</span>
                                    <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                                </a>
                            </Link>
                        }
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default Pagination
