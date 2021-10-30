import {fragmentBase} from "./fragmentBase";
import {fragmentSwap} from "./fragmentSwap";

export const SetToDeliveringMutation = `
  mutation($swapId: String!) {
    setToDelivering(swapId: $swapId) {
      ${fragmentBase}
      swap {
        ${fragmentSwap}
      }
    }
  }
`;
