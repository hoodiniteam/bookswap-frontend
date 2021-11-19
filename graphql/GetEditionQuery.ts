export const GetEditionQuery = `
  query($id:String!){
    getEdition(id:$id){
      edition{
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
          }
          status
          condition
        }
      }
    }
  }
  `
