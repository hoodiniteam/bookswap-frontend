import React, {ReactElement, useEffect, useState} from "react";
import  {WithAuth} from "../../components/withAuth";
import {useRouter} from "next/router";
import Pagination from "../../components/pagination";
import Layout from "../../components/layout";
import BookWrapper from "../../components/book-wrapper";
import {useQueryWrapper} from "../../helpers/useQueryWrapper";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import { GetEditionsQuery } from "../../graphql/GetEditionsQuery";
import { localesList } from "../../helpers/locales";

const Index = () => {
  const [status, setStatus] = useState<string>('');
  const [search] = useState('');
  const [total, setTotal] = useState(0)
  const [editions, setEditions] = useState<any[]>([]);
  const [booksPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const router = useRouter()
  const variables = () => {
      const obj = {
          search: search,
          offset: offset,
          limit: booksPerPage,
      }
      if(status){
          return {...obj, status: status}
      }else{
          return obj
      }
  }
  const href = (page: number) => {
    if(status === ''){
      return `books?page=${page}`
    }else{
      return `books?page=${page}&status=${status}`
    }
  }

  const [{data}] = useQueryWrapper({
      query: GetEditionsQuery,
      variables: variables()
  })

  useEffect(() => {
    if(data){
      setEditions(data.getEditions.editions)
        setTotal(data.getEditions.count)

    }
  }, [data])

  const paginate = (page: number | string) => {
    let current = currentPage;
    if(page === 'previous' && currentPage > 1){
      current--
      setCurrentPage(current)
      router.push(`${href(current)}`)
    }if(page === 'next' && currentPage <= total/booksPerPage ){
      current++
      setCurrentPage(current)
      router.push(`${href(current)}`)
    }
  }

  useEffect(() => {
    router.push({query:{page: 1}})
  }, [])

  useEffect(()=>{
    if(router.query.page && data){
      setCurrentPage(+router.query.page)
      setStatus(`${router.query.status || ''}`)
    }
    setOffset((currentPage - 1) * booksPerPage)
  }, [router.query, data, currentPage, booksPerPage])

  if(editions !== null){
      return (
        <>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-5">
            {editions.map((edition) => (
              <BookWrapper key={edition.id} book={edition} />
            ))}
          </ul>
          <Pagination
            current={currentPage}
            href={href}
            booksPerPage={booksPerPage}
            totalBooks={total}
            paginate={paginate}
          />
        </>
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
export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, localesList),
  },
})
export default Index;
