import {fragmentBase} from "./fragmentBase";
import {fragmentEdition} from "./fragmentEdition";

export const GetEditionsQuery =`
query($search: String, $offset: Float, $limit: Float, $hasBooks: Boolean){
  getEditions(search: $search, offset: $offset, limit: $limit, hasBooks: $hasBooks){
    ${fragmentBase}
    count
    editions {
      ${fragmentEdition}
    }
  }
}
`
