import {fragmentBase} from "./fragmentBase";
import {fragmentRoom} from "./fragmentRoom";

export const SendMessageMutation = `
    mutation($id: String!, $message: String!){
      sendMessage(id: $id, message: $message) {
        ${fragmentBase}
        ${fragmentRoom}
      }
    }
`;
