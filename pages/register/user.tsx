import React from 'react';
import { LogoLogin } from '../../components/LogoLogin';
import { Formik } from 'formik';
import { ArrowCircleRightIcon } from '@heroicons/react/outline';
import { useMutation } from 'urql';
import { UpdateUserMutation } from '../../graphql/UpdateUserMutation';
import { useRouter } from 'next/router'

const User = () => {
  const Router = useRouter();
  const [, updateUser] = useMutation(UpdateUserMutation);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <LogoLogin />
          </div>
          <h2 className="font-serif mt-6 text-center text-3xl font-semibold text-gray-900">Как вас зовут?</h2>
          <h3 className="italic mt-2">Если используете никнейм, придумайте что-нибудь интересное</h3>
        </div>
        <Formik
          initialValues={{ firstName: '', lastName: '' }}
          validate={values => {
            const errors: {[key: string]: string} = {};
            if (!values.firstName) {
              errors.firstName = 'Проверьте имя';
            }
            if (!values.lastName) {
              errors.lastName = 'Проверьте фамилию';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            updateUser(values).then(() => {
              Router.push("/register/avatar")
            }).catch(e => {
              console.log(e);
              setSubmitting(false);
            });
          }}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md -space-y-px">
                  <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Имя"
                    className="appearance-none shadow-sm rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-main-500 focus:border-main-500 focus:z-10 sm:text-sm"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  {errors.firstName && touched.firstName && errors.firstName && (
                    <div className="text-red-400 mt-0.5 mb-1">{errors.firstName}</div>
                  )}
                  </div>
                  <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Фамилия"
                    className="appearance-none shadow-sm rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-main-500 focus:border-main-500 focus:z-10 sm:text-sm"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                  {errors.lastName && touched.lastName && errors.lastName && (
                    <div className="text-red-400 mt-0.5 mb-1">{errors.lastName}</div>
                  )}
                  </div>
                </div>
                <div>
                  <button
                    type="submit" disabled={isSubmitting}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-main-600 hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <ArrowCircleRightIcon className="h-5 w-5 text-main-500 group-hover:text-main-400" aria-hidden="true" />
                    </span>
                    Продолжить
                  </button>
                </div>
              </form>
          )}
        </Formik>
      </div>
    </div>

  );
};

export default User;
