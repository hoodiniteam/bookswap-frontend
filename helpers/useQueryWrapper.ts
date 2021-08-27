import React, {useEffect} from "react";
import {useQuery} from "urql";
import LogOut from "./LogOut";
import {OperationContext} from "@urql/core";

type Arguments = {
  query: string,
  variables?: any
  requestPolicy?: string
  pause?: boolean
  context?: Partial<OperationContext>
}

const useQueryWrapper = (arg: Arguments) => {
  const [result, reexecuteQuery] = useQuery({
    query: arg.query,
    variables: arg.variables,
    requestPolicy: "cache-and-network",
    pause: arg.pause,
    context: arg.context
  })
  useEffect(() => {
    if(result.error?.message.includes('Access denied!')){
      LogOut()
    }
  }, [result])
  const {data, fetching, error} = result

  return [data, fetching, error, reexecuteQuery]
}
export default useQueryWrapper