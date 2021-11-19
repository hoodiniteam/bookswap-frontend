import React, {ReactElement, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Pagination from "../../components/pagination";
import Layout from "../../components/layout";
import BookWrapper from "../../components/book-wrapper";
import {useQueryWrapper} from "../../helpers/useQueryWrapper";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetEditionsQuery} from "../../graphql/GetEditionsQuery";
import {localesList} from "../../helpers/locales";
import {Badge} from "../../components/Badge";
import {BooksStatus} from "../../types/Book";

const Index = () => {
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();
  const {query} = router;
  const currentPage = query.page ? Number(query.page) : 0;
  const limit = 2;

  const [{data}] = useQueryWrapper({
    query: GetEditionsQuery,
    variables: {
      offset: limit * (currentPage - 1),
      limit: limit,
      status: status,
      hasBooks: true,
    }
  })

  const editions = data?.getEditions?.editions || [];
  const total = data?.getEditions?.count || 0;

  if (editions !== null) {
    return (
      <div className="lg:grid items-start lg:grid-cols-12 lg:gap-x-5">
        <div className="bg-white space-y-5 rounded-lg shadow px-5 py-6 sm:px-6 col-span-3">
          <div>
            <div className="border-b py-1 text-gray-700 font-medium uppercase text-sm">Статус</div>
            <div className="space-y-3 mt-4">
              <div>
                <label className="cursor-pointer inline-flex items-center h-5">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    value={BooksStatus.OPEN}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <Badge status={BooksStatus[BooksStatus.OPEN]}/>
                  </div>
                </label>
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center h-5">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    value={BooksStatus.HOLD}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <Badge status={BooksStatus[BooksStatus.HOLD]}/>
                  </div>
                </label>
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center h-5">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    value={BooksStatus.SWAPPING}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <Badge status={BooksStatus[BooksStatus.SWAPPING]}/>
                  </div>
                </label>
              </div>
            </div>
          </div>
          {/*<div>
            <div className="border-b py-1 text-gray-700 font-medium uppercase text-sm">Категории</div>
            <div className="space-y-3 mt-4">
              <div>
                <label className="cursor-pointer inline-flex items-center h-5">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    value="Художественные"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    Художественные
                  </div>
                </label>
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center h-5">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    value="Бизнес"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    Бизнес
                  </div>
                </label>
              </div>
            </div>
          </div>*/}
        </div>
        <div className="col-span-9">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
              {editions.map((edition: any) => (
                <BookWrapper key={edition.id} book={edition}/>
              ))}
            </ul>
          </div>
          <Pagination
            limit={limit}
            total={total}
          />
        </div>
      </div>
    )
  }
  return null;
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'Books'}>
      {page}
    </Layout>
  )
}
export const getStaticProps = async ({locale}: any) => ({
  props: {
    ...await serverSideTranslations(locale, localesList),
  },
})
export default Index;
