import React, { ReactElement, useState } from 'react';
import Layout from '../../components/layout';
import { useQueryWrapper } from '../../helpers/useQueryWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../helpers/locales';
import { GetMe } from '../../graphql/GetMe';
import { SwapStatus } from '../../types/Swap';
import Button from '../../components/UI/Button';
import { useMutation } from 'urql';
import { SetToDeliveringMutation } from '../../graphql/SetToDeliveringMutation';
import Link from 'next/link';
import { AbortSwapMutation } from '../../graphql/AbortSwapMutation';
import { SetToSwappedMutation } from '../../graphql/SetToSwappedMutation';
import { SetToDeliveredMutation } from '../../graphql/SetToDeliveredMutation';
import BookWrapper from '../../components/BookWrapper';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const CreatedSwap = ({ swap }: any) => {
  const [, setToDelivering] = useMutation(SetToDeliveringMutation);

  const confirmSwap = async (swapId: string) => {
    await setToDelivering({
      swapId,
    });
  };

  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <BookWrapper book={swap.book.edition}/>
      <div className="col-span-3 flex items-center justify-center">
        {swap.status === SwapStatus[SwapStatus.CREATED] && (
          <Button variant='primary' onClick={() => confirmSwap(swap.id)}>
            Подтвердить обмен
          </Button>
        )}
      </div>
    </ul>
  );
};

const ActiveSwap = ({ swap, children, myId }: any) => {
  const roomMembers = {
    [swap.room.sender.id]: swap.room.sender.email,
    [swap.room.recipient.id]: swap.room.recipient.email,
  };

  const unread = swap.room.messages.filter((message: any) => !message.isRead && message.userId !== myId);
  console.log(swap.room.messages);

  return (
    <div>
      <div className='relative grid grid-cols-4 gap-4 bg-white block py-6 px-4 border rounded-md'>
        <BookWrapper book={swap.book.edition}/>
        <div className="col-span-3 flex flex-col">
          <div className="flex-grow">
            <div>Чат:</div>
            <Link href={`/room/${swap.room.id}`}>
              <a className="flex items-center">
                <div
                  className={`flex-grow block bg-gray-100 rounded-lg border p-2 ${unread.length > 0 ? 'outline-main ring-blue-500' : ''}`}>
                  {swap.room?.messages.slice(-2).map((message: any) => (
                    <div key={message.createdAt} className='italic text-gray-500 text-sm'>{roomMembers[message.userId] || "Старт"}: {message.message}</div>
                  ))}
                </div>
                {unread.length > 0 && <span className='ml-6 text-main-500'>Новые сообщения: {unread.length}</span>}
              </a>
            </Link>
          </div>
          <div className='flex justify-between'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const Swaps = () => {
  const [{ data: meData, fetching: fetchingMe }] = useQueryWrapper({
    query: GetMe,
  });
  const [, abortSwapMutation] = useMutation(AbortSwapMutation);
  const [, setToSwappedMutation] = useMutation(SetToSwappedMutation);
  const [, setToDeliveredMutation] = useMutation(SetToDeliveredMutation);
  const [activeTab, setActiveTab] = useState('all');

  if (fetchingMe) {
    return null;
  }
  const cancelSwap = async (swapId: string) => {
    await abortSwapMutation({
      id: swapId,
    });
  };

  const setToDelivered = async (swapId: string) => {
    await setToDeliveredMutation({
      swapId: swapId,
    });
  };

  const setToSwapped = async (swapId: string) => {
    await setToSwappedMutation({
      swapId: swapId,
    });
  };

  if (meData.me) {

    const { user } = meData.me;

    const tabs = [
      { name: 'all', label: 'Все', count: user.swaps.length + user.sends.length },
      { name: 'receive', label: 'Получить', count: user.swaps.length },
      { name: 'send', label: 'Отдать', count: user.sends.length },
    ];

    return (
      <div>
        <p className="sm:text-white font-bold text-lg mb-3">Свопы</p>
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6 shadow rounded-md">
          <div>
            <div>
              <div className='border-b border-gray-200'>
                <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
                  {tabs.map((tab) => (
                    <div
                      key={tab.name}
                      onClick={() => {
                        setActiveTab(tab.name);
                      }}
                      className={classNames(
                        tab.name === activeTab
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                        'whitespace-nowrap cursor-pointer flex py-4 px-1 border-b-2 font-medium text-sm',
                      )}
                      aria-current={tab.name === activeTab ? 'page' : undefined}
                    >
                      {tab.label}
                      {tab.count ? (
                        <span
                          className={classNames(
                            tab.name === activeTab ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
                            'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block',
                          )}
                        >
                      {tab.count}
                    </span>
                      ) : null}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          {
            user.roomsSender.map((room) => (
              <div key={room.id}>{room.id}</div>
            ))
          }
          {
            (activeTab === 'receive' || activeTab === 'all') && (
              <div>
                {
                  user.swaps.map((swap: any) => {
                    if (swap.status === SwapStatus[SwapStatus.CREATED]) {
                      return (
                        <div key={swap.id} className='bg-white flex justify-between items-center py-3 px-4 border rounded-md'>
                          <div>
                            <div className='font-semibold text-lg'>
                              {swap.book.title}
                            </div>
                            <div className="italic text-gray-500">Ждем пока держатель подтвердит обмен</div>
                          </div>
                          <Button
                            variant='dangerOutline'
                            onClick={() => cancelSwap(swap.id)}
                          >
                            Отменить своп (+1 BST)
                          </Button>
                        </div>
                      );
                    } else if (swap.room) {
                      return (
                        <ActiveSwap key={swap.id} swap={swap} myId={user.id}>
                          <Button
                              variant='dangerOutline'
                              onClick={() => cancelSwap(swap.id)}
                          >
                            Отменить своп
                          </Button>
                          <div/>
                          {
                            swap.status === SwapStatus[SwapStatus.DELIVERED] && (
                              <Button
                                  onClick={() => setToSwapped(swap.id)}
                              >
                                Книга у меня!
                              </Button>
                            )
                          }
                        </ActiveSwap>
                      );
                    }
                  })
                }
              </div>
            )
          }
          {
            (activeTab === 'send' || activeTab === 'all') && (
              <div>
                {
                  user.sends.map((swap: any) => {
                    if (swap.status === SwapStatus[SwapStatus.CREATED]) {
                      return (
                        <CreatedSwap key={swap.id} swap={swap} />
                      );
                    } else if (swap.room) {
                      return (
                        <ActiveSwap key={swap.id} swap={swap}>
                          <Button
                              onClick={() => cancelSwap(swap.id)}
                              variant='dangerOutline'
                          >
                            Отменить своп
                          </Button>
                          <Button
                            onClick={() => setToDelivered(swap.id)}
                          >
                            Отдать книгу
                          </Button>
                        </ActiveSwap>
                      );
                    }
                  })
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }

  return null;
};

Swaps.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'Swaps'}>
      {page}
    </Layout>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, localesList),
  },
});

export default Swaps;
