import React, {FormEvent, useState} from "react";
import {useRouter} from "next/router";
import {useMutation} from "urql";
import { LockClosedIcon } from '@heroicons/react/solid'
import {LogoLogin} from "../../components/LogoLogin";
const RegisterMutation = `
mutation($email: String!, $password: String!){
  registerUser(options:{email: $email, password: $password}){
    errors{
      field
      message
    }
    status
    credentials{
      token
      refreshToken
    }
  }
}
`
type Auth = {
  email: string,
  password: string
}
const Index = () => {
  const [auth, setAuth] = useState<Auth>({
    email:'',
    password: '',
  })
  const [, register] = useMutation(RegisterMutation)
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
      if(auth.email.length !== 0 && auth.password.length !== 0){
        const variables = {
          email: auth.email,
          password: auth.password
        };
        register(variables).then(res => {
          const token = res.data.registerUser.credentials?.token;
          const refreshToken = res.data.registerUser.credentials?.refreshToken;
          if (token && refreshToken) {
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            setErrorMsg('');
            setField('');
            router.push('/home').then();
          }else{
            setErrorMsg(res.data.registerUser.errors[0].message);
            setField(res.data.registerUser.errors[0].field);
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
              <h2 className="font-serif mt-6 text-center text-3xl font-semibold text-gray-900">Регистрация</h2>
              {/* <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <a href="#" className="font-medium text-main-600 hover:text-main-500">
                  start your 14-day free trial
                </a>
              </p> */}
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={submit}>
              <input type="hidden" name="remember" defaultValue="true"/>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  {field === 'email' ? <span className="text-red-500 text-xs">{errorMsg}</span> : ''}
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

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-main-600 focus:ring-main-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-main-600 hover:text-main-500">
                    Forgot your password?
                  </a>
                </div>
              </div> */}

              <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-main-600 hover:bg-main-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500"
                >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-main-500 group-hover:text-main-400" aria-hidden="true" />
              </span>
                  Зарегистрироваться
                </button>
              </div>
            </form>
          </div>
        </div>
    )
}
export default Index
