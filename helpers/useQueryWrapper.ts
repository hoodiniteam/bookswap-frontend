import  {useEffect} from "react";
import {useQuery, UseQueryArgs} from "urql";
import LogOut from "./LogOut";

export const useQueryWrapper = <T>(arg: UseQueryArgs) => {
  const result = useQuery<T>(arg);
  useEffect(() => {
    if(result[0].error?.message.includes('Access denied!')){
      LogOut()
    }
  }, [result])
  return result;
}
