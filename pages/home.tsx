import React from "react";
import {useRouter} from "next/router";
import withAuth from "../components/HOC";
const Home = () => {
  const router = useRouter()
  return (
    <>
      <h1>HomePage</h1>
      <div className="flex justify-between items-center w-64 mt-5 px-5">
        <button className="px-1.5 py-0.5 text-white bg-blue-400 rounded-full"
                onClick={() => router.push('/createBook')}>Add book
        </button>
        <button className="px-1.5 py-0.5 text-white bg-blue-400 rounded-full" onClick={() => router.push('/profile')}>About
          me
        </button>
      </div>
    </>
  )
}
export default withAuth(Home);