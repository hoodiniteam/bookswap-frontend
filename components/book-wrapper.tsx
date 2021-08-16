import React from "react";

type AppProps = {
  src: string
  title: string
  id: string
  onClickHandler: (e: { target: any}) => void
};

const BookWrapper = ({src, title, id, onClickHandler}: AppProps) => {

  return(
    <li
      className="col-span-1 flex flex-col justify-between text-center bg-white rounded-lg shadow "
    >
      <div className="p-5">
        <div className="flex flex-col">
          <img src={src} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
        </div>
        <div className="px-5 break-words">
          <h3 className="mt-6 text-gray-900 text-sm font-medium">{title}</h3>
        </div>
      </div>
      <div className="mx-auto my-6 flex">
        <button
          id={id}
          onClick={onClickHandler}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Show book
        </button>
      </div>
    </li>
  )
}
export default BookWrapper