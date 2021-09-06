import  {useEffect} from "react";
import {useQuery, UseQueryArgs} from "urql";
import LogOut from "./LogOut";
import { UseQueryResponse } from 'urql/dist/types/hooks/useQuery'

export const useQueryWrapper = (arg: UseQueryArgs): UseQueryResponse => {
  const result = useQuery(arg);
  useEffect(() => {
    if(result[0].error?.message.includes('Access denied!')){
      LogOut()
    }
  }, [result])
  return result;
}
