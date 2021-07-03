import React from "react";
import withAuth from "../components/HOC";


const Home = () => {

  return(
      <h1>HomePage</h1>
  )
}

export default withAuth(Home);