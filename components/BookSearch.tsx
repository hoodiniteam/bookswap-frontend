import React from 'react';
import { dateParsedYear } from '../helpers/dateTime';
import { useClient } from 'urql';
import { loader } from 'graphql.macro';
import { BookEdition, GetEditionsSearchQuery } from '../generated/graphql';
const getEditionsSearch = loader('../graphql/GetEditionsSearchQuery.graphql');

import { useState } from 'react';
import { CheckIcon, SearchIcon } from '@heroicons/react/solid';
import { RefreshIcon } from '@heroicons/react/outline';
import { Combobox } from '@headlessui/react';
import classNames from 'classnames';
import { pipe, subscribe } from 'wonka';

const SimpleOptionView = ({ book }: { book: BookEdition }) => {
  return (
    <Combobox.Option
      value={book}
      className={({ active }) =>
        classNames(
          'relative cursor-default select-none py-2 pl-3 pr-9',
          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
        )
      }
    >
      {({ active, selected }) => (
        <>
          <div className="flex items-center">
            <span
              className={classNames(
                'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                !book.virtual ? 'bg-green-400' : 'bg-gray-200'
              )}
              aria-hidden="true"
            />
            <span className={classNames('ml-3 truncate font-medium')}>
              {book.title}
              <span className="sr-only">
                {' '}
                is {!book.virtual ? 'exist' : 'not exist'}
              </span>
            </span>
          </div>

          {selected && (
            <span
              className={classNames(
                'absolute inset-y-0 right-0 flex items-center pr-4',
                active ? 'text-white' : 'text-indigo-600'
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
        </>
      )}
    </Combobox.Option>
  );
};

export const BookPreview = ({ book }: { book: Partial<BookEdition> }) => {
  console.log(book);
  return (
    <div className="flex items-center">
    <span
      className={classNames(
        'inline-block h-2 w-2 flex-shrink-0 rounded-full',
        !book.virtual ? 'bg-green-400' : 'bg-gray-200'
      )}
      aria-hidden="true"
    />
      <div className="ml-2 bg-gray-100">
        <div className="w-20">
          <img className="h-28 w-20 object-contain" src={process.env.IMAGES_URL || "" + book?.image || ''} />
        </div>
      </div>
      <div className={'ml-3 shrink flex flex-col'}>
      <span className={classNames('leading-5 text-base mb-1 font-medium')}>
        {book.title}
      </span>
        {book.authors ||
          (book.publishedDate && (
            <span className="text-xs">
            {book.authors}, {dateParsedYear(book.publishedDate)}
          </span>
          ))}
      </div>
    </div>
  )
};

const PreviewOptionView = ({ book }: { book: BookEdition }) => {
  return (
    <Combobox.Option
      value={book}
      className={({ active }) =>
        classNames(
          'relative cursor-default select-none py-2 pl-3 pr-9',
          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
        )
      }
    >
      {({ active, selected }) => (
        <>
          <BookPreview book={book} />

          {selected && (
            <span
              className={classNames(
                'absolute inset-y-0 right-0 flex items-center pr-4',
                active ? 'text-white' : 'text-indigo-600'
              )}
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
        </>
      )}
    </Combobox.Option>
  );
};

export const BookSearch = ({
  placeholder,
  onSearchComplete,
  onChange,
  preview,
  children,
}: {
  placeholder: string;
  onSearchComplete?: (value: string) => void;
  onChange: (args: any) => void;
  preview?: boolean;
  children?: any;
}) => {
  const [query, setQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookEdition>(
    {} as BookEdition
  );
  const [booksResult, setBooksResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const client = useClient();

  const loadOptions = (inputValue: string) => {
    if (inputValue.length <= 3) {
      setBooksResult([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    const { unsubscribe } = pipe(
      client.query<GetEditionsSearchQuery>(
        getEditionsSearch,
        {
          search: inputValue,
        },
        {
          requestPolicy: 'network-only',
        }
      ),
      subscribe((result) => {
        console.log(result); // OperationResult
        const editions = result.data?.getEditionsSearch?.editions;
        if (editions) {
          if (onSearchComplete) {
            onSearchComplete(inputValue);
          }
          if (editions?.length) {
            setBooksResult(editions);
          } else {
            setBooksResult([]);
          }
        }
        setLoading(false);
        unsubscribe();
      })
    );
  };

  const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    await loadOptions(event.target.value);
  };

  const selectHandler = (value: BookEdition) => {
    onChange(value);
    setSelectedBook(value);
  };

  return (
    <Combobox as="div" value={selectedBook} onChange={selectHandler}>
      <div className="relative">
        <Combobox.Input
          placeholder={placeholder}
          className="w-full rounded-md border-none bg-white py-2 pl-3 pr-10 shadow focus:ring focus:ring-indigo-500"
          onChange={changeHandler}
          displayValue={(book: BookEdition) => book.title || query}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          {loading ? (
            <RefreshIcon
              className="animate-spin h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          ) : (
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          )}
        </Combobox.Button>

        {(booksResult.length > 0 || (query.length > 3 && children))  && (
          <Combobox.Options
            style={preview ? { maxHeight: 'calc(100vh - 300px)' } : {}}
            className={classNames(
              'absolute z-10 mt-1 w-full overflow-y-auto overflow-x-hidden rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
              {
                'max-h-60': !preview,
              }
            )}
          >
            {booksResult.map((book) =>
              preview ? (
                <PreviewOptionView book={book} key={book.id} />
              ) : (
                <SimpleOptionView book={book} key={book.id} />
              )
            )}
            {children}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};
