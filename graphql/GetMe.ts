import {fragmentSwap} from "./fragmentSwap";
import { fragmentEdition } from './fragmentEdition';

export const GetMe = `
  query{
    me{
      user{
        id
        firstName
        lastName
        email
        notifications{
          isRead
          message
          createdAt
        }
        waiting {
          ${fragmentEdition}
        }
        avatar {
          topType
          eyeType
          eyebrowType
          mouthType
          facialHairType
          facialHairColor
          hairColor
          hatColor
          skinColor
          clotheColor
          clotheType
          accessoriesType
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
            ${fragmentEdition}
          }
        }
      }
    }
  }
`
