import {fragmentRecipient} from "./fragmentRecipient";
import {fragmentSender} from "./fragmentSender";
import {fragmentBook} from "./fragmentBook";

export const fragmentRoom = `
    room {
        id
        recipient {    
          ${fragmentRecipient}
        }
        sender {
          ${fragmentSender}
        }
        swap {
            id
            ${fragmentBook}
        }
        messages {
            createdAt
            message
            userId
            isRead
        }
    }
`;
