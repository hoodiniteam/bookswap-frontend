import React from 'react';
import { dateParsedYear } from '../helpers/dateTime';
import classNames from 'classnames';
import { Book } from '../generated/graphql.d';

const BookWrapperPromo = ({
                       book,
                       className,
                     }: {
  book: Pick<Book, 'id' | 'title' | 'image' | 'authors' | 'publishedDate'>;
  className?: string;
}) => {
  const { title, image, authors, publishedDate } = book;
  const src = image ? image : '';
  return (
    <li
      className={classNames("group col-span-1 bg-white rounded",
        className,
      )}
    >
      <div
            style={{ width: 'min-content', minWidth: 180 }}
            className={`block max-w-full w-full h-full p-4`}>
        <div
          style={{ height: 'auto' }}
          className={`rounded flex relative`}
        >
          <div className='relative'>
            {src && (
              <img
                src={src}
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
        </div>
        <div className='mt-4'>
          <div
            className={`text-gray-900 leading-5 font-medium text-base`}
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
      </div>
    </li>
  );
};
export default BookWrapperPromo;
