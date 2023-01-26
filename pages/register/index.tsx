import React, {FormEvent, useState} from "react";
import {useRouter} from "next/router";
import {useMutation} from "urql";
import {LogoLogin} from "../../components/LogoLogin";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../helpers/locales';

import { loader } from 'graphql.macro';
import { RegisterMutation } from '../../generated/graphql';
import Cookies from 'js-cookie';
import ButtonOutside from '../../components/ButtonOutside';
const Register = loader("../../graphql/RegisterMutation.graphql");

type Auth = {
  email: string,
  password: string
}
const Index = () => {
  const [auth, setAuth] = useState<Auth>({
    email:'',
    password: '',
  })
  const { t } = useTranslation(localesList);
  const [, register] = useMutation<RegisterMutation>(Register)
  const [errorMsg, setErrorMsg] = useState('');
  const [field, setField] = useState('')
  const router = useRouter()
  const onHandlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    if (auth) {
      setAuth({...auth, [name]: value})
    }
    setErrorMsg('')
  }
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth.email.length !== 0 && auth.password.length !== 0) {
      const variables = {
        email: auth.email,
        password: auth.password
      };

      console.log(variables);

      register(variables).then(res => {
        if (res.data) {
          const token = res.data.registerUser.credentials?.token;
          const refreshToken = res.data.registerUser.credentials?.refreshToken;
          if (token && refreshToken) {
            Cookies.set("token", token);
            Cookies.set("refreshToken", refreshToken);
            setErrorMsg('');
            setField('');
            router.push('/register/avatar');
          } else {
            if (res.data.registerUser.errors) {
              setErrorMsg(res.data.registerUser.errors[0]?.message || '');
              setField(res.data.registerUser.errors[0]?.field || '');
            }
          }
        }
      })
    }
  }
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex justify-center">
              <LogoLogin />
            </div>
            <h1 className="mt-6 text-center text-3xl font-semibold text-gray-900">
              Регистрация
            </h1>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={submit}>
            <input type="hidden" name="remember" defaultValue="true"/>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                  <input
                      onChange={onHandlerInput}
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-main-500 focus:border-main-500 focus:z-10 sm:text-sm"
                      placeholder="Email адрес"
                  />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                    onChange={onHandlerInput}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-main-500 focus:border-main-500 focus:z-10 sm:text-sm"
                    placeholder="Пароль"
                />
              </div>
            </div>
            <div className={"text-center"}>
              {field === 'email' ? <span className="text-red-500 text-xs">{t(errorMsg)}</span> : ''}
            </div>
            <div>
              <ButtonOutside className={'w-full'} type={'submit'} style={'fill'} tag={'link'}>
                Зарегистрироваться
              </ButtonOutside>
            </div>
          </form>
        </div>
      </div>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Index
