export const AcceptTradeMutation = `
mutation($id: String!) {
  acceptTrade(id: $id) {
    status
    errors{
      message
    }
  }
}
`