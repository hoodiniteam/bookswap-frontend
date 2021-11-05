import {fragmentBase} from "./fragmentBase";
import {fragmentEdition} from "./fragmentEdition";

export const GetEditionsQuery =`
query($search: String, $offset: Float, $limit: Float, $withBooks: Boolean){
  getEditions(search: $search, offset: $offset, limit: $limit, withBooks: $withBooks){
    ${fragmentBase}
    count
    editions {
      ${fragmentEdition}
    }
  }
}
`
