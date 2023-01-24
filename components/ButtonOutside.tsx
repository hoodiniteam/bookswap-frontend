import classNames from 'classnames';
import React from 'react';
import Link from 'next/link';
const ButtonOutside = ({type = "outline", children, tag = "button", href, ...props}: {type?: 'outline' | 'fill'; children?: React.ReactNode; tag?: 'button' | 'link'; href?: string}) => {
  const styles = {
    outline: "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500 border-2 border-blue-600 text-blue-600 rounded-md py-2 px-6 font-medium md:text-lg",
    fill: "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500 border-2 border-blue-600 bg-blue-600 text-white rounded-md py-2 px-6 font-medium md:text-lg"
  }
  if (tag === 'link' && href) {
    return <Link href={href} {...props} className={classNames(styles[type])}>{children}</Link>
  }

  return <button {...props} className={classNames(styles[type])}>{children}</button>
};

export default ButtonOutside;
