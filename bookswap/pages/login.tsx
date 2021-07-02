import React, {FC, FormEvent, useEffect, useState} from "react";
import { useRouter } from "next/router";
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



const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [updateLogin,login] = useMutation(LoginMutation)
  const router = useRouter()

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const variables = {email: email, password: password};
    login(variables).then(res => {
      const token = res.data.login.credentials?.token;
      const refreshToken = res.data.login.credentials?.refreshToken;
      if (token && refreshToken) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        setErrMessage('');
        router.push('/home');
      }else{
        setErrMessage(res.data.login.errors[0].message)
      }
    })
  }



  if(isLogin){
    router.push('/home')
  }


  return (

    <form className="flex w-96 justify-between items-center p-3" onSubmit={submit} >

        <label className="h-12 flex flex-col justify-between">
          <span className="text-xs text-red-500">{errMessage.includes("email") ? errMessage : ''}</span>
          <input className="border-2 w-40" placeholder="email" onChange={(event => setEmail(event.target.value))}/>
        </label>


      <label className="h-12 flex flex-col justify-between">
        <span className="text-xs text-red-500">{errMessage.includes("password") ? errMessage : ''}</span>
        <input className="border-2 w-40" placeholder="password" onChange={(event => setPassword(event.target.value))}/>
      </label>

      <div className="h-12 flex items-end">
        <button className="bg-blue-400 text-white" type="submit">Submit</button>
      </div>

    </form>
  )

}

export default Login