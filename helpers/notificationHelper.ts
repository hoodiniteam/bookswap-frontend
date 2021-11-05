import {Dispatch, useContext} from "react";
import {NotificationContext} from "../components/UI/NotificationProvider";
import {nanoid} from "nanoid";

export type Note = {
  id: string
  type: string
  message: string
}

export type DispatchType = {
  type: string
  payload: Note
}

export const useNotification = () => {
  const dispatch: Dispatch<DispatchType> | null = useContext<Dispatch<DispatchType> | null>(NotificationContext);

  const successNotification = (message: string) => {
    dispatch && dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: nanoid(),
        type: "SUCCESS",
        message: message
      },
    })
  }

  const errorNotification = (message: string) => {
    dispatch && dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: nanoid(),
        type: "ERROR",
        message: message
      },
    })
  }

  return {
    successNotification,
    errorNotification
  }
};


