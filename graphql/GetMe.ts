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
