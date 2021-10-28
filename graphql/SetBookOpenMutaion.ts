import {fragmentBook} from "./fragmentBook";
import {fragmentBase} from "./fragmentBase";

export const SetBookOpenMutaion = `
    mutation($id: String!){
      setBookOpen(id: $id) {
        ${fragmentBase}
        ${fragmentBook}
      }
    }
`;
