import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Layout from '../../../components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../../helpers/locales';
import { useQueryWrapper } from '../../../helpers/useQueryWrapper';
import { GetRoomQuery } from '../../../graphql/GetRoomQuery';
import { useMutation } from 'urql';
import { SendMessageMutation } from '../../../graphql/SendMessageMutation';
import Button from '../../../components/UI/Button';
import { useTranslation } from 'react-i18next';
import { loader } from 'graphql.macro';
import { GetMeQuery } from '../../../generated/graphql';
const GetMe = loader("../../../graphql/GetMe.graphql");

const Room = () => {
  const router = useRouter();
  const { rid } = router.query;
  const {t} = useTranslation()
  const [text, setText] = useState('')
  const [length, setLength] = useState(1)

  const [{ data: roomData, fetching: fetchingRoom }, reexecuteQuery] = useQueryWrapper({
    query: GetRoomQuery,
    variables: { id: rid },
    pause: !rid,
  });
  const [{ data: meData}] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
  });
  const { id } = meData?.me?.user || {};

  const [, sendMessage] = useMutation(SendMessageMutation);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        behavior: 'smooth',
        top: ref.current.scrollHeight,
      });
    }
  }, [length])

  useEffect(() => {
    setInterval(async () => {
      await reexecuteQuery({ requestPolicy: 'network-only' });
    }, 6000);
  }, []);

  useEffect(() => {
    if(roomData?.getRoom.room){
      setLength(roomData.getRoom.room.messages.length)
    }
  }, [roomData?.getRoom])

  if (!roomData?.getRoom) {
    return null;
  }

  const { room } = roomData?.getRoom;

  const send = async (event: any) => {
    event.preventDefault()
    if(text){
      await sendMessage({
        id: rid,
        message: text,
      });
    }
    setText('')
  }

  const onEnterHandler = async (event: any) => {
    if (event.key === 'Enter') {
      send(event)
    }
  };

  return (
    <div className='bg-white p-10 rounded-t-lg'>
      <div className='text-center text-2xl pb-8 border-b'>{room.book.title}</div>
      <div ref={ref as any} className='overflow-y-scroll max-h-96 mt-5 flex justify-between w-full'>
        <div className='flex flex-col w-full lg:px-5 sm:px-0'>
          {
            room?.messages.map((message: any) => (
              <div key={message.createdAt} className={`lg:w-1/3 md:w-1/2 ${id === message.userId ? 'self-end' : 'self-start'}`}>
                <div className='message text-xs italic text-gray-500'>{message.createdAt}</div>
                <div className='flex items-center'>
                  {!message.isRead ? <span className='block w-2 h-2 bg-red-600 rounded-full mr-3' /> : ''}
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
      <form className='flex items-center mt-10 lg:px-5' onSubmit={send}>
        <input
          className='w-full block bg-white py-2 pl-4 pr-3 border rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-600 focus:ring-white focus:border-white sm:text-sm'
          onKeyDown={onEnterHandler}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type='submit' className='ml-3' variant='secondary'>{t('send')}</Button>
      </form>

        { fetchingRoom && <p>Loading...</p> }
    </div>
  );
};

Room.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export default Room;
