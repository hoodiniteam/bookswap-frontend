import {useRouter} from "next/router";
import React, {ReactElement} from "react";
import Layout from "../../../components/layout";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {localesList} from "../../../helpers/locales";
import {useQueryWrapper} from "../../../helpers/useQueryWrapper";
import {GetRoomQuery} from "../../../graphql/GetRoomQuery";

const Room = () => {
  const router = useRouter()
  const {rid} = router.query;

  const [{data: roomData, fetching: fetchingRoom}] = useQueryWrapper({
    query: GetRoomQuery,
    variables: {id: rid},
    pause: !rid,
  })

  if (fetchingRoom) return <p>Loading...</p>

  const {room} = roomData.getRoom;
  if (!room) {
    return null;
  }

  return (
    <div>
      <div>{room.swap.book.title}</div>
      {
        room?.messages.map((message: any, idx: number) => (
          <div key={idx} className="italic text-gray-500 text-sm">{message.message}</div>
        ))
      }
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
