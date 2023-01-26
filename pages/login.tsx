import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'urql'
import Cookies from 'js-cookie';
import {LogoLogin} from "../components/LogoLogin";

import { loader } from 'graphql.macro';
import { LoginMutation } from '../generated/graphql';
import ButtonOutside from '../components/ButtonOutside';
const LoginM = loader("../graphql/LoginMutation.graphql");

type Auth = {
  email: string
  password: string
}

const Login = () => {
  const [errMessage, setErrMessage] = useState('')
  const [errField, setErrField] = useState('')
  const [auth, setAuth] = useState<Auth>({
    email: '',
    password: '',
  })
  const [, login] = useMutation<LoginMutation>(LoginM)
  const router = useRouter()
  const onHandlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (auth) {
      setAuth({ ...auth, [name]: value })
    }
    setErrField('')
    setErrMessage('')
  }
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (auth) {
      const variables = {
        email: auth.email,
        password: auth.password,
      }
      login(variables).then((res) => {
        const token = res.data?.login.credentials?.token
        const refreshToken = res.data?.login.credentials?.refreshToken
        if (token && refreshToken) {
          Cookies.set('token', token);
          Cookies.set('refreshToken', refreshToken);
          setErrMessage('')
          setErrField('')
          router.push('/home').then()
        } else {
          if (res.data?.login.errors) {
            setErrMessage(res.data.login.errors[0].message || "")
            setErrField(res.data.login.errors[0].field || "")
          }
        }
      })
    }
  }
  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex justify-center text-center">
            <LogoLogin />
          </div>

          <div className="mt-8">
            <div>
              <div>
                <ButtonOutside className={'w-full'} style={'outline'} tag={'link'} href={'/register'}>
                  Регистрация
                </ButtonOutside>
              </div>

              <div className="mt-6 relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                      Или войдите
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form
                action="#"
                method="POST"
                className="space-y-6"
                onSubmit={submit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email адрес
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={onHandlerInput}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={
                        errField === 'email'
                          ? 'appearance-none block w-full px-3 py-2 border-2 border-red-300'
                          : 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-main-500 focus:border-main-500 sm:text-sm'
                      }
                    />
                  </div>
                  {
                    errField === 'email' && <span className="text-red-500 text-sm errMsg">
                        {errMessage}
                    </span>
                  }
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Пароль
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={onHandlerInput}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className={
                        errField === 'password'
                          ? 'appearance-none block w-full px-3 py-2 border-2 border-red-300'
                          : 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-main-500 focus:border-main-500 sm:text-sm'
                      }
                    />
                  </div>
                  {
                    errField === 'password' && <span className="text-red-500 text-sm errMsg">
                        {errMessage}
                    </span>
                  }
                </div>

                <div>
                  <ButtonOutside style={'fill'} className={'w-full'} type="submit">
                    Войти
                  </ButtonOutside>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/login.jpg"
          alt="login"
        />
        <div className="absolute right-5 bottom-5 text-white">Photo by <a className="underline" href="https://unsplash.com/@leoand1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Andrii Leonov</a> on <a className="underline" href="https://unsplash.com/t/architecture?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></div>
      </div>
    </div>
  )
}
export default Login
