import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
// import { CreateBookMutation } from '../graphql/CreateBookMutation';
import { dateParsedYear } from '../helpers/dateTime';
import Button from './Button';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import { BookPreview, BookSearch } from './BookSearch';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  GetMeQuery,
  UpsertEditionMutation,
  UpsertEditionMutationVariables,
} from '../generated/graphql.d';
import { loader } from 'graphql.macro';
import { useMutation } from 'urql';
import { useQueryWrapper } from '../helpers/useQueryWrapper';
import { BookForm } from '../types/Book';
import { emptyState } from '../helpers/bookState';
const UpsertEdition = loader('../graphql/UpsertEditionMutation.graphql');
const GetMe = loader('../graphql/GetMe.graphql');

export const AddBookModal = ({
  onClose,
  onAddNewBook,
}: {
  onClose: () => void;
  onAddNewBook: (name: string) => void;
}) => {
  const [{ data: meData }] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
  });

  const [book, setBook] = useState<BookForm | null>(null);
  const [newBookTitle, showNewBookTitle] = useState('');

  const {
    handleSubmit,
    clearErrors,
  } = useForm();

  const [, upsertBook] = useMutation<
    UpsertEditionMutation,
    UpsertEditionMutationVariables
  >(UpsertEdition);
  const router = useRouter();
  const { t } = useTranslation('common');

  const submit = handleSubmit(async (data, event) => {
    event?.preventDefault();
    const userId = meData?.me?.user?.id;
    if (book && userId) {
      console.log('book', book);
      const res = await upsertBook({
        ...book,
        userId,
      });
      const edition = res.data?.customUpsertEdition?.id;
      if (edition) {
        toast('🦄 Wow книга добавлена!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onClose();
        await router.push(`/book/${edition}`);
      }
    }
  });

  const handleSelectChange = (newValue: any) => {
    if (newValue) {
      console.log(newValue);
      setBook({
        ...emptyState,
        ...newValue,
        editionId: newValue.relatedEditionId || '',
        indexId: newValue.id,
      });
    } else {
      setBook(null);
    }
  };

  const onChangeHandler = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (book) {
      setBook({
        ...book,
        [name]: value,
      });
    }
    clearErrors(name);
  };

  return (
    <>
      <form method="POST" onSubmit={submit}>
        <div className="">
          <div className="">
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-4">
                <div className="mt-1 rounded-md shadow-sm">
                  <BookSearch
                    preview={true}
                    onChange={handleSelectChange}
                    placeholder={'Заголовок или ISBN книги'}
                    onSearchComplete={showNewBookTitle}
                  >
                    <div
                      onClick={() => onAddNewBook(newBookTitle)}
                      className="border rounded-md p-6 bg-white text-center hover:bg-gray-100 cursor-pointer"
                    >
                      <div>
                        <div>
                          <p className="italic">Не нашли нужную книгу?</p>
                          <Button className="mt-4">
                            <PlusCircleIcon className="h-5 w-5 mr-2" />
                            Создать новую книгу &rdquo;{newBookTitle}&rdquo;
                          </Button>
                        </div>
                      </div>
                    </div>
                  </BookSearch>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {t('search-letters')}
                </div>
              </div>
              {book && (
                <>
                  <div className="col-span-4">
                    <BookPreview book={book} />
                  </div>
                  {book.authors && book.authors.length > 0 && (
                    <div>
                      <div className="block text-sm font-medium text-gray-700">
                        Авторы
                      </div>
                      <div className="flex">
                        {book.authors &&
                          book.authors.map(
                            (author: string, idx: number) =>
                              book.authors && (
                                <span
                                  key={author}
                                  className="text-gray-500 text-sm"
                                >
                                  {author}
                                  {idx === book.authors.length - 1 ? '' : ', '}
                                </span>
                              )
                          )}
                      </div>
                    </div>
                  )}
                  {book.publishedDate && (
                    <div>
                      <div className="block text-sm font-medium text-gray-700">
                        Публикация
                      </div>
                      <span className="text-gray-500 text-sm">
                        {dateParsedYear(book.publishedDate)}
                      </span>
                    </div>
                  )}
                  {book.isbn_10 && (
                    <div>
                      <div className="block text-sm font-medium text-gray-700">
                        ISBN 10
                      </div>
                      <span className="text-gray-500 text-sm">
                        {book.isbn_10}
                      </span>
                    </div>
                  )}
                  {book.isbn_13 && (
                    <div>
                      <div className="block text-sm font-medium text-gray-700">
                        ISBN 13
                      </div>
                      <span className="text-gray-500 text-sm">
                        {book.isbn_13}
                      </span>
                    </div>
                  )}
                  {book.description && (
                    <p className="col-span-4 bg-gray-100 text-sm px-4 py-3 border rounded-md">
                      {book.description}
                    </p>
                  )}
                </>
              )}
            </div>
            {book && (
              <>
                <h3 className="text-lg mt-4 leading-6 font-medium text-gray-900">
                  Состояние
                </h3>
                <div>
                  <div>
                    <div className="mt-1">
                      <select
                        value={book.condition}
                        onChange={onChangeHandler}
                        id="condition"
                        name="condition"
                        className="shadow-sm focus:ring-main-500 focus:border-main-500 mt-1 block w-full py-1.5 px-2 sm:text-sm border border-gray-300 rounded-md"
                      >
                        <option key='TERRIBLE' value='TERRIBLE'>
                          {t(String('TERRIBLE'))}
                        </option>
                        <option key='BAD' value='BAD'>
                          {t(String('BAD'))}
                        </option>
                        <option key='SATISFACTORY' value='SATISFACTORY'>
                          {t(String('SATISFACTORY'))}
                        </option>
                        <option key='GOOD' value='GOOD'>
                          {t(String('GOOD'))}
                        </option>
                        <option key='LIKENEW' value='LIKENEW'>
                          {t(String('LIKENEW'))}
                        </option>
                        <option key='BRANDNEW' value='BRANDNEW'>
                          {t(String('BRANDNEW'))}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="text-right mt-6">
            {book && (
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              >
                {t('save')}
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};
