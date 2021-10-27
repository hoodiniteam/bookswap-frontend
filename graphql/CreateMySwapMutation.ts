import {fragmentSwap} from "./fragmentSwap";
import {fragmentBase} from "./fragmentBase";

export const CreateMySwapMutation = `
mutation($editionId: String!){
  createMySwap(editionId: $editionId) {
    ${fragmentBase}
    ${fragmentSwap}
  }
}
`
