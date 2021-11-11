import {fragmentSwap} from "./fragmentSwap";

export const GetMe = `
  query{
    me{
      user{
        id
        email
        notifications{
          isRead
          message
          createdAt
        }
        waiting{
          title
          id
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
            image
          }
        }
      }
    }
  }
`
