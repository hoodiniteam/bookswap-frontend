import React, { ReactElement, useState } from 'react';
import Layout from '../../components/layout';
import { useQueryWrapper } from '../../helpers/useQueryWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../helpers/locales';
import Link from 'next/link';
import { loader } from 'graphql.macro';
import { GetMeQuery, RoomFragment } from '../../generated/graphql';
import { AvatarComponent } from '../../components/avatars';
import BookCover from '../../components/BookCover';
import { format } from 'date-fns';
import { ArrowSmLeftIcon, ArrowSmRightIcon } from '@heroicons/react/outline';

const GetMe = loader('../../graphql/GetMe.graphql');

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const SwapChatListItem = ({room, user, actor}: {room: RoomFragment, user: any, actor: 'sender' | 'recipient'}) => {
  return (
    <li>
      <Link href={`/room/${room.id}`}>
        <a className='group p-2 w-full flex rounded-md border border-gray-300 shadow-sm space-x-1 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          <BookCover book={room.book.edition}/>
          <div className="flex-grow py-4 pr-4">
            <div className='flex items-center space-x-3'>
              <div className='block flex-shrink-0'>
                <AvatarComponent className='w-10' avatarStyle='Circle' {...room[actor].avatar} />
              </div>
              <div className='flex-shrink flex-grow block'>
                <div className='flex items-center justify-between block text-sm font-medium text-gray-900 truncate'>
                  <div className="flex">
                    <span>{room.book.title}</span>
                    {
                      actor === 'recipient' && (<ArrowSmRightIcon className="text-blue-600 h-5 w-5 ml-1" />)
                    }
                    {
                      actor === 'sender' && (<ArrowSmLeftIcon className="text-green-600 h-5 w-5 ml-1" />)
                    }
                  </div>
                  <span className="text-xs ml-1">{format(new Date(room.messages[room.messages.length - 1].createdAt), "dd.MM.yyyy")}</span>
                </div>
                <span className='block text-sm font-medium text-gray-500 truncate'>{room[actor].firstName} {room[actor].lastName}</span>
              </div>
            </div>
            <div style={{height: 88}} className="overflow-hidden text-sm py-1.5 px-2 bg-gray-200 rounded-md mt-2">
              { room.messages.slice(-5).map((message) => (<div className={message.userId === "system" ? 'text-center italic text-gray-600' : message.userId === user.id ? 'text-right' : 'text-left'} key={message.createdAt}>{message.message}</div>)) }
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}

const Swaps = () => {
  const [{ data: meData, fetching: fetchingMe }] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
  });
  const [activeTab, setActiveTab] = useState('all');

  if (fetchingMe) {
    return null;
  }

  const { user } = meData?.me || {};

  if (user) {
    const tabs = [
      { name: 'all', label: 'Все', count: user.swaps.length + user.sends.length },
      { name: 'receive', label: 'Получить', count: user.swaps.length },
      { name: 'send', label: 'Отдать', count: user.sends.length },
    ];

    return (
      <div>
        <p className='sm:text-white font-bold text-lg mb-3'>Свопы</p>
        <div className='bg-white py-6 px-4 space-y-6 sm:p-6 shadow rounded-md'>
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

          <ul role='list' className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {
              (activeTab === 'receive' || activeTab === 'all') && (
                user.chatRecipient.map((room) => (
                  <SwapChatListItem key={room.id} actor="sender" room={room} user={user} />
                ))
              )
            }
            {
              (activeTab === 'send' || activeTab === 'all') && (
                user.chatSender.map((room) => (
                  <SwapChatListItem key={room.id} actor="recipient" room={room} user={user} />
                ))
              )
            }
          </ul>

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
