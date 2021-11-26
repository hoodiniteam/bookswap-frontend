import React, {createContext, Dispatch, ReactNode, useReducer} from 'react';
import NotificationItem from './NotificationItem'
import {DispatchType} from "../../helpers/notificationHelper";

type PropsProvider = {
  children: ReactNode
}

type Note = {
  id: number
  type: string
  message: string
}

export const NotificationContext = createContext<Dispatch<DispatchType> | null>(null)

const NotificationProvider = ({children}: PropsProvider) => {
  const [state, dispatch] = useReducer((state: Note[], action: any) => {
    switch (action.type) {
      case 'ADD_NOTIFICATION':
        return [...state, {...action.payload}]
      case 'REMOVE_NOTIFICATION':
        return state.filter(el => {
          return el.id !== action.id
        })
      default:
        return state
    }
  }, []);

  return(
   <NotificationContext.Provider value={dispatch}>
     <div>
       <div className='fixed z-10 top-6 right-4'>
         {state.map(note => {
           return <NotificationItem dispatch={dispatch} message={note.message} type={note.type} key={note.id} id={note.id} />
         })}
       </div>
      {children}
    </div>
   </NotificationContext.Provider>
  )
};

export default NotificationProvider;
