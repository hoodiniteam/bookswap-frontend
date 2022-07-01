import { User } from '../generated/graphql';

export const userName = (
  user?: Pick<User, 'firstName' | 'lastName' | 'email'>
) => {
  if (user?.firstName && user?.lastName) {
    return user.firstName + ' ' + user.lastName;
  }
  return user?.email || '~ Unknown ~';
};
