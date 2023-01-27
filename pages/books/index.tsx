import React, { ChangeEvent, ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '../../components/pagination';
import Layout from '../../components/layout';
import BookWrapper from '../../components/BookWrapper';
import { useQueryWrapper } from '@/helpers/useQueryWrapper';
import { loader } from 'graphql.macro';
import { BooksStatus, GetEditionsQuery } from '@/gtypes';
import { Badge } from '@/components/Badge';

const GetEditions = loader('../../graphql/GetEditionsQuery.graphql');

const Index = () => {
  const [status, setStatus] = useState<BooksStatus | null>(null);
  const router = useRouter();
  const { query } = router;
  const currentPage = query.page ? Number(query.page) : 1;
  const recent = query.recent ? query.recent === 'true' : false;
  const popular = query.popular ? query.popular === 'true' : false;
  const limit = 30;

  const [{ data }] = useQueryWrapper<GetEditionsQuery>({
    query: GetEditions,
    variables: {
      offset: limit * (currentPage - 1),
      limit: limit,
      status: status,
      hasBooks: true,
      recent,
      popular,
    },
  });

  const statusChangeHandler = async (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.checked) {
      setStatus(ev.target.value as BooksStatus);
    } else {
      setStatus(null);
    }
  };

  const editions = data?.getEditions?.editions || [];
  const total = data?.getEditions?.count || 0;

  if (editions !== null) {
    return (
      <div className="">
        <h1 className="hidden sm:block text-2xl text-center text-white font-semibold mb-10">
          Все книги
        </h1>
        <div>
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="flex space-x-4 mb-4">
              <div>
                <label className="bg-white hover:bg-gray-50 transition-colors p-3 border rounded-md shadow cursor-pointer flex items-center">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    value={BooksStatus.Open}
                    onChange={statusChangeHandler}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <div className="ml-3 flex items-center">
                    <span>Показывать только доступные книги</span> <Badge className="whitespace-nowrap ml-2" status={BooksStatus.Open} />
                  </div>
                </label>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {editions.map((edition: any) => (
                <BookWrapper key={edition.id} book={edition} />
              ))}
            </ul>
          </div>
          {total > limit && <Pagination limit={limit} total={total} />}
        </div>
      </div>
    );
  }
  return null;
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'Books'} showBookHead={true}>
      {page}
    </Layout>
  );
};

export default Index;
