export const GetMe = `
  query{
    me{
      user{
        waiting{
          title
          id
        }
        books{
          title
          description
          id
          status
          condition
          image{
            url
          }
        }
      }
    }
  }
`
