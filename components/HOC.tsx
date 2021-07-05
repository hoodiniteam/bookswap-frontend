import React from "react";
import {useRouter} from "next/router";

const withAuth = (WrappedComponent: React.ComponentType) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();
      // @ts-ignore
      const accessToken = localStorage.getItem("token");
      if (!accessToken) {
        Router.replace("/login").then();
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default withAuth