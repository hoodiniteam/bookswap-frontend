export const fragmentEditionExposed = `
    id
    title
    description
    authors
    image
    publishedDate
    views
    expects {
        id
        firstName
        lastName
        email
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
    }
    books {
      id
      description
      holder {
        id
        email
        firstName
        lastName
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
      }
      status
      condition
    }
`
