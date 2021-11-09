import { fragmentBase } from './fragmentBase';

export const AcceptTradeMutation = `
mutation($id: String!) {
  acceptTrade(id: $id) {
  ${fragmentBase}
  }
}
`