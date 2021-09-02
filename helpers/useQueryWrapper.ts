import  {useEffect} from "react";
import {useQuery, UseQueryArgs} from "urql";
import LogOut from "./LogOut";

const useQueryWrapper = (arg: UseQueryArgs) => {
  const [result, reexecuteQuery] = useQuery(arg)
  useEffect(() => {
    if(result.error?.message.includes('Access denied!')){
      LogOut()
    }
  }, [result])
  const {data, fetching, error} = result
  return [data, fetching, error, reexecuteQuery]
}
export default useQueryWrapper