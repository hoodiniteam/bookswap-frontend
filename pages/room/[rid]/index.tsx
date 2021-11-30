import {useRouter} from "next/router";
import React, {ReactElement, useEffect} from "react";
import Layout from "../../../components/layout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {localesList} from "../../../helpers/locales";
import {useQueryWrapper} from "../../../helpers/useQueryWrapper";
import {GetRoomQuery} from "../../../graphql/GetRoomQuery";
import {useMutation} from "urql";
import {SendMessageMutation} from "../../../graphql/SendMessageMutation";
import { GetMe } from '../../../graphql/GetMe';
import Button from '../../../components/UI/Button';

const Room = () => {
  const router = useRouter()
  const {rid} = router.query;

  const [{data: roomData, fetching: fetchingRoom}, reexecuteQuery] = useQueryWrapper({
    query: GetRoomQuery,
    variables: {id: rid},
    pause: !rid,
  })
  const [{ data: meData, error, fetching }] = useQueryWrapper({
    query: GetMe,
  });
  const {id} = meData.me.user

  const [,sendMessage] = useMutation(SendMessageMutation);

  useEffect(() =>  {
    setInterval(async () => {
      await reexecuteQuery({ requestPolicy: 'network-only' })
    }, 6000)
  }, []);

  if (!roomData?.getRoom) {
    return null;
  }
  const {room} = roomData?.getRoom;

  const onEnterHandler = async (event: any) => {
    if(event.key === 'Enter') {
      await sendMessage({
        id: rid,
        message: event.target.value,
      })
    }
  }

  return (
    <div className="bg-white p-10 rounded-t-lg">
      <div className='text-center text-2xl pb-8 border-b'>{room.swap.book.title}</div>
      <div className="overflow-auto max-h-96 mt-5 flex justify-between w-full">
        <div className="flex flex-col w-full px-5">
      {
        room?.messages.map((message: any, idx: number) => (
          <div key={message.createdAt} className={`w-1/3 ${id === message.userId ? 'self-end' : 'self-start'}`}>
            <div className="message text-xs italic text-gray-500">{message.createdAt}</div>
            <div className='flex items-center'>
              {!message.isRead ? <span className='block w-2 h-2 bg-red-600 rounded-full mr-3'/> : ''}
              <div
                className={`px-5 py-1.5 w-full rounded-md text-white my-2 ${id === message.userId ? 'bg-main-500' : 'bg-green-500'}`}
              >
                {message.message}
              </div>
            </div>

          </div>
        ))
      }
        </div>
      </div>
        <input
          className=" w-full block bg-white py-2 pl-4 pr-3 border rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-600 focus:ring-white focus:border-white sm:text-sm"
          onKeyDown={onEnterHandler}
        />
      {/*{ fetchingRoom && <p>Loading...</p> }*/}
    </div>
  )
}

Room.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps = async ({locale}: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Room;
