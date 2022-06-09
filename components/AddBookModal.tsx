import React, { ChangeEvent, useState } from 'react';
import { useMutation } from 'urql';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { Book, BooksCondition } from '../types/Book';
import { CreateBookMutation } from '../graphql/CreateBookMutation';
import { dateParsedYear } from '../helpers/dateTime';
import Button from './Button';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import { BookPreview, BookSearch } from './BookSearch';
import { BookEdition } from '../generated/graphql';

export const AddBookModal = ({
  onClose,
  onAddNewBook,
}: {
  onClose: () => void;
  onAddNewBook: (name: string) => void;
}) => {
  type CreateBookForm = Omit<Book, 'status' | 'booksCount'> & {
    userDescription: string;
  };

  const emptyState: CreateBookForm = {
    id: '',
    title: '',
    description: '',
    image: '',
    userDescription: '',
    isbn_13: null,
    isbn_10: null,
    authors: [],
    condition: BooksCondition.LIKENEW,
    publishedDate: '',
  };

  const [book, setBook] = useState<(BookEdition & { condition?: any }) | null>(
    null
  );
  const [addNewBook, showAddNewBook] = useState('');

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [, createBook] = useMutation(CreateBookMutation);
  const router = useRouter();
  const { t } = useTranslation('common');

  const submit = handleSubmit((data, event) => {
    event?.preventDefault();
    if (book) {
      console.log('book', book);
      createBook(book).then(async (res) => {
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
        await router.push(`/book/${res.data.createBook.book.edition.id}`);
      });
    }
  });

  const handleSelectChange = (newValue: BookEdition) => {
    if (newValue) {
      console.log(newValue);
      setBook({
        ...emptyState,
        ...newValue,
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
                    onSearchComplete={showAddNewBook}
                  />
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
            {addNewBook && (
              <div
                onClick={() => onAddNewBook(addNewBook)}
                className="border mt-12 rounded-md p-6 bg-white text-center hover:bg-gray-100 cursor-pointer"
              >
                <div>
                  <div>
                    <Button>
                      <PlusCircleIcon className="h-5 w-5 mr-2" />
                      Создать новую книгу
                    </Button>
                  </div>
                  <p className="text-sm italic mt-2">&#34;{addNewBook}&#34;</p>
                </div>
              </div>
            )}
            {book && (
              <>
                <h3 className="text-lg mt-4 leading-6 font-medium text-gray-900">
                  Информация о книге
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="userDescription"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ваш отзыв / описание
                    </label>
                    <div className="mt-1">
                      <textarea
                        {...register('userDescription')}
                        onChange={onChangeHandler}
                        id="userDescription"
                        name="userDescription"
                        rows={3}
                        className="shadow-sm focus:ring-main-500 focus:border-main-500 mt-1 block w-full py-1.5 px-2 sm:text-sm border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t('condition')}
                    </label>
                    <div className="mt-1">
                      <select
                        value={book.condition}
                        onChange={onChangeHandler}
                        id="condition"
                        name="condition"
                        className="shadow-sm focus:ring-main-500 focus:border-main-500 mt-1 block w-full py-1.5 px-2 sm:text-sm border border-gray-300 rounded-md"
                      >
                        {Object.values(BooksCondition).map((contition) => (
                          <option key={contition} value={contition}>
                            {t(String(contition))}
                          </option>
                        ))}
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
