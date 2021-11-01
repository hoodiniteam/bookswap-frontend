import React, { useEffect, useState } from 'react';

type Note = {
  id: number
  type: string
  message: string
}

type NotificationItemProps = {
  message: string
  dispatch: Note
  id: number
}

const NotificationItem = ({ message, dispatch, id }: NotificationItemProps) => {
  const [lifeTime, setLifeTime] = useState(0)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [exit, setExit] = useState(false);

  const handleStart = () => {
    const id = setInterval(() => {
      setLifeTime((prev) => prev + 1)
    }, 1000)
    setIntervalId(id)
  }
  const handleStop = () => {
    if(intervalId){
      clearInterval(intervalId)
      setExit(true)
      const timer = setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
          id: id,
        })
      }, 300)
    }
  }
  useEffect( () => {
    console.log(lifeTime)
    if(lifeTime === 3) {
      handleStop()
    }
  }, [lifeTime])

  useEffect(() => {
    handleStart()
  }, [])

  return (
    <div className={`notificationItem ${exit ? 'exit' : ''}  flex w-96 h-20 bg-white my-3 p-5 shadow-md rounded-md`}>
      {message}
    </div>
  );
};

export default NotificationItem;