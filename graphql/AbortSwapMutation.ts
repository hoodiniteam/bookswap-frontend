export const AbortSwapMutation = `
mutation($id: String!){
  abortSwap(swapId:$id){
    errors{
      message
    }
    status
    swap{
      status    
    }
  }
}
`