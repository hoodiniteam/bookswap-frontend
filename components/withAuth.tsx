import React from "react";
import {useRouter} from "next/router";

export const WithAuth = ({children}: {children: JSX.Element}): null | JSX.Element => {
  if(typeof window !== "undefined"){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const Router = useRouter()
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      Router.replace("/login").then();
      return null;
    }
    return children
  }
  return null;
};

