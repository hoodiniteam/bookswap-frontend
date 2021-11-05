import {fragmentBook} from "./fragmentBook";
import {fragmentBase} from "./fragmentBase";

export const SetBookHoldMutaion = `
    mutation($id: String!){
      setBookHold(id: $id) {
        ${fragmentBase}
        ${fragmentBook} 
      }
    }
`;
