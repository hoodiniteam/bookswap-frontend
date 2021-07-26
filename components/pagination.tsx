import React from "react";
type AppProps = {
  booksPerPage: number
  totalBooks: number
  paginate: Function
};
const Pagination = ({booksPerPage, totalBooks, paginate}: AppProps) => {
  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++){
    pageNumbers.push(i);
  }
  return(
    <>
      <ul className="flex gap-1">
        {pageNumbers.map((item: number, indx, arr) =>{
          return <li key={item}>
                  <a onClick={(e)=>paginate(item, e)}
                     className={item === arr[0] ? "px-3 py-1.5 bg-blue-400 text-white cursor-pointer pagItem active" : "px-3 py-1.5 bg-blue-400 text-white cursor-pointer pagItem"}>
                    {item}
                  </a>
                </li>
            })}
      </ul>
    </>
  )
}
export default Pagination