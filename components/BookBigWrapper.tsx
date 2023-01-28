import React from 'react';
import Link from 'next/link';
import { dateParsedYear } from '../helpers/dateTime';
import classNames from 'classnames';
import { BookOpenIcon } from '@heroicons/react/outline';
import { Book, BookEdition } from '../generated/graphql.d';

const BookWrapper = ({
  book,
  size,
  className,
}: {
  book: Omit<Partial<BookEdition>, 'books' | 'expects'>;
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
          'group list-none col-span-1 bg-white rounded': true,
          shadow: isSmall,
        },
        className
      )}
    >
      <div className="block sm:w-[300px] max-w-full mx-auto">
        <div
          style={{ height: 300 }}
          className="rounded flex relative justify-center py-10 bg-gray-200 transition-colors duration-300 group-hover:bg-gray-300"
        >
          <div className="relative">
            {src && (
              <img
                src={"https://api.bookswap.ru" + src}
                alt={`${title} poster`}
                style={{
                  height: 210,
                  boxShadow: '-7px 0px 6px -1px rgba(0, 0, 0, 0.2)',
                }}
                className="h-full pointer-events-none transform duration-300 group-hover:scale-105"
              />
            )}
          </div>
        </div>
        <div className="mt-4">
          {((authors && authors.length > 0) || publishedDate) && (
            <>
              <div style={{ height: 1 }} className="bg-gray-200 w-20 my-2" />
              {authors && (
                <div className="text-sm text-gray-500">
                  <span className="mr-1">Автор:</span>
                  {authors.map((author, idx) => (
                    <span key={author} className="text-gray-500 font-medium">
                      {author}
                      {idx === authors.length - 1 ? '' : ', '}
                    </span>
                  ))}
                </div>
              )}
              {publishedDate && (
                <div className="text-gray-500 text-sm">
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
export default BookWrapper;
