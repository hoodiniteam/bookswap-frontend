import React from "react";
import {useRouter} from "next/router";
import withAuth from "../components/HOC";
const Home = () => {
  return (
    <>
      <h1>HomePage</h1>
      <div className="flex justify-between items-center w-72 mt-5 px-5">

      </div>
    </>
  )
}
export default withAuth(Home);