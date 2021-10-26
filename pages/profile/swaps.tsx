import React, {ReactElement, useEffect, useState} from 'react';
import Layout from "../../components/layout";
import SidebarForProfile from "../../components/sidebar-for-profile";
import {useQueryWrapper} from "../../helpers/useQueryWrapper";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../helpers/locales';

const GetSwapsQuery = `
query{
  me{
    user {
      swaps {
        status
        recipient{
          firstName
          lastName
          email
        }
        sender{
          firstName
          lastName
          email
        }
        book{
          title
          creator {
            email
          }
        }
      }
    }
  }
}
`

enum SwapStatus {
  CANCELED,
  CREATED,
  PAYMENT,
  DELIVERING,
  ARRIVED,
  DELIVERED,
  SWAPPED,
}

type SwapsTypes = {
  book:  string,
  senderName: string,
  senderLastName: string,
  senderEmail: string,
  recipientName: string,
  recipientLastName: string,
  recipientEmail: string,
  status: SwapStatus,
}

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
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    creatorEmail: 'jane.cooper@example.com',
    email: 'jane.cooper@example.com',
    status: 'Active',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
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

const Swaps = () => {
  const [swaps, setSwaps] = useState<SwapsTypes | []>([])
  const [{data}] = useQueryWrapper({
    query: GetSwapsQuery
  })
  const { t, i18n } = useTranslation("common");
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className="flex flex-col">
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
  );
};

Swaps.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout title={'Swaps'}>
        <SidebarForProfile>{page}</SidebarForProfile>
      </Layout>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, localesList),
  },
})

export default Swaps;
