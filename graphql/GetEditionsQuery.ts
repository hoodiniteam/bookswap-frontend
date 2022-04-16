import {fragmentBase} from "./fragmentBase";
import {fragmentEdition} from "./fragmentEdition";

export const GetEditionsQuery =`
query($search: String, $offset: Float, $limit: Float, $hasBooks: Boolean, $status: [BooksStatus!], $recent: Boolean){
  getEditions(search: $search, offset: $offset, limit: $limit, hasBooks: $hasBooks, status: $status, recent: $recent){
    ${fragmentBase}
    count
    editions {
      ${fragmentEdition}
    }
  }
}
`
