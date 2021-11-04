import {fragmentBase} from "./fragmentBase";
import {fragmentSwap} from "./fragmentSwap";

export const UpdateUserMutation = `
  mutation($email: String, $firstName: String, $lastName:String, $city:String, $bDay:DateTime, $avatar: JSONObject){
    updateMe(options:{email:$email, firstName:$firstName, lastName:$lastName, city:$city, bDay: $bDay, avatar: $avatar}){
      ${fragmentBase}
      user{
        id
        email
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
`;
