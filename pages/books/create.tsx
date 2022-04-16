import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { useClient, useMutation } from 'urql';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Layout from '../../components/layout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AsyncSelect from 'react-select/async';
import { GetEditionsQuery } from '../../graphql/GetEditionsQuery';
import { SingleValue } from 'react-select';
import { Book, BooksCondition } from '../../types/Book';
import { CreateBookMutation } from '../../graphql/CreateBookMutation';
import { localesList } from '../../helpers/locales';
import { dateParsedYear } from '../../helpers/dateTime';
import { useNotification } from '../../helpers/notificationHelper';

const Create = () => {
  const client = useClient();
  const {successNotification} = useNotification();
  const timer = useRef<any>();

  type CreateBookForm = Omit<Book, 'status'> & {userDescription: string};

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

  const [book, setBook] = useState<CreateBookForm | null>(null);

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
      createBook(book)
        .then(async (res) => {
          successNotification("Книга добавлена");
          await router.push(`/book/${res.data.createBook.book.edition.id}`);
        });
    }
  });

  const loadOptions = (
    inputValue: string,
    callback: (options: any) => void,
  ) => {
    if (inputValue.length <= 3) {
      callback([]);
      return;
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      console.log('called - ', inputValue);
      client
        .query(GetEditionsQuery, {
          search: inputValue,
        })
        .toPromise()
        .then((res) => {
          const result = res.data?.getEditions?.editions;
          if (result) {
            const editions = result.map((edition: any) => ({
              value: {
                id: !edition.virtual ? edition.id : null,
                title: edition.title,
                image: edition?.image,
                authors: edition?.authors,
                description: edition?.description,
                isbn_13: edition.isbn_13,
                isbn_10: edition.isbn_10,
                publishedDate: edition.publishedDate,
              },
              label: (
                <div className='flex bg-white hover:bg-gray-100 py-1 cursor-pointer items-center'>
                  <div className='mr-2 bg-gray-100'>
                    <div className='w-20'>
                      <img
                        className='h-28 w-20 object-contain'
                        src={edition?.image}
                      />
                    </div>
                  </div>
                  <div>
                    <p className='leading-5'>{edition.title}</p>
                    <span className='text-xs'>{edition.authors}, {dateParsedYear(edition.publishedDate)}</span>
                  </div>
                </div>
              ),
            }));
            console.log(editions);
            callback(editions || []);
          }
        })
        .catch(() => {
          callback([]);
        });
    }, 800);
  };

  const handleSelectChange = (newValue: {
    value: SingleValue<{
      title: string;
      image?: string;
      authors: [];
      description?: string;
      isbn_13?: string | null;
      isbn_10?: string | null;
      publishedDate: string;
    }>;
  }) => {
    if (newValue.value) {
      console.log(newValue.value);
      setBook({
        ...emptyState,
        title: newValue.value.title,
        description: newValue.value.description || '',
        authors: newValue.value.authors || [],
        image: newValue.value.image || '',
        isbn_13: newValue.value.isbn_13,
        isbn_10: newValue.value.isbn_10,
        publishedDate: newValue.value.publishedDate || '',
      });
    } else {
      setBook(null);
    }
  };

  const conditionOptions = () => {
    const values = Object.values(BooksCondition);
    return values.slice(0, (values.length - 1) / 2);
  };

  const onChangeHandler = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const {
      name,
      value,
    } = e.target;
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
      <form
        method='POST'
        onSubmit={submit}
        className='mx-auto max-w-4xl'
      >
        <p className="sm:text-white font-bold text-xl mb-3">Создание книги</p>
        <div className='shadow'>
          <div className='bg-white sm:rounded-md py-6 px-4 space-y-6 sm:p-6'>
            <div className='grid grid-cols-4 gap-6'>
              <div className='col-span-4'>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700'
                >
                  {t('title')}
                </label>
                <div className='mt-1 rounded-md shadow-sm'>
                  <AsyncSelect
                    placeholder={t('book-search')}
                    loadOptions={loadOptions}
                    onChange={handleSelectChange as any}
                    noOptionsMessage={() => t('no-options')}
                  />
                </div>
                <div className='text-xs text-gray-600 mt-1'>
                  {t('search-letters')}
                </div>
              </div>
              {
                book && (
                  <>
                    {book.authors && book.authors.length > 0 && (
                      <div>
                        <div className='block text-sm font-medium text-gray-700'>
                          Авторы
                        </div>
                        <div className='flex'>
                          {book.authors && book.authors.map((author: string, idx: number) => (
                            book.authors && (<span key={author} className='text-gray-500 text-sm'>{author}{idx === book.authors.length - 1 ? '' : ', '}</span>)
                          ))}
                        </div>
                      </div>
                    )}
                    {book.publishedDate && (
                      <div>
                        <div className='block text-sm font-medium text-gray-700'>
                          Публикация
                        </div>
                        <span className='text-gray-500 text-sm'>{dateParsedYear(book.publishedDate)}</span>
                      </div>
                    )}
                    {book.isbn_10 && (
                      <div>
                        <div className='block text-sm font-medium text-gray-700'>
                          ISBN 10
                        </div>
                        <span className='text-gray-500 text-sm'>{book.isbn_10}</span>
                      </div>
                    )}
                    {book.isbn_13 && (
                      <div>
                        <div className='block text-sm font-medium text-gray-700'>
                          ISBN 13
                        </div>
                        <span className='text-gray-500 text-sm'>{book.isbn_13}</span>
                      </div>
                    )}
                    {book.description && (
                      <p className='col-span-4 bg-gray-100 text-sm px-4 py-3 border rounded-md'>
                        {book.description}
                      </p>
                    )}
                  </>
                )
              }
            </div>
            {
              book && (
                <>
                  <h4 className="text-lg leading-6 font-medium text-gray-900">Информация о книге</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor='userDescription'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Ваш отзыв / описание
                      </label>
                      <div className='mt-1'>
                          <textarea
                            {...register('userDescription')}
                            onChange={onChangeHandler}
                            id='userDescription'
                            name='userDescription'
                            rows={3}
                            className='shadow-sm focus:ring-main-500 focus:border-main-500 mt-1 block w-full py-1.5 px-2 sm:text-sm border border-gray-300 rounded-md'
                          />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor='about'
                        className='block text-sm font-medium text-gray-700'
                      >
                        {t('condition')}
                      </label>
                      <div className='mt-1'>
                        <select
                          value={book.condition}
                          onChange={onChangeHandler}
                          id='condition'
                          name='condition'
                          className='shadow-sm focus:ring-main-500 focus:border-main-500 mt-1 block w-full py-1.5 px-2 sm:text-sm border border-gray-300 rounded-md'
                        >
                          {conditionOptions()
                            .map((contition) => (
                              <option
                                key={contition}
                                value={contition}
                              >
                                {t(String(contition))}
                              </option>
                            ))}
                        </select>
                      </div>
                        </div>
                    </div>
                </>
              )
            }
          </div>
          {
            book && (
              <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                <button
                  type='submit'
                  className='bg-main-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500'
                >
                  {t('save')}
                </button>
              </div>
            )
          }
        </div>
      </form>
    </>
  );
};
Create.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'Create book'}>{page}</Layout>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Create;
