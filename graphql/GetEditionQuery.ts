export const GetEditionQuery = `
  query($id:String!){
    getEdition(id:$id){
      edition{
        id
        title
        description
        image
        books {
          id
          description
          holder {
            email
          }
          status
          condition
        }
      }
    }
  }
  `