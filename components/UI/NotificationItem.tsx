import React, { Dispatch, useEffect, useState } from 'react';

type DispatchType = {
  type: string
  id: string
}

type NotificationItemProps = {
  message: string
  dispatch: Dispatch<DispatchType>
  id: string
  type: string
}

const NotificationItem = ({ message, dispatch, id, type }: NotificationItemProps) => {
  const [lifeTime, setLifeTime] = useState(0)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [exit, setExit] = useState(false);

  const handleStart = () => {
    const id = setInterval(() => {
      setLifeTime((prev) => prev + 1)
    }, 3000)
    setIntervalId(id)
  }
  const handleStop = () => {
    if(intervalId){
      clearInterval(intervalId)
      setExit(true)
      setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
          id: id,
        })
      }, 300)
    }
  }

  useEffect( () => {
    if(lifeTime === 3) {
      handleStop()
    }
  }, [lifeTime])

  useEffect(() => {
    handleStart()
  }, [])

  return (
    <div className={`notificationItem ${exit ? 'exit' : ''} ${ type === 'SUCCESS' ? 'success' : '' } ${ type === 'ERROR' ? 'error' : '' }`}>
      {message}
    </div>
  );
};

export default NotificationItem;
