export const GetMe = `
  query{
    me{
      user{
        id
        waiting{
          title
          id
          status
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
