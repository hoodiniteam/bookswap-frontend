import React, {ReactElement, useState} from 'react';
import Layout from "../../components/layout";
import SidebarForProfile from "../../components/sidebar-for-profile";
import {useQueryWrapper} from "../../helpers/useQueryWrapper";
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {localesList} from '../../helpers/locales';
import {GetMe} from "../../graphql/GetMe";
import {SwapStatus} from "../../types/Swap";
import Button from "../../components/UI/Button";
import {useMutation} from "urql";
import {SetToDeliveringMutation} from "../../graphql/SetToDeliveringMutation";
import Link from 'next/link';
import { AbortSwapMutation } from '../../graphql/AbortSwapMutation';
import { AcceptTradeMutation } from '../../graphql/AcceptTrade';
import { SetToSwappedMutation } from '../../graphql/SetToSwappedMutation';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const CreatedSwap = ({swap}: any) => {
  const [, setToDelivering] = useMutation(SetToDeliveringMutation);

  const confirmSwap = async (swapId: string) => {
    await setToDelivering({
      swapId,
    })
  };

  return (
    <div className="py-3 px-4 border rounded-md">
      <div className="text-lg">
        {swap.book.title}
      </div>
      {swap.status === SwapStatus[SwapStatus.CREATED] && (
        <Button variant='primary' onClick={() => confirmSwap(swap.id)}>
          Подтвердить обмен
        </Button>
      )}
    </div>
  )
};

const ActiveSwap = ({swap, children}: any) => {
  const roomMembers = {
    [swap.room.sender.id]: swap.room.sender.email,
    [swap.room.recipient.id]: swap.room.recipient.email,
  }
  return (
    <div>
      <div className="relative block py-3 px-4 border rounded-md">
        <div className="text-lg mb-2">
          {swap.book.title}
        </div>
        <Link href={`/room/${swap.room.id}`}>
          <a className="block bg-gray-100 rounded-lg border p-2 max-w-lg">
            {swap.room?.messages.slice(-2).map((message: any, idx: number) => (
              <div key={idx} className="italic text-gray-500 text-sm">{roomMembers[message.userId]}: {message.message}</div>
            ))}
          </a>
        </Link>
      </div>
      <div className="flex mt-4 mb-6 justify-between">
        {children}
      </div>
    </div>
  )
}

const Swaps = () => {
  const [{data: meData, fetching: fetchingMe}] = useQueryWrapper({
    query: GetMe,
  });
  const [,abortSwapMutation ] = useMutation(AbortSwapMutation)
  const [,acceptTradeMutation ] = useMutation(AcceptTradeMutation)
  const [,setToSwappedMutation] = useMutation(SetToSwappedMutation)
  const {t} = useTranslation("common");
  const [activeTab, setActiveTab] = useState("receive");

  if (fetchingMe) {
    return null;
  }
  const cancelSwap = (swapId: string) => {
    abortSwapMutation({
      id: swapId
    }).then(res => console.log(res))
  }
  const acceptTrade = (swapId: string) => {
    acceptTradeMutation({
      id: swapId
    }).then(res => console.log(res))
  }
  const setToSwapped = (swapId: string) => {
    setToSwappedMutation({
      swapId: swapId
    }).then(res => console.log(res))
  }

  if (meData.me) {

    const {user} = meData.me;

    const tabs = [
      {name: 'receive', label: "Получить", count: user.swaps.length},
      {name: 'send', label: "Отдать", count: user.sends.length},
    ];

    return (
      <div>
        <div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
              id="tabs"
              name="tabs"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue={activeTab}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <div
                    key={tab.name}
                    onClick={() => {
                      setActiveTab(tab.name)
                    }}
                    className={classNames(
                      tab.name === activeTab
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                      'whitespace-nowrap cursor-pointer flex py-4 px-1 border-b-2 font-medium text-sm'
                    )}
                    aria-current={tab.name === activeTab ? 'page' : undefined}
                  >
                    {tab.label}
                    {tab.count ? (
                      <span
                        className={classNames(
                          tab.name === activeTab ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
                          'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block'
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
          activeTab === "receive" && (
            <div>
              <div className="text-xl py-4">Получить</div>
              {
                user.swaps.map((swap: any) => {
                  if (swap.status === SwapStatus[SwapStatus.CREATED]) {
                    return (
                      <CreatedSwap key={swap.id} swap={swap}/>
                    )
                  } else if (swap.room) {
                    return (
                      <ActiveSwap key={swap.id} swap={swap}>
                        <Button
                          onClick={() => setToSwapped(swap.id)}
                        >
                          Подтвердить получение
                        </Button>
                        {swap.status}
                        <Button
                          variant="dangerOutline"
                          onClick={() => cancelSwap(swap.id)}
                        >
                          Отменить своп
                        </Button>
                      </ActiveSwap>
                    )
                  }
                })
              }
            </div>
          )
        }
        {
          activeTab === "send" && (
            <div>
              <div className="text-xl py-4">Отдать</div>
              {
                user.sends.map((swap: any) => {
                  if (swap.status === SwapStatus[SwapStatus.CREATED]) {
                    return (
                      <CreatedSwap key={swap.id} swap={swap}/>
                    )
                  } else if (swap.room) {
                    return (
                      <ActiveSwap key={swap.id} swap={swap}>
                        <Button
                          onClick={() => setToSwapped(swap.id)}
                        >
                          Подтвердить отправку
                        </Button>
                        {swap.status}
                        <Button>Подтвердить отправку</Button>
                        <Button
                          onClick={() => cancelSwap(swap.id)}
                          variant="dangerOutline"
                        >
                          Отменить своп
                        </Button>
                      </ActiveSwap>
                    )
                  }
                })
              }
            </div>
          )
        }
      </div>
    );
  }

  return null;
};

Swaps.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'Swaps'}>
      <SidebarForProfile>{page}</SidebarForProfile>
    </Layout>
  )
}

export const getStaticProps = async ({locale}: any) => ({
  props: {
    ...await serverSideTranslations(locale, localesList),
  },
})

export default Swaps;
