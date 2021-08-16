import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Link from "next/link";

type AppProps = {
  booksPerPage: number
  totalBooks: number
  paginate: (type:any) => void
  status: string
  href: (type: number) => string
};
const Pagination = ({booksPerPage, totalBooks, paginate, status, href}: AppProps) => {
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++){
    pageNumbers.push(i);
  }
  return(
    <div className="bg-white px-4 py-3 flex items-center mt-5 justify-between border-gray-200 sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              onClick={()=>paginate('previous')}
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {pageNumbers.map((page, indx, arr)=>{
             return <Link
                    href={href(page)}
                    key={page}
                    >
                      <a
                      onClick={()=>paginate(page)}
                      className={arr[0] === page ? "active pagItem" : "pagItem"}
                      >
                      {page}
                      </a>
                    </Link>
            })}
            <a
              onClick={()=>paginate('next')}
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
export default Pagination
