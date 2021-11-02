import React, {ReactElement, useEffect, useState} from 'react';
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

const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    creatorEmail: 'jane.cooper@example.com',
    email: 'jane.cooper@example.com',
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]

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

const ActiveSwap = ({swap}: any) => {
  console.log(swap);
  return (
    <Link href={`/room/${swap.room.id}`}>
      <a className="block py-3 px-4 border rounded-md">
        <div className="text-lg">
          {swap.book.title}
        </div>
        {swap.room?.messages.map((message: any, idx: number) => (
          <div key={idx} className="italic text-gray-500 text-sm">{message.message}</div>
        ))}
      </a>
    </Link>
  )
}

const Swaps = () => {
  const [{data: meData, fetching: fetchingMe}] = useQueryWrapper({
    query: GetMe,
  });

  const {t} = useTranslation("common");
  const [activeTab, setActiveTab] = useState("receive");

  if (fetchingMe) {
    return null;
  }

  if (meData.me) {

    const {user} = meData.me;

    console.log(user);

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
                  }
                  else if (swap.room) {
                    return (
                      <ActiveSwap key={swap.id} swap={swap}/>
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
                  }
                  else if (swap.room) {
                    return (
                        <ActiveSwap key={swap.id} swap={swap}/>
                    )
                  }
                })
              }
            </div>
          )
        }
        <div className="flex flex-col mt-6">
          <div className="-my-2 overflow-x-hidden sm:-mx-6 ">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('sender')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('recipient')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('title')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t('status')}
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {people.map((person) => (
                    <tr key={person.title}>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={person.image} alt=""/>
                          </div>
                          <div className="ml-2">
                            <div className="text-sm font-medium text-gray-900">{person.name}</div>
                            <div className="text-sm text-gray-500">{person.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={person.image} alt=""/>
                          </div>
                          <div className="ml-2">
                            <div className="text-sm font-medium text-gray-900">{person.name}</div>
                            <div className="text-sm text-gray-500">{person.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{person.title}</div>
                        <div className="text-sm text-gray-500">{person.creatorEmail}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {person.status}
                        </span>
                      </td>
                      <td className="pl-4 pr-8 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-main-600 hover:text-main-900">
                          {t('edit')}
                        </a>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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
