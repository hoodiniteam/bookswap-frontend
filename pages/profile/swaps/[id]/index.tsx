import React, {
  Fragment,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import Layout from '../../../../components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../../../helpers/locales';
import { useRouter } from 'next/router';
import { useQueryWrapper } from '../../../../helpers/useQueryWrapper';
import {
  ApproveSwapMutation,
  GetMeQuery,
  GetRoomMessagesQuery,
  GetRoomQuery,
  InitSwapMutation,
  SendMessageMutation,
} from '../../../../generated/graphql';
import { useMutation } from 'urql';
import BookCover from '../../../../components/BookCover';
import { AvatarComponent } from '../../../../components/avatars';
import { format } from 'date-fns';
import Button from '../../../../components/Button';
import { Dialog, Transition } from '@headlessui/react';

import { loader } from 'graphql.macro';
import classNames from 'classnames';
import { ArrowCircleLeftIcon } from '@heroicons/react/outline';
const GetMe = loader('../../../../graphql/GetMe.graphql');
const GetRoom = loader('../../../../graphql/GetRoom.graphql');
const GetRoomMessages = loader('../../../../graphql/GetRoomMessages.graphql');
const SendMessage = loader('../../../../graphql/SendMessageMutation.graphql');
const InitSwap = loader('../../../../graphql/InitSwapMutation.graphql');
const ApproveSwap = loader('../../../../graphql/ApproveSwapMutation.graphql');

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [text, setText] = useState('');
  const [loader, setLoader] = useState(false);
  const [giveModalIsOpen, setGiveModalIsOpen] = useState(false);
  const [getModalIsOpen, setGetModalIsOpen] = useState(false);

  const [{ data: roomData }] = useQueryWrapper<GetRoomQuery>({
    query: GetRoom,
    variables: { id },
    pause: !id,
  });

  const [{ data: messagesData }, reexecuteQuery] =
    useQueryWrapper<GetRoomMessagesQuery>({
      query: GetRoomMessages,
      variables: { id },
      pause: !id,
    });

  const [{ data: meData }] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
  });

  const { user } = meData?.me || {};
  const { room } = roomData?.getRoom || {};
  const { messages = [] } = messagesData?.getRoomMessages.room || {};

  const [, sendMessage] = useMutation<SendMessageMutation>(SendMessage);
  const [, initSwap] = useMutation<InitSwapMutation>(InitSwap);
  const [, approveSwap] = useMutation<ApproveSwapMutation>(ApproveSwap);

  const bottomDivRef = useRef<HTMLDivElement>(null);

  const initSwapHandler = async () => {
    await initSwap({
      roomId: id,
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
    if (bottomDivRef.current) {
      bottomDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const updateChat = setInterval(async () => {
      if (!loader) {
        await reexecuteQuery({ requestPolicy: 'network-only' });
      }
    }, 10000);
    return () => {
      clearInterval(updateChat);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const send = async (event: any) => {
    event.preventDefault();
    if (text) {
      const textToSend = text;
      setText('');
      setLoader(true);
      await sendMessage({
        id,
        message: textToSend,
        date: new Date().toISOString(),
      });
      setLoader(false);
      setTimeout(() => {
        scrollToBottom();
      });
    }
  };

  const getPartnerName = (
    room?: GetRoomQuery['getRoom']['room'],
    myId?: string
  ) => {
    if (myId && room) {
      if (room.recipient.id === myId) {
        return `${room.sender.firstName} ${room.sender.lastName}`;
      }
      return `${room.recipient.firstName} ${room.recipient.lastName}`;
    }
    return null;
  };

  const onEnterHandler = async (event: any) => {
    if (event.key === 'Enter') {
      await send(event);
    }
  };

  const userType = (id: string) => {
    switch (id) {
      case 'system':
        return 'system';
      case user?.id:
      case 'PENDING':
        return 'user';
      default:
        return 'otherUser';
    }
  };

  const messageWrapperClass = (userId: string) =>
    classNames({
      'self-center text-center': userType(userId) === 'system',
      'self-end': userType(userId) === 'user',
      'self-start': userType(userId) === 'otherUser',
    });

  return (
    <div>
      {room && (
        <div className="bg-white px-2 pt-2 pb-2 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ArrowCircleLeftIcon
                onClick={() => router.push('/profile/swaps')}
                className="text-gray-500 cursor-pointer h-8 w-8 mr-3"
              />
              <div>
                <BookCover
                  height={80}
                  classes="p-1 mr-4"
                  book={room.book.edition}
                />
              </div>
              <div className="flex flex-col justify-center items-start">
                <div className="text-lg font-medium">{room.book.title}</div>
                <div className="flex items-center">
                  <AvatarComponent
                    className="w-8"
                    avatarStyle="Circle"
                    {...room.book.holder.avatar}
                  />
                  <div className="ml-2">
                    {room.book.holder.firstName} {room.book.holder.lastName}
                  </div>
                </div>
              </div>
            </div>
            {room.recipient.id === user?.id && (
              <>
                {room.swap && room.swap.status === 'INITIATED' && (
                  <div>
                    <Button
                      onClick={() => setGetModalIsOpen(true)}
                    >{`Я получил книгу от ${room.sender.firstName}`}</Button>
                  </div>
                )}
              </>
            )}
            {room.sender.id === user?.id && (
              <>
                {!room.swap && (
                  <div>
                    <Button
                      onClick={() => setGiveModalIsOpen(true)}
                    >{`Я передал книгу ${room.recipient.firstName}`}</Button>
                  </div>
                )}
                {room.swap && room.swap.status !== 'CANCELED' && (
                  <div>
                    <Button>{`Ожидаем подтверждения от ${room.recipient.firstName}`}</Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <div className="bg-white p-4 mt-4 rounded-md">
        <div
          style={{ height: 'calc(100vh - 520px)' }}
          className="overflow-auto mt-1 flex justify-between w-full"
        >
          <div className="flex flex-col w-full p-2">
            {messages.map((message) => (
              <div
                key={message.createdAt}
                className={messageWrapperClass(message.userId)}
              >
                <div
                  className={`flex items-center message text-xs italic text-gray-500 ${
                    userType(message.userId) === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  {userType(message.userId) === 'user' && <span>Вы: </span>}
                  {userType(message.userId) === 'otherUser' && (
                    <span>{getPartnerName(room, user?.id)}: </span>
                  )}
                  {format(new Date(message.createdAt), 'dd.MM.yyyy HH.mm')}
                </div>
                <div className="flex items-center">
                  {!message.isRead ? (
                    <div className="block w-2 h-2 bg-red-600 rounded-full shrink-0 mr-3" />
                  ) : (
                    ''
                  )}
                  <div
                    className={classNames(
                      'relative px-5 py-1.5 w-full rounded-md text-white my-2',
                      {
                        'bg-gray-400': userType(message.userId) === 'system',
                        'bg-main-500': userType(message.userId) === 'user',
                        'bg-green-500':
                          userType(message.userId) === 'otherUser',
                      },
                      {
                        'pl-10': message.userId === 'PENDING',
                      }
                    )}
                  >
                    {message.userId === 'PENDING' && (
                      <div className="absolute left-0 top-0 flex px-3 py-2 text-gray-600">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                    )}
                    {message.message}
                  </div>
                </div>
              </div>
            ))}
            <div ref={bottomDivRef}></div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 mt-4 rounded-md">
        <div className="flex items-start mt-6 space-x-4 lg:px-4 sm:px-0">
          <div className="flex-shrink-0">
            {user && (
              <AvatarComponent
                className="w-10"
                avatarStyle="Circle"
                {...user.avatar}
              />
            )}
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
              <div className="pt-4 flex justify-between">
                <div className="flex items-center space-x-5"></div>
                <div className="flex-shrink-0">
                  <Button type="submit">Отправить</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Transition appear show={giveModalIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          open={giveModalIsOpen}
          onClose={() => setGiveModalIsOpen(false)}
        >
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
                    Вы передаете книгу{' '}
                    <span className="font-medium">{room?.book.title}</span>{' '}
                    пользователю{' '}
                    <span className="font-medium">
                      {room?.recipient.firstName}
                    </span>
                  </Dialog.Description>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      После передачи книги она исчезнет из вашей библиотеки, а
                      вы получите 1 BST. Вы уверены?
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      className="mr-4"
                      variant="primary"
                      onClick={initSwapHandler}
                    >
                      Передать книгу
                    </Button>
                    <Button
                      variant="secondaryOutline"
                      onClick={() => setGiveModalIsOpen(false)}
                    >
                      Отмена
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={getModalIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          open={getModalIsOpen}
          onClose={() => setGetModalIsOpen(false)}
        >
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
                    Проверьте, что вы получили книгу{' '}
                    <span className="font-medium">{room?.book.title}</span> от{' '}
                    <span className="font-medium">
                      {room?.sender.firstName}
                    </span>
                  </Dialog.Description>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      После подтверждения книга появится в вашей библиотеке, а
                      вы переведете 1 BST. Вы уверены?
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      className="mr-4"
                      variant="primary"
                      onClick={() => approveSwapHandler(room?.swap?.id)}
                    >
                      Подтвердить получение
                    </Button>
                    <Button
                      variant="secondaryOutline"
                      onClick={() => setGetModalIsOpen(false)}
                    >
                      Отмена
                    </Button>
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
  return <Layout title={'Свопы'}>{page}</Layout>;
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, localesList)),
  },
});

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default Index;
