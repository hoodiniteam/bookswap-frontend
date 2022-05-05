import React from 'react'
import { EditionFragment } from '../generated/graphql';

const BookWrapper = ({book}: {book: EditionFragment}) => {
  const {title, image} = book;
  const src = image ? image : '';
  return (
    <div style={{width: 'auto'}} className={`flex-shrink-0 block max-w-full w-full h-full p-4`}>
      <div style={{height: 'auto'}} className={`rounded flex relative`}>
        <div className="relative">
          {src && (<img src={src} alt={`${title} poster`} style={{height: 140, boxShadow: "-7px 0px 6px -1px rgba(0, 0, 0, 0.2)"}} className='h-full pointer-events-none transform duration-300 group-hover:scale-105' />)}
        </div>
      </div>
    </div>
  )
}
export default BookWrapper
