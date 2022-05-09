import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import Layout from '../../../components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../../helpers/locales';
import { useQueryWrapper } from '../../../helpers/useQueryWrapper';
import { useMutation } from 'urql';
import { SendMessageMutation } from '../../../graphql/SendMessageMutation';
import Button from '../../../components/UI/Button';
import { useTranslation } from 'react-i18next';
import { loader } from 'graphql.macro';
import { GetMeQuery, GetRoomQuery } from '../../../generated/graphql';
import BookCover from '../../../components/BookCover';
import { AvatarComponent } from '../../../components/avatars';
import { format } from 'date-fns';
const GetMe = loader("../../../graphql/GetMe.graphql");
const GetRoom = loader("../../../graphql/GetRoom.graphql");

const Room = () => {
  const router = useRouter();
  const { rid } = router.query;
  const {t} = useTranslation()
  const [text, setText] = useState('')
  const [length, setLength] = useState(1)

  const [{ data: roomData, fetching: fetchingRoom }, reexecuteQuery] = useQueryWrapper<GetRoomQuery>({
    query: GetRoom,
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
      <div className="bg-white p-4 rounded-md">
        <div className="flex">
          <div>
            <BookCover book={room.book.edition}/>
          </div>
          <div>
            <div className="text-xl font-medium">{room.book.title}</div>
            <div className="flex items-center">
              <AvatarComponent className='w-12' avatarStyle='Circle' {...room.book.holder} />
              <div className="ml-2">{room.book.holder.firstName} {room.book.holder.lastName}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white p-10 rounded-t-lg mt-4'>
      <div ref={ref as any} className='overflow-autol max-h-96 mt-5 flex justify-between w-full'>
        <div className='flex flex-col w-full lg:px-5 sm:px-0'>
          {
            room?.messages.map((message: any) => (
              <div key={message.createdAt} className={`lg:w-1/3 md:w-1/2 ${id === message.userId ? 'self-end' : 'self-start'}`}>
                <div className='message text-xs italic text-gray-500'>
                  {
                    id === message.userId ? (
                      <span>Вы: </span>
                    ) : (
                      <span>{getPartnerName(room, id)}: </span>
                    )
                  }
                  {format(new Date(message.createdAt), "dd.MM.yyyy HH.mm")}
                </div>
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

      <div className="flex items-start mt-6 space-x-4">
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
