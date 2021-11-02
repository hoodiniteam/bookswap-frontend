import {fragmentBook} from "./fragmentBook";
import {fragmentBase} from "./fragmentBase";
import {fragmentRoom} from "./fragmentRoom";

export const GetRoomQuery = `
  query($id: String!){
    getRoom(id: $id){
      ${fragmentBase}
      ${fragmentRoom}
    }
  }
`
