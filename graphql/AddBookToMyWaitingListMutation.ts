import { fragmentBase } from './fragmentBase';
import { fragmentEditionExposed } from './fragmentEditionExposed';

export const AddBookToMyWaitingListMutation = `
  mutation($id:String!){
    addBookToMyWaitingList(id: $id){
      ${fragmentBase}
      edition {
        ${fragmentEditionExposed}
      }
    }
  }
`;
