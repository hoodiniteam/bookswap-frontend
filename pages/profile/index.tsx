import React, { ChangeEvent, ReactElement } from 'react';
import { useMutation } from 'urql';
import { useForm } from 'react-hook-form';
import Layout from '../../components/layout';
import { useQueryWrapper } from '../../helpers/useQueryWrapper';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { localesList } from '../../helpers/locales';
import { AvatarComponent } from '../../components/avatars';
import Button from '../../components/Button';
import Link from 'next/link';
import LogOut from '../../helpers/LogOut';
import { loader } from 'graphql.macro';
import {
  GetMeQuery,
  UpdateUserDataMutation,
  UpdateUserDataMutationVariables,
} from '../../generated/graphql';
const GetMe = loader('../../graphql/GetMe.graphql');
const UpdateUser = loader('../../graphql/UpdateUserMutation.graphql');

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
  const [{ data: meData, error, fetching }] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
  });

  const [, updateUser] = useMutation<
    UpdateUserDataMutation,
    UpdateUserDataMutationVariables
  >(UpdateUser);

  const { user } = meData?.me || {};

  const {
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation(localesList);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const submitHandler = handleSubmit((data, event) => {
    event?.preventDefault();
    if (user) {
      const variables = {
        firstName: user.firstName,
        lastName: user.lastName,
      };
      updateUser(variables).then((data) => {
        console.log(data);
      });
    }
  });

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (user) {
      user[name as 'firstName' | 'lastName'] = value;
    }
    clearErrors(name);
  };
  if (!fetching && meData && user) {
    return (
      <form action="#" method="POST" onSubmit={submitHandler}>
        <Head>
          <title>{t('profile', { ns: 'nav' })}</title>
        </Head>
        <p className="sm:text-white font-bold text-lg mb-3">
          {t('profile', { ns: 'nav' })}
        </p>
        <div className="shadow rounded-md overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t('avatar')}
                </label>
                <div className="flex flex-col items-center">
                  <AvatarComponent
                    className="sm:w-52"
                    avatarStyle="Circle"
                    {...user.avatar}
                  />
                  <Link href="/profile/avatar">
                    <a>
                      <Button className="mt-6 ml-2" type="button">
                        Настроить аватар
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="space-y-4 col-span-6 sm:col-span-3">
                <div>
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t('email')}
                  </label>
                  <div className="mt-1 block w-full text-sm">
                    {user.email || ''}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t('first-name')}
                  </label>
                  <input
                    {...register('firstName', {
                      required: true,
                    })}
                    onChange={onChangeHandler}
                    value={user.firstName || ''}
                    type="text"
                    name="firstName"
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-500 focus:border-main-500 sm:text-sm"
                  />
                  {errors.firstName ? (
                    <span className="text-red-500 text-xs">
                      enter first name
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t('last-name')}
                  </label>
                  <input
                    {...register('lastName', {
                      required: true,
                    })}
                    onChange={onChangeHandler}
                    value={user.lastName || ''}
                    type="text"
                    name="lastName"
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-main-500 focus:border-main-500 sm:text-sm"
                  />
                  {errors.lastName ? (
                    <span className="text-red-500 text-xs">
                      enter last name
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Button type="button" onClick={LogOut} variant="dangerOutline">
              Выйти
            </Button>
            <Button type="submit" variant="primary">
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
  return <Layout>{page}</Layout>;
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Index;
