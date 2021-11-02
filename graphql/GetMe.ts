import {fragmentSwap} from "./fragmentSwap";

export const GetMe = `
  query{
    me{
      user{
        id
        email
        waiting{
          title
          id
        }
        points
        sends {
          ${fragmentSwap}
        }
        swaps {
          ${fragmentSwap}
        }
        books{
          id
          title
          description
          status
          condition
          edition {
            image
          }
        }
      }
    }
  }
`
