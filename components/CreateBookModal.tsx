import React, { ChangeEvent, useRef, useState } from 'react';
import { useClient, useMutation } from 'urql';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import AsyncSelect from 'react-select/async';
import { SingleValue } from 'react-select';
import { Book, BooksCondition } from '../types/Book';
import { dateParsedYear } from '../helpers/dateTime';
import Button from './Button';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FilePondFile } from 'filepond';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const CreateBookModal = ({
  onClose,
  newBookName,
}: {
  onClose: () => void;
  newBookName?: string;
}) => {
  const client = useClient();
  const timer = useRef<any>();

  type CreateBookForm = Omit<Book, 'status' | 'booksCount'> & {
    userDescription: string;
  };

  const [files, setFiles] = useState<any[]>([]);

  const emptyState: CreateBookForm = {
    id: '',
    title: newBookName || '',
    description: '',
    image: '',
    userDescription: '',
    isbn_13: null,
    isbn_10: null,
    authors: [],
    condition: BooksCondition.LIKENEW,
    publishedDate: '',
  };

  const [book, setBook] = useState<CreateBookForm>({ ...emptyState });
  const [addNewBook, showAddNewBook] = useState('');

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  // const [, createBook] = useMutation(CreateBookMutation);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const createBook = (args: any): any => {};
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
          <div className="bg-white">
            <div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Название
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={onChangeHandler}
                    value={book.title}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Название книги"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Обложка для книги
                </label>
                <div className="mt-1">
                  <FilePond
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    maxFiles={3}
                    server="/api"
                    name="files"
                    labelIdle='Перетащите сюда файл или <span class="filepond--label-action">нажмите чтобы выбрать</span>'
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="authors"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Авторы
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="authors"
                      id="authors"
                      onChange={onChangeHandler}
                      value={book.authors}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Авторы"
                    />
                  </div>
                  <p
                    className="mt-2 text-sm text-gray-500"
                    id="email-description"
                  >
                    Через запятую
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="publishedDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Год
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="publishedDate"
                      id="publishedDate"
                      onChange={onChangeHandler}
                      value={book.publishedDate || ''}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Год выхода"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="isbn_10"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ISBN 10
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="isbn_10"
                      id="isbn_10"
                      onChange={onChangeHandler}
                      value={book.isbn_10 || ''}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="ISBN 10"
                    />
                  </div>
                  <p
                    className="mt-2 text-sm text-gray-500"
                    id="email-description"
                  >
                    Код из 10 символов, рядом со штрихкодом, если есть
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="isbn_13"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ISBN 13
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="isbn_13"
                      id="isbn_13"
                      onChange={onChangeHandler}
                      value={book.isbn_13 || ''}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="ISBN 13"
                    />
                  </div>
                  <p
                    className="mt-2 text-sm text-gray-500"
                    id="email-description"
                  >
                    Код из 13 символов, рядом со штрихкодом, если есть
                  </p>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Описание книги
                  </label>
                  <div className="mt-1">
                    <textarea
                      name="description"
                      id="description"
                      rows={4}
                      onChange={onChangeHandler}
                      value={book.description || ''}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Напишите здесь свою аннотацию или возьмите ее в свободном доступе, это поможет тем кто захочет прочитать эту книгу"
                    />
                  </div>
                </div>

                <div className="col-span-2">
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
                      {Object.values(BooksCondition).map((condition) => (
                        <option key={condition} value={condition}>
                          {t(String(condition))}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
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
