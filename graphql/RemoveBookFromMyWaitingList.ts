import { fragmentBase } from './fragmentBase';
import { fragmentEditionExposed } from './fragmentEditionExposed';

export const RemoveBookFromMyWaitingList = `
   mutation($id:String!){
    removeBookFromMyWaitingList(id: $id){
      ${fragmentBase}
      edition {
        ${fragmentEditionExposed}
      }
    }
  }
`;
