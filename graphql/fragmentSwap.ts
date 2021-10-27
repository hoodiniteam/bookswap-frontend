import {fragmentBook} from "./fragmentBook";
import {fragmentRecipient} from "./fragmentRecipient";
import {fragmentSender} from "./fragmentSender";
import {fragmentRoom} from "./fragmentRoom";

export const fragmentSwap = `
    swap {
        ${fragmentBook}
        ${fragmentRecipient}
        ${fragmentSender}
        ${fragmentRoom}
        status
    }
`;
