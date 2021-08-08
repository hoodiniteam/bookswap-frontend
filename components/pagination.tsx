import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

type AppProps = {
  booksPerPage: number
  totalBooks: number
  paginate: (type:any) => void
};
const Pagination = ({booksPerPage, totalBooks, paginate}: AppProps) => {
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++){
    pageNumbers.push(i);
  }
  return(
    // <>
    //   <ul className="flex gap-1">
    //     {pageNumbers.map((item: number, indx, arr) =>{
    //       return <li key={item}>
    //               <a onClick={(e)=>paginate(item, e)}
    //                  className={item === arr[0] ? "px-3 py-1.5 bg-blue-400 text-white cursor-pointer pagItem active" : "px-3 py-1.5 bg-blue-400 text-white cursor-pointer pagItem"}>
    //                 {item}
    //               </a>
    //             </li>
    //         })}
    //   </ul>
    // </>
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          id="next"
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
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
             return <a
                    href="#"
                    key={page}
                    onClick={()=>paginate(page)}
                    className={arr[0] === page ? "active pagItem" : "pagItem"}
                    >
                    {page}
                    </a>
            })}
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {/*<a*/}
            {/*  href="#"*/}
            {/*  aria-current="page"*/}
            {/*  className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"*/}
            {/*>*/}
            {/*  1*/}
            {/*</a>*/}
            {/*<a*/}
            {/*  href="#"*/}
            {/*  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"*/}
            {/*>*/}
            {/*  2*/}
            {/*</a>*/}
            {/*<a*/}
            {/*  href="#"*/}
            {/*  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"*/}
            {/*>*/}
            {/*  3*/}
            {/*</a>*/}
            {/*<span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">*/}
            {/*  ...*/}
            {/*</span>*/}
            {/*<a*/}
            {/*  href="#"*/}
            {/*  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"*/}
            {/*>*/}
            {/*  8*/}
            {/*</a>*/}
            {/*<a*/}
            {/*  href="#"*/}
            {/*  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"*/}
            {/*>*/}
            {/*  9*/}
            {/*</a>*/}
            {/*<a*/}
            {/*  href="#"*/}
            {/*  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"*/}
            {/*>*/}
            {/*  10*/}
            {/*</a>*/}
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
