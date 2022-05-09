import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Layout from '../../../../components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../../../helpers/locales';
import SwapLayout from "../index";
import { useRouter } from 'next/router';
import { useQueryWrapper } from '../../../../helpers/useQueryWrapper';
import { GetMeQuery, GetRoomQuery } from '../../../../generated/graphql';
import { useMutation } from 'urql';
import { SendMessageMutation } from '../../../../graphql/SendMessageMutation';
import BookCover from '../../../../components/BookCover';
import { AvatarComponent } from '../../../../components/avatars';
import { format } from 'date-fns';
import Button from '../../../../components/UI/Button';

import { loader } from 'graphql.macro';
const GetMe = loader("../../../../graphql/GetMe.graphql");
const GetRoom = loader("../../../../graphql/GetRoom.graphql");

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [text, setText] = useState('')
  const [length, setLength] = useState(1)

  const [{ data: roomData, fetching: fetchingRoom }, reexecuteQuery] = useQueryWrapper<GetRoomQuery>({
    query: GetRoom,
    variables: { id },
    pause: !id,
  });
  const [{ data: meData}] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
  });
  const { id: userId } = meData?.me?.user || {};

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
        id: id,
        message: text,
      });
      await reexecuteQuery()
    }
    setText('')
  }

  const getPartnerName = (room: GetRoomQuery["getRoom"]['room'], myId?: string) => {
    if (myId) {
      if (room.recipient.id === myId) {
        return `${room.sender.firstName} ${room.sender.lastName}`
      }
      return `${room.recipient.firstName} ${room.recipient.lastName}`
    }
    return null;
  }

  const onEnterHandler = async (event: any) => {
    if (event.key === 'Enter') {
      send(event)
    }
  };

  return (
    <div>
      <div className="bg-white px-2 pt-4 pb-1 rounded-md">
        <div className="flex">
          <div>
            <BookCover height={80} classes="p-1 mr-4" book={room.book.edition}/>
          </div>
          <div>
            <div className="text-lg font-medium">{room.book.title}</div>
            <div className="flex items-center">
              <AvatarComponent className='w-8' avatarStyle='Circle' {...room.book.holder.avatar} />
              <div className="ml-2">{room.book.holder.firstName} {room.book.holder.lastName}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white p-1 rounded-t-lg'>
        <div ref={ref as any} className='overflow-autol max-h-96 mt-1 flex justify-between w-full'>
          <div className='flex flex-col w-full px-2'>
            {
              room?.messages.map((message: any) => (
                <div key={message.createdAt} className={`${userId === message.userId ? 'self-end' : 'self-start'}`}>
                  <div className={`flex items-center message text-xs italic text-gray-500 ${userId === message.userId ? 'justify-end' : 'justify-start'}`}>
                    {
                      userId === message.userId ? (
                        <span>Вы: </span>
                      ) : (
                        <span>{getPartnerName(room, userId)}: </span>
                      )
                    }
                    {format(new Date(message.createdAt), "dd.MM.yyyy HH.mm")}
                  </div>
                  <div className='flex items-center'>
                    {!message.isRead ? <span className='block w-2 h-2 bg-red-600 rounded-full mr-3' /> : ''}
                    <div
                      className={`px-5 py-1.5 w-full rounded-md text-white my-2 ${userId === message.userId ? 'bg-main-500' : 'bg-green-500'}`}
                    >
                      {message.message}
                    </div>
                  </div>

                </div>
              ))
            }
          </div>
        </div>

        <div className="flex items-start mt-6 space-x-4 lg:px-4 sm:px-0">
          <div className="flex-shrink-0">
            <AvatarComponent className='w-10' avatarStyle='Circle' {...meData.me.user.avatar} />
          </div>
          <div className="min-w-0 flex-1">
            <form onSubmit={send}>
              <div className="border-b border-gray-200 focus-within:border-indigo-600">
                <label htmlFor="comment" className="sr-only">
                  Сообщение...
                </label>
                <textarea
                  rows={3}
                  name="comment"
                  id="comment"
                  className="block w-full border-0 border-b border-transparent p-0 pb-2 resize-none focus:ring-0 focus:border-indigo-600 sm:text-sm"
                  placeholder="Сообщение..."
                  defaultValue={''}
                  onKeyDown={onEnterHandler}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className="pt-2 flex justify-between">
                <div className="flex items-center space-x-5">
                </div>
                <div className="flex-shrink-0">
                  <Button type="submit">Отправить</Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        { fetchingRoom && <p>Loading...</p> }
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showHead={false} title={'Свопы'}>
      <SwapLayout>
        {page}
      </SwapLayout>
    </Layout>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, localesList),
  },
});

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default Index;
