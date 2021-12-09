import React, { ChangeEvent, useState } from 'react';
import { LogoLogin } from '../components/LogoLogin';
import { useTranslation } from 'next-i18next';
import { localesList } from '../helpers/locales';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm } from 'react-hook-form';
import { AvatarComponent } from '../components/avatars';
import Link from 'next/link';
import Button from '../components/UI/Button';
import { useMutation } from 'urql';
import { UpdateUserMutation } from '../graphql/UpdateUserMutation';
import {useRouter} from "next/router";

const CreateUser = () => {
  const { t } = useTranslation(localesList);
  const router = useRouter()
  const [registered, setRegistered] = useState(false);
  const [, updateUser] = useMutation(UpdateUserMutation);
  const [user, setUser] = useState({} as { firstName: string, lastName: string, avatar: any });
  const {
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const next = () => {
    if (user) {
      setRegistered(true)
    }
  };
  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    clearErrors(name);
  };
  const submitHandler = handleSubmit((data, event) => {
    event?.preventDefault();
    if (user) {
      const variables = {
        firstName: user.firstName,
        lastName: user.lastName,
      };
      updateUser(variables).then((data) => {
        router.push('/home').then()
      });
    }
  });
  return (
    <div className='p-10'>
      <form className='p-10 border rounded-md' onSubmit={submitHandler}>
        {registered && <div className='disappear'>
            <div>
                <div className='flex justify-center'>
                    <LogoLogin />
                </div>
                <h2 className='font-serif mt-6 text-center text-3xl font-semibold text-gray-900'>Регистрация</h2>
            </div>
            <div className='flex flex-col items-center w-full'>
                <div className='mt-3 md:w-4/12 lg:w-4/12 sm:w-full'>
                    <label
                        htmlFor='first-name'
                        className='block text-sm font-medium text-gray-700'
                    >
                      {t('first-name')}
                    </label>
                    <input
                      {...register('firstName', {
                        required: true,
                      })}
                      onChange={onChangeHandler}
                      type='text'
                      name='firstName'
                      id='first-name'
                      autoComplete='given-name'
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-500 focus:border-main-500 sm:text-sm'
                    />
                </div>
                <div className='mt-3 md:w-4/12 lg:w-4/12 sm:w-full'>
                    <label
                        htmlFor='last-name'
                        className='block text-sm font-medium text-gray-700'
                    >
                      {t('last-name')}
                    </label>
                    <input
                      {...register('lastName', {
                        required: true,
                      })}
                      onChange={onChangeHandler}
                      type='text'
                      name='lastName'
                      id='last-name'
                      autoComplete='given-name'
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-500 focus:border-main-500 sm:text-sm'
                    />
                </div>
            </div>
        </div>}
        {!registered && <div className={registered ? 'appear' : ''}>
            <label
                htmlFor='first-name'
                className='block text-sm font-medium text-gray-700'
            >
              {t('avatar')}
            </label>
            <div className='flex flex-col items-center'>
                <AvatarComponent
                    className='sm:w-52'
                    avatarStyle='Circle'
                    {...user.avatar}
                />
                <Link href='/profile/avatar'>
                    <a>
                        <Button className='mt-6 ml-2' type='button'>Настроить аватар</Button>
                    </a>
                </Link>
            </div>
        </div>}
        <div className='flex justify-end mt-10'>
          {registered ? <Button type='submit' variant='secondary'>{t('save')}</Button>
            :
            <Button onClick={next} variant='primary'>{t('skip')}</Button>}
        </div>
      </form>
    </div>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default CreateUser;