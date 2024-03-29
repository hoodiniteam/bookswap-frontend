import React from 'react';
import Link from 'next/link';
import { dateParsedYear } from '../helpers/dateTime';
import classNames from 'classnames';
import { Book } from '../generated/graphql.d';

const BookWrapper = ({
                       book,
                       size,
                       className,
                     }: {
  book: Pick<Book, 'id' | 'title' | 'image' | 'authors' | 'publishedDate'>;
  size?: string;
  className?: string;
}) => {
  const { id, title, image, authors, publishedDate } = book;
  const src = image ? image : '';
  const isSmall = size === 'small';
  return (
    <li
      className={classNames(
        {
          'group col-span-1 bg-white rounded': true,
          'shadow-md': isSmall,
        },
        className,
      )}
    >
      <Link href={`/book/${id}`}
            style={{ width: isSmall ? 'min-content' : 'auto', minWidth: 180 }}
            className={`block max-w-full w-full h-full ${isSmall ? 'p-4' : ''}`}>
        <div
          style={{ height: isSmall ? 'auto' : 224 }}
          className={`rounded flex relative ${
            isSmall
              ? ''
              : 'justify-center py-10 bg-gray-200 transition-colors duration-300 group-hover:bg-gray-300'
          }`}
        >
          <div className='relative'>
            {src && (
              <img
                src={"https://api.bookswap.ru" + src}
                alt={`${title} poster`}
                style={{
                  maxWidth: '100%',
                  height: 140,
                  boxShadow: '-7px 0px 6px -1px rgba(0, 0, 0, 0.2)',
                  objectFit: 'cover',
                }}
                className='h-full pointer-events-none transform duration-300 group-hover:scale-105'
              />
            )}
          </div>
          {/* {
              <div className="absolute rounded-tl-xl rounded-br-xl border flex items-center px-2 py-1 bg-white top-0 right-0">
                <BookOpenIcon className="h-5 w-5 mr-2" />
                {book.edition?.booksCount}
              </div>
            } */}
        </div>
        <div className='mt-4'>
          <div
            className={`text-gray-900 leading-5 font-medium ${
              isSmall ? 'text-base' : ''
            }`}
          >
            {title}
          </div>
          {((authors && authors.length > 0) || publishedDate) && (
            <>
              <div style={{ height: 1 }} className='bg-gray-200 w-20 my-2' />
              {authors && (
                <div className='text-xs text-gray-500'>
                  {authors.map((author, idx) => (
                    <span key={author} className='text-gray-500 text-sm'>
                        {author}
                      {idx === authors.length - 1 ? '' : ', '}
                      </span>
                  ))}
                </div>
              )}
              {publishedDate && (
                <div className='text-gray-500 text-sm'>
                  {dateParsedYear(publishedDate)}
                </div>
              )}
            </>
          )}
        </div>
      </Link>
    </li>
  );
};
export default BookWrapper;
