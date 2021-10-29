import {fragmentBook} from "./fragmentBook";
import {fragmentRecipient} from "./fragmentRecipient";
import {fragmentSender} from "./fragmentSender";
import {fragmentRoom} from "./fragmentRoom";

export const fragmentSwap = `
    id
    ${fragmentBook}
    recipient {    
      ${fragmentRecipient}
    }
    sender {
      ${fragmentSender}
    }
    ${fragmentRoom}
    status
`;
