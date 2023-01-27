import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { useMutation } from 'urql';
import {
  GetMeQuery,
  UpsertEditionMutation,
  UpsertEditionMutationVariables,
} from '@/gtypes';
import { loader } from 'graphql.macro';
import { useQueryWrapper } from '@/helpers/useQueryWrapper';
import { createCloudinary } from '@/helpers/cloudinary';
import { BookForm } from '@/types/Book';
import { emptyState } from '@/helpers/bookState';
const UpsertEdition = loader('../graphql/UpsertEditionMutation.graphql');
const GetMe = loader('../graphql/GetMe.graphql');

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const CreateBookModal = ({
  onClose, newBookName
}: {
  onClose: () => void;
  newBookName?: string;
}) => {

  const [{ data: meData }] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
  });

  const [, upsertBook] = useMutation<
    UpsertEditionMutation,
    UpsertEditionMutationVariables
    >(UpsertEdition);

  const router = useRouter();

  const [files, setFiles] = useState<any[]>([]);
  const [book, setBook] = useState<BookForm>({ ...emptyState, title: newBookName || "" });
  const fileRemoveHandler = () => {
    setBook({ ...book, image: '' });
  }

  const schema = yup.object({
    title: yup.string().required("Название обязательно"),
    isbn_10: yup.number().min(10, "ISBN 10 должно быть равно 10 символам").max(10, "ISBN 10 должно быть равно 10 символам").nullable(true),
    isbn_13: yup.number().min(13, "ISBN 13 должно быть равно 13 символам").max(13, "ISBN 13 должно быть равно 13 символам").nullable(true),
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: book,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    Object.values(errors).forEach((error: any) => {
      if (error.message) {
        toast(error.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "error"
        });
      }
    });
  }, [errors])

  const onSubmit = async (data: any) => {
    const userId = meData?.me?.user?.id;
    setBook({ ...book, ...data });
    if (book && !book.image) {
      toast("Загрузите обложку", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error"
      });
    } else if (book && userId) {
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
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div>
            <div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Название <span className="text-gray-400 italic text-xs">(обязательно)</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    {...register("title")}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Название книги"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Обложка для книги <span className="text-gray-400 italic text-xs">(обязательно)</span>
                </label>
                <div className="mt-1">
                  <FilePond
                    files={files}
                    allowMultiple={false}
                    maxFiles={1}
                    server={createCloudinary('dufogbndd', 'i3rylrpx', (url) => {
                      setBook({ ...book, image: url });
                    })}
                    name="files"
                    onupdatefiles={setFiles}
                    onremovefile={fileRemoveHandler}
                    labelIdle='Перетащите сюда файл или <span class="filepond--label-action">нажмите чтобы загрузить</span>'
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
                      {...register("authors")}
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
                      {...register("publishedDate")}
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
                      {...register("isbn_10")}
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
                      {...register("isbn_13")}
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
                      {...register("description")}
                      rows={4}
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
                    Состояние
                  </label>
                  <div className="mt-1">
                    <select
                      {...register("condition")}
                      className="shadow-sm focus:ring-main-500 focus:border-main-500 mt-1 block w-full py-1.5 px-2 sm:text-sm border border-gray-300 rounded-md"
                    >
                      <option key='TERRIBLE' value='TERRIBLE'>
                        Ужасное
                      </option>
                      <option key='BAD' value='BAD'>
                        Плохое
                      </option>
                      <option key='SATISFACTORY' value='SATISFACTORY'>
                        Удовлетворительное
                      </option>
                      <option key='GOOD' value='GOOD'>
                        Хорошее
                      </option>
                      <option key='LIKENEW' value='LIKENEW'>
                        Как новая
                      </option>
                      <option key='BRANDNEW' value='BRANDNEW'>
                        Новая
                      </option>
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
                Сохранить
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};
