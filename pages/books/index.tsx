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
  const [search] = useState<string | null>(null);
  const [total, setTotal] = useState(0)
  const [editions, setEditions] = useState<any[]>([]);
  const [booksPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const router = useRouter()

  const href = (page: number) => {
    if (status === '') {
      return `books?page=${page}`
    } else {
      return `books?page=${page}&status=${status}`
    }
  }

  const [{data}] = useQueryWrapper({
    query: GetEditionsQuery,
    variables: {
      search: search,
      offset: offset,
      limit: booksPerPage,
      status: "HOLD",
      hasBooks: true,
    }
  })

  useEffect(() => {
    if (data) {
      setEditions(data.getEditions.editions)
      setTotal(data.getEditions.count)
    }
  }, [data])

  const paginate = (page: number | string) => {
    let current = currentPage;
    if (page === 'previous' && currentPage > 1) {
      current--
      setCurrentPage(current)
      router.push(`${href(current)}`)
    }
    if (page === 'next' && currentPage <= total / booksPerPage) {
      current++
      setCurrentPage(current)
      router.push(`${href(current)}`)
    }
  }

  useEffect(() => {
    router.push({query: {page: 1}})
  }, [])

  useEffect(() => {
    if (router.query.page && data) {
      setCurrentPage(+router.query.page)
      setStatus(`${router.query.status || ''}`)
    }
    setOffset((currentPage - 1) * booksPerPage)
  }, [router.query, data, currentPage, booksPerPage])

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
              {editions.map((edition) => (
                <BookWrapper key={edition.id} book={edition}/>
              ))}
            </ul>
          </div>
          <Pagination
            current={currentPage}
            href={href}
            booksPerPage={booksPerPage}
            totalBooks={total}
            paginate={paginate}
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
