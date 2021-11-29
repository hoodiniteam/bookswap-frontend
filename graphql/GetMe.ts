import { fragmentUser } from './fragmentUser';

export const GetMe = `
  query{
    me{
      user{
        ${fragmentUser}
      }
    }
  }
`
