import { fragmentBase } from './fragmentBase';
import { fragmentSwap } from './fragmentSwap';

export const SetToSwappedMutation = `
mutation($swapId: String!){
  setToSwapped(swapId: $swapId) {
    ${fragmentBase}
    swap{
    ${fragmentSwap}
    }
  }
}
`
