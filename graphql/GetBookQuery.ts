import {fragmentBook} from "./fragmentBook";

export const GetBook = `
  query($id: String!){
    getBook(id: $id){
      ${fragmentBook}
    }
  }
`
