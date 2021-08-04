import React from "react";
import Link from "next/link";
import {KeyIcon, UserCircleIcon} from "@heroicons/react/outline";

const navigation = [
    {name: 'Account', href: '/profile', icon: UserCircleIcon, current: true,},
    {name: 'My books', href: '/profile/books', icon: KeyIcon, current: false,},
]

const SidebarForProfile = (props: any) => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }
  const current = () => {
    navigation.map(item => {
      item.current = !item.current
    })
  }
    return (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                  >
                    <a
                      onClick={current}
                      className={classNames(
                          item.current
                              ? 'bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white'
                              : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                          'group rounded-md px-3 py-2 flex items-center text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon
                        className={classNames(
                            item.current
                                ? 'text-indigo-500 group-hover:text-indigo-500'
                                : 'text-gray-400 group-hover:text-gray-500',
                            'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                        <span className="truncate">{item.name}</span>
                      </a>
                  </Link>
                ))}
              </nav>
            </aside>
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              {props.children}
            </div>
          </div>
    )
}
export default SidebarForProfile