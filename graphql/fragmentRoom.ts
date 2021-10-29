import {fragmentRecipient} from "./fragmentRecipient";
import {fragmentSender} from "./fragmentSender";

export const fragmentRoom = `
    room {
        recipient {    
          ${fragmentRecipient}
        }
        sender {
          ${fragmentSender}
        }
        swap {
            id
        }
        messages {
            createdAt
            message
            userId
        }
    }
`;
