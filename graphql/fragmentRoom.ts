import {fragmentRecipient} from "./fragmentRecipient";
import {fragmentSender} from "./fragmentSender";

export const fragmentRoom = `
    room {
        ${fragmentRecipient}
        ${fragmentSender}
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
