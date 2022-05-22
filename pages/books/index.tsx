import React, {ReactElement/*, useState*/} from "react";
import {useRouter} from "next/router";
import Pagination from "../../components/pagination";
import Layout from "../../components/layout";
import BookWrapper from "../../components/BookWrapper";
import {useQueryWrapper} from "../../helpers/useQueryWrapper";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {localesList} from "../../helpers/locales";
import { loader } from 'graphql.macro';
import { GetEditionsQuery } from '../../generated/graphql';
const GetEditions = loader("../../graphql/GetEditionsQuery.graphql");
/*import {Badge} from "../../components/Badge";
import {BooksStatus} from "../../types/Book";*/

const Index = () => {
  // const [status, setStatus] = useState<Set<string> | null>(null);
  const router = useRouter();
  const {query} = router;
  const currentPage = query.page ? Number(query.page) : 1;
  const recent = query.recent ? query.recent === "true" : false;
  const popular = query.popular ? query.popular === "true" : false;
  const limit = 30;

  const [{data}] = useQueryWrapper<GetEditionsQuery>({
    query: GetEditions,
    variables: {
      offset: limit * (currentPage - 1),
      limit: limit,
      // status: status ? Array.from(status) : null,
      hasBooks: true,
      recent,
      popular,
    }
  })

  /*const statusChangeHandler = async (ev: any) => {
    await router.push("/books")
    if (!status) {
      setStatus(new Set([BooksStatus[ev.target.value]]));
    } else {
      if (ev.target.checked) {
        const clonedSet = new Set(status);
        clonedSet.add(BooksStatus[ev.target.value])
        setStatus(clonedSet);
      } else {
        const clonedSet = new Set(status);
        clonedSet.delete(BooksStatus[ev.target.value]);
        setStatus(clonedSet.size > 0 ? clonedSet : null);
      }
    }
  }*/

  const editions = data?.getEditions?.editions || [];
  const total = data?.getEditions?.count || 0;

  if (editions !== null) {
    return (
      <div className="">
        <h1 className='text-2xl text-center text-white font-semibold mb-10'>Книги</h1>
        <div>
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            {/*<div className="flex space-x-4">
              <div>
                <label className="cursor-pointer inline-flex items-center h-5">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    value={BooksStatus.OPEN}
                    onChange={statusChangeHandler}
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
                    onChange={statusChangeHandler}
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
                    onChange={statusChangeHandler}
                    value={BooksStatus.SWAPPING}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <Badge status={BooksStatus[BooksStatus.SWAPPING]}/>
                  </div>
                </label>
              </div>
            </div>*/}
            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {editions.map((edition: any) => (
                <BookWrapper key={edition.id} book={edition}/>
              ))}
            </ul>
          </div>
          {
            total > limit && <Pagination
                limit={limit}
                total={total}
            />
          }
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
