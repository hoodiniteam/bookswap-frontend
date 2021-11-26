import React, { ReactElement } from 'react';
import Layout from '../../components/layout';
import BookWrapper from '../../components/book-wrapper';
import { GetMe } from '../../graphql/GetMe';
import { useQueryWrapper } from '../../helpers/useQueryWrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { localesList } from '../../helpers/locales';
import { Badge } from '../../components/Badge';
import { BooksStatus } from '../../types/Book';
import Button from '../../components/UI/Button';
import { useMutation } from 'urql';
import { SetBookOpenMutaion } from '../../graphql/SetBookOpenMutaion';
import { SetBookHoldMutaion } from '../../graphql/SetBookHoldMutation';

const MyBooks = () => {
  const [{data} ] = useQueryWrapper({
    query: GetMe
  })

  const [, setBookOpenMutation] = useMutation(SetBookOpenMutaion);
  const [, setBookHoldMutation] = useMutation(SetBookHoldMutaion);

  const setBookOpen = async (id: string) => {
    await setBookOpenMutation({
      id,
    });
  }

  const setBookHold = async (id: string) => {
    await setBookHoldMutation({
      id,
    });
  }

  if (data) {
    const user = data.me.user;
    console.log(user);
    const myBooks = user.books?.map((book: any) => ({...book.edition, status: book.status})) || [];
    console.log(myBooks);
    return(
      <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 space-y-4 divide-y">
        <div>
          <div className="flex font-medium items-center">
            <div className="text-2xl">Баланс:</div>
            <div className="ml-2 flex items-center text-lg">
              <img className="w-8" src="/images/origami-c.png"/>
              {user.points} BST (Bookswap Token)</div>
          </div>
          <div className="text-gray-600 mt-2 bg-gray-50 shadow inline-block py-2 px-3 rounded-md">
            <p>Каждый раз, когда вы <span className="text-red-400">берете</span> книгу <span className="text-red-400">вы тратите 1 BST</span></p>
            <p>Каждый раз, когда вы <span className="text-green-500">отдаете</span> книгу <span className="text-green-500">вы получаете 1 BST</span></p>
          </div>
        </div>
        <div className="pt-4">
          <div className="text-2xl font-medium">Мои книги</div>
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-5">
            {myBooks.map((book: any) => (
              <div key={book.id} className="relative flex flex-col">
                <div className="flex-grow">
                  <BookWrapper book={book} />
                  <Badge className="absolute right-2 top-2" status={book.status}/>
                </div>
                <div className="mt-2">
                  {book.status === BooksStatus[BooksStatus.HOLD] && (
                    <Button variant="secondary" className="w-full" onClick={() => setBookOpen(book.id)}>Сделать доступной</Button>
                  )}
                  {book.status === BooksStatus[BooksStatus.OPEN] && (
                    <Button variant="secondaryOutline" className="w-full" onClick={() => setBookHold(book.id)}>Убрать из доступных</Button>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  return null
}

MyBooks.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout title={MyBooks.name}>
        {page}
      </Layout>
  )
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...await serverSideTranslations(locale, localesList),
  },
})

export default MyBooks;
