export const fragmentEditionExposed = `
    id
    title
    description
    authors
    image
    views
    books {
      id
      description
      holder {
        id
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
      status
      condition
    }
`
