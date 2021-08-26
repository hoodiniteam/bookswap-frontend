import React, {useEffect} from "react";
import {useQuery} from "urql";
import LogOut from "./LogOut";

const Test = (query: any, variables?: any) => {
  const [result,] = useQuery({
    query: query,
    variables: variables
  })
  useEffect(() => {
    if(result.error?.message.includes('Access denied!')){
      LogOut()
    }
  }, [result])

  return [result]
}
export default Test