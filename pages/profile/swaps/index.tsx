import React, { ReactElement, useState } from 'react';
import Layout from '../../../components/layout';
import { useQueryWrapper } from '../../../helpers/useQueryWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../../helpers/locales';
import Link from 'next/link';
import { loader } from 'graphql.macro';
import { GetMeQuery, RoomFragment } from '../../../generated/graphql';
import { AvatarComponent } from '../../../components/avatars';
import BookCover from '../../../components/BookCover';
import { format } from 'date-fns';
import { ArrowSmLeftIcon, ArrowSmRightIcon } from '@heroicons/react/outline';

const GetMe = loader('../../../graphql/GetMe.graphql');

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const SwapChatListItem = ({room, user, actor}: {room: RoomFragment, user: any, actor: 'sender' | 'recipient'}) => {
  return (
    <li>
      <Link href={`/profile/swaps/${room.id}`} shallow={true}>
        <a className='group p-2 w-full flex rounded-md border border-gray-300 shadow-sm space-x-1 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          <BookCover book={room.book.edition}/>
          <div className="flex-grow flex-shrink overflow-hidden py-4 pr-4">
            <div className='flex items-center space-x-3'>
              <div className='block flex-shrink-0'>
                <AvatarComponent className='w-10' avatarStyle='Circle' {...room[actor].avatar} />
              </div>
              <div className='flex-shrink overflow-hidden flex-grow block'>
                <div className='flex items-center justify-between block text-sm font-medium text-gray-900'>
                  <div className="flex flex-shrink overflow-hidden">
                    <span className="flex-shrink truncate">{room.book.title}</span>
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
              {
                room.messages.slice(-3).map((message) => (
                <div className={message.userId === "system" ? 'text-center italic text-gray-600' : message.userId === user.id ? 'text-right' : 'text-left'} key={message.createdAt}>
                  {message.message}
                </div>))
              }
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}

const Index = () => {
  const [{ data: meData, fetching: fetchingMe }] = useQueryWrapper<GetMeQuery>({
    query: GetMe,
    requestPolicy: "network-only",
  });
  const [activeTab, setActiveTab] = useState('all');

  if (fetchingMe) {
    return null;
  }

  const { user } = meData?.me || {};

  if (user) {
    const tabs = [
      { name: 'all', label: 'Все', count: user.chatRecipient.length + user.chatSender.length },
      { name: 'receive', label: 'Получить', count: user.chatRecipient.length },
      { name: 'send', label: 'Отдать', count: user.chatSender.length },
    ];

    return (
      <div>
        <p className='sm:text-white font-bold text-lg mb-3'>Свопы</p>
        <div className='bg-white py-4 px-6 shadow rounded-md'>
          <div>
            <div>
              <div className=''>
                <nav className='flex space-x-4' aria-label='Tabs'>
                  {tabs.map((tab) => (
                    <div
                      key={tab.name}
                      onClick={() => {
                        setActiveTab(tab.name);
                      }}
                      className={classNames(
                        tab.name === activeTab
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-500',
                        'hover:text-gray-700 px-3 py-2 font-medium text-sm rounded-md cursor-pointer',
                      )}
                      aria-current={tab.name === activeTab ? 'page' : undefined}
                    >
                      {tab.label}
                      {tab.count ? (
                        <span
                          className={classNames(
                            tab.name === activeTab ? 'bg-indigo-200 text-indigo-600' : 'bg-gray-200 text-gray-900',
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

          <div className="mt-2">

            <ul role='list' style={{height: 'calc(100vh - 250px)'}} className='grid grid-cols-1 lg:grid-cols-2 p-2 -mx-2 gap-4 overflow-auto'>
              {
                (activeTab === 'send' || activeTab === 'all') && (
                  user.chatSender.reverse().map((room) => (
                    <SwapChatListItem key={room.id} actor="recipient" room={room} user={user} />
                  ))
                )
              }
              {
                (activeTab === 'receive' || activeTab === 'all') && (
                  user.chatRecipient.reverse().map((room) => (
                    <SwapChatListItem key={room.id} actor="sender" room={room} user={user} />
                  ))
                )
              }
            </ul>

          </div>

        </div>
      </div>
    );
  }

  return null;
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout showHead={false} title={'Свопы'}>
      {page}
    </Layout>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, localesList),
  },
});

export default Index;
