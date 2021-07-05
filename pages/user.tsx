import React from "react";
import {useQuery} from "urql";
import {useRouter} from "next/router";

const GetMe = `
query {
 me {
  user{
    email
  }
}
}
`
const User = () => {
  const router = useRouter()
  const [result, ] = useQuery({
    query: GetMe,
  });
  const {data, fetching, error} = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  return (
    <>
      <h1>Your email: {data.me.user.email}</h1>
      <button onClick={() => router.push('/home')}>To Homepage</button>
    </>
  )
}
export default User