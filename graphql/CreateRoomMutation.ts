import { fragmentRoom } from './fragmentRoom';
import { fragmentBase } from './fragmentBase';

export const CreateRoomMutation = `
mutation($bookId: String!){
  createRoom(bookId: $bookId) {
    ${fragmentBase}
    ${fragmentRoom}
  }
}
`
