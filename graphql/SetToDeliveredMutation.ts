import { fragmentBase } from './fragmentBase';
import { fragmentSwap } from './fragmentSwap';

export const SetToDeliveredMutation = `
mutation($swapId: String!){
  setToDelivered(swapId: $swapId) {
    ${fragmentBase}
    swap{
    ${fragmentSwap}
    }
  }
}
`
