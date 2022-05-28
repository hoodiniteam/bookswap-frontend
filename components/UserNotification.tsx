import Link from 'next/link';
import { dateTimeToHuman } from '../helpers/dateTime';

interface Notification {
  createdAt: string;
  message: string;
  isRead: boolean;
  url?: string | null;
}

const Notification = ({ notification }: {notification: Notification}) => {
  return (
    <div className="text-sm space-y-1 pt-3 px-4 overflow-hidden">
      <div className="text-gray-500 text-xs">{dateTimeToHuman(notification.createdAt)}</div>
      <div>{notification.message}</div>
    </div>
  )
}

export const UserNotification = ({ notification }: {notification: Notification}) => {
  if (notification.url) {
    return (
      <Link href={notification.url}>
        <a>
          <Notification notification={notification} />
        </a>
      </Link>
    )
  }
  return <Notification notification={notification} />;
}
