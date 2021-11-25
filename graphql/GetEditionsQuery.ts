import {fragmentBase} from "./fragmentBase";
import {fragmentEdition} from "./fragmentEdition";

export const GetEditionsQuery =`
query($search: String, $offset: Float, $limit: Float, $hasBooks: Boolean, $status: [BooksStatus!]){
  getEditions(search: $search, offset: $offset, limit: $limit, hasBooks: $hasBooks, status: $status){
    ${fragmentBase}
    count
    editions {
      ${fragmentEdition}
    }
  }
}
`
