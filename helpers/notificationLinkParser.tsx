import React from 'react';
import Link from 'next/link';

export const NotificationLinkParser = ({message, children}: {message: string, children: any}) => {
  const injectedLinks = message.match(/(?<=\[)(.*?)(?=])/g) || [];
  console.log(message.match(/(?<=\[)(.*?)(?=])/g));
  const parsedLinks = injectedLinks.map(link => {
    const messageInfo = link.split('|');
    return {
      title: messageInfo[0],
      url: `${messageInfo[1]}/${messageInfo[2]}`
    }
  });
  return (<div>
    {parsedLinks.map(link => (
      <Link key={link.url} href={link.url}>
        <a>
          {message}
          {children}
          {message.replaceAll(/(?<=\[)(.*?)(?=])/g, (replacer) => replacer.split('|')[0])}
        </a>
      </Link>
    ))}
  </div>)
}
