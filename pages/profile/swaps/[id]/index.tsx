import React, {
  Fragment,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import { useQueryWrapper } from '@/helpers/useQueryWrapper';
import {
  ApproveSwapMutation,
  GetMeQuery,
  GetRoomQuery,
  InitSwapMutation,
  SendMessageMutation,
  SendMessageMutationVariables,
} from '@/gtypes';
import { useMutation } from 'urql';
import BookCover from '@/components/BookCover';
import { AvatarComponent } from '@/components/avatars';
import { format } from 'date-fns';
import Button from '../../../../components/Button';
import { Dialog, Transition } from '@headlessui/react';

import { loader } from 'graphql.macro';
import classNames from 'classnames';
import { ArrowCircleLeftIcon } from '@heroicons/react/outline';
import { userName } from '@/helpers/parseUserName';
const GetMe = loader('../../../../graphql/GetMe.graphql');
const GetRoom = loader('../../../../graphql/GetRoom.graphql');
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

  const [{ data: roomData }, reexecuteQuery] = useQueryWrapper<GetRoomQuery>({
    query: GetRoom,
    variables: { id },
    pause: !id,
  });

  const [{ data: meData }] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
  });

  const { user } = meData?.me || {};
  const { chat } = roomData?.getRoom || {};
  const { messages = [] } = chat || {};

  const [, sendMessage] = useMutation<
    SendMessageMutation,
    SendMessageMutationVariables
  >(SendMessage);
  const [, initSwap] = useMutation<InitSwapMutation>(InitSwap);
  const [, approveSwap] = useMutation<ApproveSwapMutation>(ApproveSwap);

  const bottomDivRef = useRef<HTMLDivElement>(null);

  const initSwapHandler = async () => {
    if (chat) {
      await initSwap({
        chatId: id,
        bookId: chat.book.id,
        recipientId: chat.recipient.id,
      });
      setGiveModalIsOpen(false);
    }
  };

  const approveSwapHandler = async (swapId?: string) => {
    if (swapId && chat) {
      await approveSwap({
        swapId,
        bookId: chat.book.id,
      });
      // ToDo: Обновить баланс пользователя
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
    if (text && typeof id === 'string') {
      const textToSend = text;
      setText('');
      setLoader(true);
      await sendMessage({
        chatId: id,
        message: textToSend,
        date: new Date().toISOString(),
      });
      setLoader(false);
      setTimeout(() => {
        scrollToBottom();
      });
    }
  };

  const getPartner = (
    chat?: GetRoomQuery['getRoom']['chat'],
    myId?: string
  ) => {
    if (myId && chat) {
      if (chat.recipient.id === myId) {
        return chat.sender;
      }
      return chat.recipient;
    }
  };

  const getPartnerName = (
    chat?: GetRoomQuery['getRoom']['chat'],
    myId?: string
  ) => {
    if (myId && chat) {
      if (chat.recipient.id === myId) {
        return `${chat.sender.firstName} ${chat.sender.lastName}`;
      }
      return `${chat.recipient.firstName} ${chat.recipient.lastName}`;
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
      case 'bookSend':
      case 'bookReceived':
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
    <div style={{height: `calc(var(--vh, 1vh) * 100 - 64px)`}} className="sm:px-4 fixed left-0 top-0 overflow-hidden pb-16 mt-[64px] w-full">
      <div className="flex flex-col h-full overflow-hidden">
        {chat && (
          <div className="bg-white px-2 pt-2 pb-2 rounded-md">
            <div className="space-y-2 sm:space-y-0 sm:flex items-center justify-between">
              <div className="flex items-center">
                <button
                  className="mr-3"
                  onClick={() => router.push('/profile/swaps')}>
                  <ArrowCircleLeftIcon
                    className="text-gray-500 cursor-pointer h-10 w-10"
                  />
                </button>
                <BookCover height={80} classes="p-1 mr-4" book={chat.book} />
                <div className="flex flex-col justify-center items-start">
                  <div className="text-lg font-medium">{chat.book.title}</div>
                  <div className="flex items-center mt-2">
                    <span className="mr-2">Диалог:</span>
                    <AvatarComponent
                      className="w-8 -mt-1"
                      avatarStyle="Circle"
                      {...getPartner(chat, user?.id)?.avatar}
                    />
                    <div className="ml-2">
                      {userName(getPartner(chat, user?.id))}
                    </div>
                  </div>
                </div>
              </div>
              {chat.recipient.id === user?.id && (
                <>
                  {chat.swap && chat.swap.status === 'INITIATED' && (
                    <Button
                      className="w-full sm:w-auto"
                      onClick={() => setGetModalIsOpen(true)}
                    >{`Я получил книгу от ${userName(chat.sender)}`}</Button>
                  )}
                </>
              )}
              {chat.sender.id === user?.id && (
                <>
                  {!chat.swap && (
                    <Button
                      className="w-full sm:w-auto"
                      onClick={() => setGiveModalIsOpen(true)}
                    >{`Передать книгу -> ${userName(chat.recipient)}`}</Button>
                  )}
                  {chat.swap &&
                    chat.swap.status !== 'CANCELED' &&
                    chat.swap.status !== 'APPROVED' && (
                      <Button
                        variant="primaryOutline"
                        className="w-full sm:w-auto"
                      >{`Ожидаем подтверждения от ${userName(
                        chat.recipient
                      )}`}</Button>
                    )}
                </>
              )}
              {chat.swap && chat.swap.status === 'APPROVED' && (
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 font-medium text-center text-white px-4 py-2 rounded-md">
                  🥳 Книга передана
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex-grow bg-white overflow-auto mt-4 rounded-md">
          <div className="mt-1 flex justify-between w-full">
            <div className="flex flex-col w-full p-2">
              {messages
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).valueOf() -
                    new Date(b.createdAt).valueOf()
                )
                .map((message) => (
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
                        <span>{getPartnerName(chat, user?.id)}: </span>
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
                            'bg-gray-100 border text-gray-800':
                              userType(message.userId) === 'system',
                            'bg-main-500': userType(message.userId) === 'user',
                            'bg-emerald-500':
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
                        {message.userId === 'bookSend' && (
                          <div>
                            <div>
                              {userName(chat?.sender)} подтвердил, что передал
                              книгу {userName(chat?.recipient)}
                            </div>
                            {chat?.recipient.id === user?.id &&
                              chat?.swap &&
                              chat?.swap.status === 'INITIATED' && (
                                <div className="my-4">
                                  <Button
                                    className="w-full"
                                    onClick={() => setGetModalIsOpen(true)}
                                  >{`Я получил книгу от ${userName(
                                    chat?.sender
                                  )}`}</Button>
                                </div>
                              )}
                          </div>
                        )}
                        {message.userId === 'bookReceived' && (
                          <div>
                            <div>
                              {userName(chat?.recipient)} подтвердил, что
                              получил книгу от {userName(chat?.sender)}
                            </div>
                            {chat?.swap && chat?.swap.status === 'APPROVED' && (
                              <div className="my-4 bg-gradient-to-r from-orange-400 to-pink-500 font-medium text-center text-white px-4 py-2 rounded-md">
                                🥳 Книга передана
                              </div>
                            )}
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
          <div className="">
            <div className="">
              <form onSubmit={send}>
                <div className="flex space-x-4 items-center">
                  <input
                    name="comment"
                    id="comment"
                    className="block p-2 rounded-md w-full border sm:text-sm"
                    placeholder="Напишите сообщение здесь"
                    onKeyDown={onEnterHandler}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <div className="flex-shrink-0">
                    <Button type="submit">Отправить</Button>
                  </div>
                </div>
              </form>
            </div>
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
                    <span className="font-medium">{chat?.book.title}</span>{' '}
                    пользователю{' '}
                    <span className="font-medium">
                      {userName(chat?.recipient)}
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
                    <span className="font-medium">{chat?.book.title}</span> от{' '}
                    <span className="font-medium">
                      {userName(chat?.sender)}
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
                      onClick={() => approveSwapHandler(chat?.swap?.id)}
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default Index;
