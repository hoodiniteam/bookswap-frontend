import classNames from 'classnames';
import React from 'react';
import Link from 'next/link';
const ButtonOutside = ({style = "outline", children, tag = "button", href, className, type = "button", ...props}: {style?: 'outline' | 'fill'; children?: React.ReactNode; tag?: 'button' | 'link'; href?: string; className?: string; type?: "button" | "submit" | "reset";}) => {
  const styles = {
    base: "block text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500 border-2 border-blue-600 rounded-md py-2 px-6 font-medium md:text-lg",
    outline: "text-blue-600",
    fill: "bg-blue-600 text-white"
  }
  if (tag === 'link' && href) {
    return <Link href={href} {...props} className={classNames(styles.base, styles[style], className)}>{children}</Link>
  }

  return <button {...props} type={type} className={classNames(styles.base, styles[style], className)}>{children}</button>
};

export default ButtonOutside;
