import React, {FormEvent, useState} from "react";
import {useRouter} from "next/router";
import {useMutation} from "urql";
const LoginMutation = `
  mutation($email: String!, $password: String!){
    login(options:{email:$email, password:$password}){
        status
        errors{message}
        credentials{
        token, refreshToken
      }
    }
  }
`

type LoginAPI = {
  login: any;
}

const Login = () => {
  const [errMessage, setErrMessage] = useState('');
  const [errField, setErrField] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, login] = useMutation<LoginAPI>(LoginMutation)
  const router = useRouter()
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const variables = {email: email, password: password};
    login(variables).then(res => {
      const token = res.data?.login.credentials?.token;
      const refreshToken = res.data?.login.credentials?.refreshToken;
      if (token && refreshToken) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        setErrMessage('');
        setErrField('');
        router.push('/home').then();
      } else {
        setErrMessage(res.data?.login.errors[0].message)
        setErrField(res.data?.login.errors[0].message)
      }
    })
  }
  return (
    <div className="border-2 rounded-md p-5 max-w-min mx-auto mt-10">
      <form className="w-96  p-3" onSubmit={submit}>
        <label className="h-12 flex flex-col justify-between">
          <span className="text-xs text-red-500">{errField === "email" ? errMessage : ''}</span>
          <input className="border-2 w-40" placeholder="email" onChange={(event => setEmail(event.target.value))}/>
        </label>
        <label className="h-12 flex flex-col justify-between">
          <span className="text-xs text-red-500">{errField === "password" ? errMessage : ''}</span>
          <input className="border-2 w-40" placeholder="password"
                 onChange={(event => setPassword(event.target.value))}/>
        </label>
        <div className="flex justify-between w-48 p-5">
          <button className="bg-blue-400 text-white" type="submit">Login</button>
          <button className="bg-blue-400 text-white" onClick={() => {
            router.push('/register').then()
          }} type="button">Registration
          </button>
        </div>
      </form>
    </div>
  )
}
export default Login