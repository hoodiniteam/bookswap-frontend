import React, { Fragment, ReactElement, useEffect, useRef, useState } from 'react';
import Layout from '../../../../components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../../../helpers/locales';
import SwapLayout from "../index";
import { useRouter } from 'next/router';
import { useQueryWrapper } from '../../../../helpers/useQueryWrapper';
import {
  ApproveSwapMutation,
  GetMeQuery,
  GetRoomQuery, InitSwapMutation,
  SendMessageMutation,
} from '../../../../generated/graphql';
import { useMutation } from 'urql';
import BookCover from '../../../../components/BookCover';
import { AvatarComponent } from '../../../../components/avatars';
import { format } from 'date-fns';
import Button from '../../../../components/UI/Button';
import {Dialog, Transition} from '@headlessui/react';

import { loader } from 'graphql.macro';
const GetMe = loader("../../../../graphql/GetMe.graphql");
const GetRoom = loader("../../../../graphql/GetRoom.graphql");
const SendMessage = loader("../../../../graphql/SendMessageMutation.graphql");
const InitSwap = loader("../../../../graphql/InitSwapMutation.graphql");
const ApproveSwap = loader("../../../../graphql/ApproveSwapMutation.graphql");

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [text, setText] = useState('')
  const [length, setLength] = useState(1)
  const [loader, showLoader] = useState(false);
  const [giveModalIsOpen, setGiveModalIsOpen] = useState(false)
  const [getModalIsOpen, setGetModalIsOpen] = useState(false)

  const [{ data: roomData }, reexecuteQuery] = useQueryWrapper<GetRoomQuery>({
    query: GetRoom,
    variables: { id },
    pause: !id,
  });
  const [{ data: meData}] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
  });
  const { id: userId } = meData?.me?.user || {};

  const [, sendMessage] = useMutation<SendMessageMutation>(SendMessage);
  const [, initSwap] = useMutation<InitSwapMutation>(InitSwap);
  const [, approveSwap] = useMutation<ApproveSwapMutation>(ApproveSwap);

  const ref = useRef<HTMLDivElement>(null);

  const initSwapHandler = async () => {
    await initSwap({
      roomId: id
    });
    setGiveModalIsOpen(false);
  };

  const approveSwapHandler = async (swapId?: string) => {
    if (swapId) {
      await approveSwap({
        swapId,
      });
      setGetModalIsOpen(false);
    }
  };

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTo({
        behavior: 'smooth',
        top: ref.current.scrollHeight,
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [length])

  useEffect(() => {
    const updateChat = setInterval(async () => {
      await reexecuteQuery({ requestPolicy: 'network-only' });
    }, 10000);
    return () => {
      clearInterval(updateChat);
    }
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
      const textToSend = text;
      setText('')
      showLoader(true);
      setTimeout(() => {
        scrollToBottom();
      })
      await sendMessage({
        id: id,
        message: textToSend,
      });
      showLoader(false);
    }
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
      await send(event);
    }
  };

  return (
    <div>
      <div className="bg-white px-2 pt-4 pb-1 rounded-md">
        <div className="flex items-center justify-between">
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
          {
            room.recipient.id === userId && <>
              {
                room.swap && room.swap.status === "INITIATED" &&
                <div>
                  <Button onClick={() => setGetModalIsOpen(true)}>{`Я получил книгу от ${room.sender.firstName}`}</Button>
                </div>
              }
            </>
          }
          {
            room.sender.id === userId && <>
              {
                !room.swap &&
                <div>
                  <Button onClick={() => setGiveModalIsOpen(true)}>{`Я передал книгу ${room.recipient.firstName}`}</Button>
                </div>
              }
              {
                room.swap && room.swap.status !== "CANCELED" &&
                <div>
                  <Button>{`Ожидаем подтверждения от ${room.recipient.firstName}`}</Button>
                </div>
              }
            </>
          }
        </div>
      </div>
      <div className='bg-white p-1 rounded-t-lg'>
        <div ref={ref as any} style={{height: 'calc(100vh - 520px)'}} className='overflow-auto border-b border-t mt-1 flex justify-between w-full'>
          <div className='flex flex-col w-full p-2'>
            {
              room?.messages.map((message: any) => (
                <div key={message.createdAt} className={`${'system' === message.userId ? 'self-center text-center' : userId === message.userId ? 'self-end' : 'self-start'}`}>
                  <div className={`flex items-center message text-xs italic text-gray-500 ${userId === message.userId ? 'justify-end' : 'justify-start'}`}>
                    {
                      'system' === message.userId ? '' :
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
                      className={`px-5 py-1.5 w-full rounded-md text-white my-2 ${'system' === message.userId ? 'bg-gray-400' : userId === message.userId ? 'bg-main-500' : 'bg-green-500'}`}
                    >
                      {message.message}
                    </div>
                  </div>
                </div>
              ))
            }
            {
              loader && (
                <div className="inline-flex justify-center items-center px-4 py-2 leading-6 text-sm shadow rounded-md text-gray-600 bg-gray-300 hover:bg-gray-400 transition ease-in-out duration-150 cursor-not-allowed">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </div>)
            }
            <div></div>
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
      </div>
      <Transition appear show={giveModalIsOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" open={giveModalIsOpen} onClose={() => setGiveModalIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Передача книги
                  </Dialog.Title>
                  <Dialog.Description>
                    Вы передаете книгу <span className="font-medium">{room.book.title}</span> пользователю <span className="font-medium">{room.recipient.firstName}</span>
                  </Dialog.Description>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      После передачи книги она исчезнет из вашей библиотеки, а вы получите 1 BST.
                      Вы уверены?
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button className="mr-4" variant="primary" onClick={initSwapHandler}>Передать книгу</Button>
                    <Button variant="secondaryOutline" onClick={() => setGiveModalIsOpen(false)}>Отмена</Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={getModalIsOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" open={getModalIsOpen} onClose={() => setGetModalIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Получение книги
                  </Dialog.Title>
                  <Dialog.Description>
                    Проверьте, что вы получили книгу <span className="font-medium">{room.book.title}</span> от <span className="font-medium">{room.sender.firstName}</span>
                  </Dialog.Description>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      После подтверждения книга появится в вашей библиотеке, а вы переведете 1 BST.
                      Вы уверены?
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button className="mr-4" variant="primary" onClick={() => approveSwapHandler(room.swap?.id)}>Подтвердить получение</Button>
                    <Button variant="secondaryOutline" onClick={() => setGetModalIsOpen(false)}>Отмена</Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
