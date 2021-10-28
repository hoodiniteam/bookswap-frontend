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
