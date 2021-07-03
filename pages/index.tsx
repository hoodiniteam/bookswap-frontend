import React, {useEffect} from "react";
import {useQuery, useMutation} from "urql";
import Home from "./home";
import {useState} from "react";
import Login from "./login";



export default function Index() {
const [isLogin, setIsLogin ] = useState(false)


  return (
    <div>
      <h1>Index</h1>
    </div>
  )
}
