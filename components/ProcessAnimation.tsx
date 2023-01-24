import React, { useState } from 'react';
import classNames from 'classnames';
import BookWrapperPromo from './BookWrapperPromo';
import { addDays, format } from 'date-fns';
import { ru } from 'date-fns/locale'

const ProcessAnimation = () => {
  const scroller = document.querySelector('#scroller');
  const [progress, setProgress] = useState(0);
  const [horizontalProgress, setHorizontalProgress] = useState(0);
  const startDate = new Date('2023-05-15');
  if (scroller) {
    scroller.addEventListener('scroll', (e) => {
      const processWrapper = document.querySelector('#processWrapper');
      const {top, height} = processWrapper?.getBoundingClientRect() || {top: 0, height: 0};
      if (top <=0) {
        const verticalProgress = Math.abs(top) / (height - window.innerHeight) * 100;
        setProgress(verticalProgress);
        const horizontalProgress = (1000 - window.innerWidth) * verticalProgress / 100;
        setHorizontalProgress(horizontalProgress);
      }
    });
  }
  return (
    <div id={'processWrapper'}>
      <div className={"flex container md:px-10 mx-auto sticky top-0 h-screen flex-col"}>
        <div className={"relative flex-grow flex items-center"}>
          <div className={"flex-grow space-y-10"}>
            <div className={"flex px-4 md:px-0 list-none justify-between items-center h-[325px]"}>
              <BookWrapperPromo
                className={classNames(
                  "transition-all transform-gpu duration-500 ease-in-out",
                  progress < 15 + 20 / 2 ? "opacity-100" : "opacity-0"
                )}
                book={{
                  'id': "cover",
                  'title': "Rework. Бизнес без предрассудков",
                  'image': "/images/rework_cover.jpg",
                  'authors':["Давид Хейнемейер Ханссон и Джейсон Фрайд"],
                  'publishedDate': "2013"
                }}
              />
              <li className={'w-0 shrink'}>
                <img style={{transform: 'rotateY(180deg) translateX(50%)'}} className={classNames(
                  'min-w-[100px] w-[100px]',
                  "transition-all transform-gpu duration-500 ease-in-out",
                  progress <= 15 + 20 / 2 || progress > 15 + 20 + 15 + 20 / 2 ? "opacity-0" : "opacity-100"
                )} src={'/images/origami-c.png'} />
              </li>
              <BookWrapperPromo
                className={classNames(
                  "transition-all transform-gpu duration-500 ease-in-out",
                  progress < 15 + 20 + 15 + 20 / 2 ? "opacity-0" : "opacity-100"
                )}
                book={{
                  'id': "cover",
                  'title': "Remote",
                  'image': "/images/remote_cover.jpg",
                  'authors':["David Heinemeier Hansson, Jason Fried"],
                  'publishedDate': "2013"
                }}
              />
            </div>
            <div className={"overflow-hidden md:overflow-visible max-w-[100vw] md:max-w-none"}>
              <div style={{transform: `translateX(-${horizontalProgress}px)`}} className={"flex pl-10 md:pl-0 w-[1000px] md:w-auto items-center"}>
                <div className={"pr-10 flex-grow"}>
                  <div className={"relative h-12 p-1 bg-gray-100 rounded-full shadow-inner"}>
                    <div className={"space-x-1 w-full h-full flex items-center"}>
                      <div className={"h-full bg-indigo-300 rounded-full w-[15%] shadow-md relative"}>
                        <div className={"absolute w-[230px] 2xl:w-[290px] left-0 h-40 bottom-1/2 font-medium uppercase py-1 px-3 border-l border-gray-300 text-2xl"}>Дочитали в мае</div>
                      </div>
                      <div className={classNames(
                        "h-full bg-green-400 rounded-full w-[20%] shadow-md relative",
                        "transition-all transform-gpu duration-500 ease-in-out",
                        progress < 15 / 2 ? "opacity-0 translate-x-[10%]" : "opacity-100 translate-x-0"
                      )}>
                        <div className={"absolute w-[230px] 2xl:w-[290px] flex items-end left-0 h-40 top-1/2 font-medium uppercase py-1 px-3 border-l border-gray-300 text-2xl"}>разместили на bookswap</div>
                      </div>
                      <div className={classNames(
                        "h-full bg-yellow-300 rounded-full w-[15%] shadow-md relative",
                        "transition-all transform-gpu duration-500 ease-in-out",
                        progress < 15 + 20 / 2 ? "opacity-0 translate-x-[10%]" : "opacity-100 translate-x-0"
                      )}>
                        <div className={"absolute w-[260px] 2xl:w-[290px] left-0 h-40 bottom-1/2 font-medium uppercase py-1 px-3 border-l border-gray-300 text-2xl"}>Отдали книгу, обменяли на bookswap токен</div>
                      </div>
                      <div className={classNames(
                        "h-full bg-slate-300 rounded-full w-[20%] shadow-md relative",
                        "transition-all transform-gpu duration-500 ease-in-out",
                        progress < 15 + 20 + 15 / 2 ? "opacity-0 translate-x-[10%]" : "opacity-100 translate-x-0"
                      )}>
                        <div className={"absolute w-[230px] 2xl:w-[290px] flex items-end left-0 h-40 top-1/2 font-medium uppercase py-1 px-3 border-l border-gray-300 text-2xl"}>ищите новую книгу</div>
                      </div>
                      <div className={classNames(
                        "h-full bg-orange-300 rounded-full w-[15%] shadow-md relative",
                        "transition-all transform-gpu duration-500 ease-in-out",
                        progress < 15 + 20 + 15 + 20 / 2 ? "opacity-0 translate-x-[10%]" : "opacity-100 translate-x-0"
                      )}>
                        <div className={"absolute w-[230px] 2xl:w-[290px] left-0 h-40 bottom-1/2 font-medium uppercase py-1 px-3 border-l border-gray-300 text-2xl"}>Обмениваете токен на новую книгу</div>
                      </div>
                      <div className={classNames(
                        "h-full bg-indigo-300 rounded-full w-[15%] shadow-md relative",
                        "transition-all transform-gpu duration-500 ease-in-out",
                        progress < 15 + 20 + 15 + 20 + 15 / 2 ? "opacity-0 translate-x-[10%]" : "opacity-100 translate-x-0"
                      )}>
                        <div className={"absolute w-[230px] 2xl:w-[290px] flex items-end left-0 h-40 top-1/2 font-medium uppercase py-1 px-3 border-l border-gray-300 text-2xl"}>читаете</div>
                      </div>
                    </div>
                    <div style={{left: `min(calc(0.5rem + ${progress}%), calc(100% - 90px - 0.5rem))`}} className={"h-8 w-[90px] capitalize rounded-full left-2 flex items-center justify-center px-3 font-medium top-2 shadow-md absolute bg-white"}>
                      {format(addDays(startDate, progress / 2), "d MMM", {locale: ru})}
                    </div>
                  </div>
                </div>
                <div className={classNames(
                  "border-l h-80 flex w-[200px] text-center items-center pl-10 uppercase font-medium text-4xl",
                  "transition-all transform-gpu duration-500 ease-in-out",
                  progress < 99 ? "opacity-0 translate-x-[10%]" : "opacity-100 translate-x-0"

                )}>и все сначала</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"h-screen"}></div>
      <div className={"h-screen"}></div>
    </div>
  )
}

export default ProcessAnimation;
