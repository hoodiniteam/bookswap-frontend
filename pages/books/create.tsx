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
import { BooksCondition } from '../../types/Book';
import { CreateBookMutation } from '../../graphql/CreateBookMutation';
import { localesList } from '../../helpers/locales';

const Create = () => {
    const client = useClient();
    const timer = useRef<any>();

    const [book, setBook] = useState<any>({
        editionId: '',
        title: '',
        description: '',
        image: '',
        userDescription: '',
        isbn_13: null,
        isbn_10: null,
        condition: 'LIKENEW',
    });

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
            createBook(book).then((res) => {
                console.log(res);
                router.push(`/books/${res.data.createBook.book.id}`).then();
            });
        }
    });

    const loadOptions = (
        inputValue: string,
        callback: (options: any) => void
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
                                editionId: !edition.virtual ? edition.id : null,
                                title: edition.title,
                                image: edition?.image,
                                description: edition?.description,
                                isbn_13: edition.isbn_13,
                                isbn_10: edition.isbn_10,
                            },
                            label: (
                                <div className="flex h-24 items-center border-b">
                                    <div className="mr-2 bg-gray-100">
                                        <div className="w-16">
                                            <img
                                                className="h-24 w-16 object-contain"
                                                src={edition?.image}
                                            />
                                        </div>
                                    </div>
                                    {edition.title}
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
            description?: string;
            isbn_13?: string | null;
            isbn_10?: string | null;
        }>;
    }) => {
        if (newValue.value) {
            console.log(newValue.value);
            setBook({
                ...book,
                title: newValue.value.title,
                description: newValue.value.description || '',
                image: newValue.value.image || '',
                isbn_13: newValue.value.isbn_13,
                isbn_10: newValue.value.isbn_10,
            });
        } else {
            setBook({ ...book, title: '', description: '', image: '' });
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
            | ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (book) {
            setBook({ ...book, [name]: value });
        }
        clearErrors(name);
    };
    return (
        <>
            <form
                method="POST"
                style={{ width: '800px', margin: 'auto' }}
                onSubmit={submit}
            >
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {t('creating-book-page')}
                            </h3>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-3">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {t('title')}
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <AsyncSelect
                                        placeholder={t('book-search')}
                                        loadOptions={loadOptions}
                                        onChange={handleSelectChange as any}
                                        noOptionsMessage={ () => t('no-options') }
                                    />
                                </div>
                                <div className="text-xs text-gray-600 mt-1">
                                    {t('search-letters')}
                                </div>
                            </div>

                            {book.description && (
                                <p className="col-span-3 bg-gray-100 text-sm px-4 py-3 border rounded-md">
                                    {book.description}
                                </p>
                            )}

                            <div className="col-span-3">
                                <label
                                    htmlFor="userDescription"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    {t('user-description')}
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

                            <div className="col-span-3">
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
                                        {conditionOptions().map((contition) => (
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
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            type="submit"
                            className="bg-main-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500"
                        >
                            {t('save')}
                        </button>
                    </div>
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
