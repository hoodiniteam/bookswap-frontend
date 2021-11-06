import {useRouter} from "next/router";
import React, {ReactElement, useEffect} from "react";
import Layout from "../../../components/layout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {localesList} from "../../../helpers/locales";
import {useQueryWrapper} from "../../../helpers/useQueryWrapper";
import {GetRoomQuery} from "../../../graphql/GetRoomQuery";
import {useMutation} from "urql";
import {SendMessageMutation} from "../../../graphql/SendMessageMutation";

const Room = () => {
  const router = useRouter()
  const {rid} = router.query;

  const [{data: roomData, fetching: fetchingRoom}, reexecuteQuery] = useQueryWrapper({
    query: GetRoomQuery,
    variables: {id: rid},
    pause: !rid,
  })

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
    <div>
      <div>{room.swap.book.title}</div>
      {
        room?.messages.map((message: any, idx: number) => (
          <div key={message.createdAt}>
            <div>{message.message}</div>
            <div className="text-xs italic text-gray-500">{message.createdAt}</div>
          </div>
        ))
      }
      <input
        className="mt-4 block w-full bg-white py-2 pl-4 pr-3 border rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-600 focus:ring-white focus:border-white sm:text-sm"
        onKeyDown={onEnterHandler}
      />
      { fetchingRoom && <p>Loading...</p> }
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
