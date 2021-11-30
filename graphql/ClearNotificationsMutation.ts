import { fragmentUser } from './fragmentUser';

export const ClearNotificationsMutation = `
  mutation {
    clearNotifications {
      user {
        ${fragmentUser}
      }
    }
  }
`
