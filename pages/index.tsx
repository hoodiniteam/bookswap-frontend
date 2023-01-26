import React from "react";
import { LogoLogin } from '@/components/LogoLogin';
import ButtonOutside from '@/components/ButtonOutside';
import dynamic from 'next/dynamic';
import BookWrapperPromo from '@/components/BookWrapperPromo';

const ProcessAnimation = dynamic(
  () => import('@/components/ProcessAnimation'),
  { ssr: false }
)

export default function Index() {
  return (
    <div id={'scroller'} className={'relative bg-gray-50 overflow-y-auto h-screen overflow-x-hidden'}>
      <div className={'container md:px-10 px-4 mx-auto'}>
        <section className={'space-y-10 md:space-y-0'}>
          <nav className={'flex h-[100px] items-center justify-between'}>
            <div>
              <LogoLogin/>
            </div>
            <div className={'flex justify-between space-x-4 items-center'}>
              <ButtonOutside href={'/login'} style={'fill'} tag={'link'}>
                Войти
              </ButtonOutside>
              <ButtonOutside href={'/register'} style={'outline'} tag={'link'}>
                Регистрация
              </ButtonOutside>
            </div>
          </nav>
          <div className={'md:h-[calc(100vh-100px)] pb-10'}>
            <div className={'flex flex-col md:flex-row space-y-10 md:space-y-0 md:h-full justify-between md:space-x-10 items-center'}>
              <div className={'md:max-w-[400px] space-y-10'}>
                <h1 className={'font-medium text-center md:text-left text-4xl uppercase'}>Честный обмен прочитаных книг на нужные</h1>
                <p className={'hidden md:block text-[28px] uppercase'}>BookSwap это распределенная библиотека книг, где вы получаете столько, сколько отдаете</p>
                <p className={'hidden md:block text-[28px] uppercase'}>Отдавая книги вы получаете токены. Токены можно обменять на новые книги</p>
              </div>
              <div className={'relative hidden md:block flex-grow h-full'}>
                <img alt={'Пример интерфейса'} src={'/images/demo.png'} className={'h-full w-full object-cover object-left rounded-md ring-4 ring-white shadow-md'} />
              </div>
              <div className={'relative visible md:hidden w-full h-full'}>
                <img alt={'Пример интерфейса'} src={'/images/demo_mobile.png'} className={'h-full w-full object-cover object-left rounded-md ring-4 ring-white shadow-md'} />
              </div>
              <div className={'space-y-10 visible md:hidden'}>
                <p className={'md:hidden text-center text-[28px] uppercase'}>BookSwap это распределенная библиотека книг, где вы получаете столько, сколько отдаете</p>
                <p className={'md:hidden text-center text-[28px] uppercase'}>Отдавая книги вы получаете токены. Токены можно обменять на новые книги</p>
              </div>
            </div>
          </div>
        </section>
        <section className={'md:flex md:h-screen overflow-visible md:space-x-4 justify-center items-center'}>
          <div className={'relative'}>
            <div className={'w-full h-[500px] text-center transform translate-x-[0%]'}>
              <img className={'max-w-none transform translate-y-[0%] h-full w-full opacity-80'} src={'/images/compare_cloud_1.svg'} />
              <div className={'absolute w-full left-0 bottom-0'}>
                <BookWrapperPromo
                  className="inline-block text-left"
                  book={{
                    'id': "cover",
                    'title': "Rework. Бизнес без предрассудков",
                    'image': "/images/rework_cover.jpg",
                    'authors':["Давид Хейнемейер Ханссон и Джейсон Фрайд"],
                    'publishedDate': "2013"
                  }}
                />
                <p className={'text-4xl mt-10 uppercase'}>одна книга</p>
              </div>
            </div>
          </div>
          <div className={'relative'}>
            <div className={'w-full h-[500px] text-center transform translate-x-[0%]'}>
              <img className={'max-w-none transform translate-y-[0%] h-full w-full opacity-80'} src={'/images/compare_cloud_2.svg'} />
              <div className={'absolute w-full left-0 bottom-0'}>
                <div className={'h-[400px] flex items-center'}>
                  <img className={'w-[200px] mx-auto'} src={'/images/origami-c.png'} />
                </div>
                <p className={'text-4xl mt-4 uppercase'}>один Токен</p>
              </div>
            </div>
          </div>
        </section>
        <div className={'flex items-center h-[50vh] justify-center py-8'}>
          <p className={"uppercase text-4xl font-medium text-center"}>вы купили книгу в апреле</p>
        </div>
      </div>
      <ProcessAnimation />
      <footer className={'relative bg-lime-100 h-screen flex items-center justify-center text-center py-32'}>
        <div>
          <p className={'font-medium text-5xl mb-12 uppercase'}>у вас есть что обменять?</p>
          <ButtonOutside href={'/register'} tag={'link'} style={'fill'}>
            Регистрация
          </ButtonOutside>
        </div>
      </footer>
    </div>
  )
}
