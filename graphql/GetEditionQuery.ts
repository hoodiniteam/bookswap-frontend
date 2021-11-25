import { fragmentBase } from './fragmentBase';
import { fragmentEditionExposed } from './fragmentEditionExposed';

export const GetEditionQuery = `
  query($id:String!){
    getEdition(id:$id){
      ${fragmentBase}
      edition {
        ${fragmentEditionExposed}
      }
    }
  }
  `
