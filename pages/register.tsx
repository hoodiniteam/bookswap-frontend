import React, {FormEvent, useState} from "react";
import {useRouter} from "next/router";
import {useMutation} from "urql";

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
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, register] = useMutation(RegisterMutation)
  const [errInfo, setErrInfo] = useState('');
  const [field, setField] = useState('')
  const router = useRouter()
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const variables = {email: email, password: password};
    register(variables).then(res => {
      const token = res.data.registerUser.credentials?.token;
      const refreshToken = res.data.registerUser.credentials?.refreshToken;
      if (token && refreshToken) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        setErrInfo('');
        setField('');
        router.push('/home').then();
      } else {
        setErrInfo(res.data?.registerUser.errors[0].message);
        setField(res.data?.registerUser.errors[0].field)
      }
    })
  }
  return (
    <div className="border-2 rounded-md p-5 max-w-min mx-auto mt-10">
      <h1>Registration Form</h1>
      <form className="w-96  p-3" onSubmit={submit}>
        <label className="h-12 flex flex-col justify-between">
          <span className="text-xs text-red-500">{field === 'email' ? errInfo : ''}</span>
          <input className="border-2 w-40" placeholder="email" onChange={(event => setEmail(event.target.value))}/>
        </label>
        <label className="h-12 flex flex-col justify-between">
          <span className="text-xs text-red-500">{field === "password" ? errInfo : ''}</span>
          <input className="border-2 w-40" placeholder="password"
                 onChange={(event => setPassword(event.target.value))}/>
        </label>
        <div className="flex justify-between w-48 p-5">
          <button className="bg-blue-400 text-white" type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}
export default Register
