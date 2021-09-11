import { useEffect, useRef } from 'react'
import {useRouter} from "next/router";

export const WithAuth = ({children}: {children: JSX.Element}): null | JSX.Element => {
  const Router = useRouter()
  const accessToken = useRef<string | null>(null);
  useEffect(() => {
    if(typeof window !== "undefined"){
      // ToDo: Fix each render issue
      accessToken.current = localStorage.getItem("token");
    }
  });
  if (accessToken) {
    return children
  }
  Router.replace("/login").then();
  return null;
};
