import {fragmentSwap} from "./fragmentSwap";
import {fragmentBase} from "./fragmentBase";

export const AbortSwapMutation = `
mutation($id: String!){
  abortSwap(swapId:$id){
    ${fragmentBase}
    swap {
        ${fragmentSwap}
    }
  }
}
`
