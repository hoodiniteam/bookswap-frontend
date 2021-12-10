import React from 'react';
import Link from 'next/link';

export const NotificationLinkParser = ({message, children, className}: {message: string, children: any, className: string}) => {
  const injectedLinks = message.match(/\[(.*?)\]/gm) || [];
  console.log(injectedLinks);
  const parsedLinks = injectedLinks.map(link => {
    const grouped = link.slice(1, -1).split('|');
    return {
      origin: link,
      grouped,
    }
  });
  if (injectedLinks.length === 0) {
    return (
      <div className={className}>
        {children}
        <div>{message}</div>
      </div>
    )
  }
  return (<div className={className}>
    {
      parsedLinks.length === 1 &&
        <Link key={origin} href={`/${parsedLinks[0].grouped.slice(1).join('/')}`}>
            <a>
              {children}
              <div dangerouslySetInnerHTML={{__html: message.replaceAll(/\[(.*?)\]/gm, (replacer) => {
                  const match = parsedLinks.find(link => link.origin === replacer);
                  if (match) {
                    return `<span class="font-bold text-red-500">${match.grouped[0]}</span>`
                  }
                  return replacer;
                })}}/>{}
            </a>
        </Link>
    }
  </div>)
}
