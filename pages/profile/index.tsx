import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useMutation } from 'urql';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import SidebarForProfile from '../../components/sidebar-for-profile';
import Layout from '../../components/layout';
import { useQueryWrapper } from '../../helpers/useQueryWrapper';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { localesList } from '../../helpers/locales';
import { AvatarComponent } from '../../components/avatars';
import Button from '../../components/UI/Button';
import Link from 'next/link';
import {UpdateUserMutation} from "../../graphql/UpdateUserMutation";
import {GetMe} from "../../graphql/GetMe";

type WaitingList = [
  {
    title: string;
    id: string;
  }
];

// eslint-disable-next-line no-unused-vars
enum Gender {
  // eslint-disable-next-line no-unused-vars
  FEMALE,
  // eslint-disable-next-line no-unused-vars
  MALE,
  // eslint-disable-next-line no-unused-vars
  OTHER,
}

type UserData = {
  apartment?: string;
  bDay?: string;
  city: string;
  country: string;
  gender: Gender;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string;
  region: string;
  street: string;
  waiting: WaitingList;
  zipcode: number;
  avatar: any;
};

const Index = () => {
  const [{ data: meData, error, fetching }] = useQueryWrapper({
    query: GetMe,
  });

  const [, updateUser] = useMutation(UpdateUserMutation);
  const [user, setUser] = useState<UserData | ''>('');
  const router = useRouter();
  const {
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation(localesList);

  useEffect(() => {
    console.log(meData);
    if (meData) {
      setUser(meData.me.user);
    }
  }, [meData]);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const submitHandler = handleSubmit((data, event) => {
    event?.preventDefault();
    if (user) {
      const variables = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        region: user.region,
        country: user.country,
        city: user.city,
        street: user.street,
        apartment: user.apartment,
        bDay: user.bDay,
        phone: user.phone,
        gender: user.gender,
        zipcode: +user.zipcode,
      };
      updateUser(variables).then((data) => {
        console.log(data);
      });
    }
  });

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (user) {
      setUser({ ...user, [name]: value });
    }
    clearErrors(name);
  };
  if (!fetching && meData && user) {

    return (
      <form action='#' method='POST' onSubmit={submitHandler}>
        <Head>
          <title>
            Profile {user.firstName} {user.lastName}
          </title>
        </Head>
        <div className='shadow sm:rounded-md sm:overflow-hidden'>
          <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                {t('profile', { ns: 'nav' })}
              </h3>
            </div>
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-6'>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium text-gray-700'
                >
                  {t('avatar')}
                </label>
                <div className="text-center">
                <AvatarComponent
                  className="sm:w-1/2 inline-block"
                  avatarStyle='Circle'
                  {...user.avatar}
                />
                <Link href="/profile/avatar">
                  <a>
                    <Button className="mt-6" type="button">Настроить аватар</Button>
                  </a>
                </Link>
                </div>
              </div>
              <div className='col-span-6 sm:col-span-3'>
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
                  value={user.firstName || ''}
                  type='text'
                  name='firstName'
                  id='first-name'
                  autoComplete='given-name'
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-500 focus:border-main-500 sm:text-sm'
                />
                {errors.firstName ? (
                  <span className='text-red-500 text-xs'>
                                        enter first name
                                    </span>
                ) : (
                  ''
                )}
              </div>

              <div className='col-span-6 sm:col-span-3'>
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
                  value={user.lastName || ''}
                  type='text'
                  name='lastName'
                  id='last-name'
                  autoComplete='family-name'
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-500 focus:border-main-500 sm:text-sm'
                />
                {errors.lastName ? (
                  <span className='text-red-500 text-xs'>
                                        enter last name
                                    </span>
                ) : (
                  ''
                )}
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='email-address'
                  className='block text-sm font-medium text-gray-700'
                >
                  {t('email')}
                </label>
                <input
                  {...register('email', { required: true })}
                  onChange={onChangeHandler}
                  value={user.email || ''}
                  type='email'
                  name='email'
                  id='email-address'
                  autoComplete='email'
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-500 focus:border-main-500 sm:text-sm'
                />
                {errors.email ? (
                  <span className='text-red-500 text-xs'>
                                        enter your email
                                    </span>
                ) : (
                  ''
                )}
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='bDay'
                  className='block text-sm font-medium text-gray-700'
                >
                  {t('birthday')}
                </label>
                <input
                  onChange={onChangeHandler}
                  value={user.bDay || ''}
                  type='date'
                  name='bDay'
                  id='bDay'
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-500 focus:border-main-500 sm:text-sm'
                />
              </div>
            </div>
          </div>
          <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
            <Button
              type='submit'
              variant='primary'
            >
              {t('save')}
            </Button>
          </div>
        </div>
      </form>
    );
  }
  return null;
};
Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <SidebarForProfile>{page}</SidebarForProfile>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Index;
